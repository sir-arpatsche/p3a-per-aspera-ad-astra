// kubejs/server_scripts/relics_passive_magic_xp.js
// Passive PMMO-"magic"-XP für getragene Relikte (Curios-Slots).
// Alle RPX_INTERVAL_TICKS bekommt jeder Spieler XP pro getragenem Relikt, gestaffelt nach Tier.
//
// Nutzt direkt die Java-API von Curios (RelicsCuriosApi) und braucht deshalb kein KubeJS-Curios-Addon.
// Vorher prüfen: RPX_XP_COMMAND (Argumente von /pmmo admin ... per Tab-Vervollständigung testen).

const RPX_DEBUG = false                 // true: zeigt im Chat, was erkannt und vergeben wurde
const RPX_INTERVAL_TICKS = 20 * 60     // 1 Minute
const RPX_MAX_RELICS_COUNTED = 4       // mehr getragene Relikte zählen nicht
const RPX_SKILL = 'magic'
const RPX_XP_COMMAND = 'pmmo admin %PLAYER% add ' + RPX_SKILL + ' xp %AMOUNT%'

// magic-XP pro Intervall und Relikt (passend zu deinen PMMO-Tiers)
const RPX_XP_BY_TIER = { 1: 2, 2: 4, 3: 8, 4: 15 }
const RPX_TIERS = {
  1: ['ice_skates', 'roller_skates', 'springy_boot', 'leather_belt', 'wool_mitten', 'leafy_ring', 'amphibian_boot'],
  2: ['ice_breaker', 'infinity_ham', 'aqua_walker', 'drowned_belt', 'jellyfish_necklace', 'magma_walker',
      'phantom_boot', 'bastion_ring', 'spore_sack', 'chorus_inhibitor', 'hunter_belt', 'solid_snowball'],
  3: ['rage_glove', 'reflection_necklace', 'holy_locket', 'midnight_robe', 'magic_mirror', 'enders_hand', 'blazing_flask'],
  4: ['shadow_glaive', 'space_dissector', 'elytra_booster']
}

// Lookup: "relics:xyz" -> XP
const RPX_XP_BY_ITEM = {}
Object.keys(RPX_TIERS).forEach(t => RPX_TIERS[t].forEach(name => { RPX_XP_BY_ITEM['relics:' + name] = RPX_XP_BY_TIER[t] }))

const RelicsCuriosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi')

function wornRelicXp(player) {
  var opt = RelicsCuriosApi.getCuriosInventory(player)
  if (!opt.isPresent()) return { count: 0, xp: 0 }
  var handler = opt.get()

  // findCurios(...) ist für Rhino mehrdeutig -> alle Slots direkt durchgehen
  var xps = []
  var holders = handler.getCurios().values().toArray()
  for (var h = 0; h < holders.length; h++) {
    var stacks = holders[h].getStacks()
    for (var i = 0; i < stacks.getSlots(); i++) {
      var stack = stacks.getStackInSlot(i)
      if (stack.isEmpty()) continue
      var xp = RPX_XP_BY_ITEM[String(stack.id)]
      if (xp !== undefined) xps.push(xp)
    }
  }

  xps.sort((a, b) => b - a)                       // die wertvollsten zuerst zählen
  var used = xps.slice(0, RPX_MAX_RELICS_COUNTED)
  return { count: used.length, xp: used.reduce((s, x) => s + x, 0) }
}

PlayerEvents.tick(event => {
  var player = event.player
  if (player.level.isClientSide()) return
  // Eigener Tick-Zähler (player.age ist in KubeJS nicht zuverlässig verfügbar)
  var counter = player.persistentData.getInt('rpxTicks') + 1
  if (counter < RPX_INTERVAL_TICKS) {
    player.persistentData.putInt('rpxTicks', counter)
    return
  }
  player.persistentData.putInt('rpxTicks', 0)

  try {
    var r = wornRelicXp(player)
    if (RPX_DEBUG) player.tell('[Relics-Magic] getragen: ' + r.count + ' -> ' + r.xp + ' ' + RPX_SKILL + ' XP')
    if (r.xp > 0) {
      var cmd = RPX_XP_COMMAND.replace('%PLAYER%', player.username).replace('%AMOUNT%', String(r.xp))
      event.server.runCommandSilent(cmd)
    }
  } catch (e) {
    if (RPX_DEBUG) player.tell('[Relics-Magic] Fehler: ' + e)
  }
})
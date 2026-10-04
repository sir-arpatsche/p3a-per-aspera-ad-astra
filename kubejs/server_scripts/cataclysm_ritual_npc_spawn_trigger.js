const P3A_PRESET_HERO = 'forgotten_hero'
const P3A_PRESET_SCYLLA = 'forgotten_hero_scylla'

const P3A_PRESET_BY_TRIGGER = {
  'minecolonies:minecolonies/place_townhall': P3A_PRESET_HERO,
  'p3a:lore/lore_page_ignis': P3A_PRESET_HERO,
  'p3a:lore/lore_page_ender_guardian': P3A_PRESET_HERO,
  'p3a:story/acropolis_risen': P3A_PRESET_SCYLLA,
  'p3a:story/scylla_defeated': P3A_PRESET_HERO
}

PlayerEvents.advancement(event => {
  var raw = String(event.advancement)
  var match = raw.match(/id=([a-z0-9_.\-]+:[a-z0-9_.\-\/]+)/)
  var advId = match ? match[1] : raw

  var preset = P3A_PRESET_BY_TRIGGER[advId]
  if (!preset) return

  console.log('[P3A] NPC trigger: ' + advId + ' -> preset ' + preset)

  var player = event.player
  var server = player.server

  var yaw = typeof player.yaw === 'number' ? player.yaw : player.getYRot()
  var angle = yaw * (Math.PI / 180)

  var x = Math.floor(player.x - Math.sin(angle) * 2)
  var y = Math.floor(player.y) + 1
  var z = Math.floor(player.z + Math.cos(angle) * 2)

  server.runCommandSilent(`easy_npc preset import_new custom ${preset} ${x} ${y} ${z}`)
  server.runCommandSilent(`playsound minecraft:entity.enderman.teleport master ${player.username} ${x} ${y} ${z}`)
  server.runCommandSilent(`particle minecraft:poof ${x} ${y} ${z} 0.3 0.5 0.3 0.02 20`)
})
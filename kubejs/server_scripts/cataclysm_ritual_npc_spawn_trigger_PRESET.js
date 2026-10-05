const P3A_PRESET_HERO = 'easy_npc:preset/humanoid/forgotten_hero.npc.nbt'
const P3A_PRESET_SCYLLA = 'easy_npc:preset/humanoid/forgotten_hero_scylla.npc.nbt'

function p3aSpawnNpc(player, preset, reason) {
  var server = player.server

  var yaw = typeof player.yaw === 'number' ? player.yaw : player.getYRot()
  var angle = yaw * (Math.PI / 180)

  var x = Math.floor(player.x - Math.sin(angle) * 2)
  var y = Math.floor(player.y) + 1
  var z = Math.floor(player.z + Math.cos(angle) * 2)

  console.log('[P3A] NPC trigger: ' + reason + ' -> ' + preset)

  server.runCommand(`easy_npc preset import_new custom ${preset} ${x} ${y} ${z}`)
  server.runCommandSilent(`playsound minecraft:entity.enderman.teleport master ${player.username} ${x} ${y} ${z}`)
  server.runCommandSilent(`particle minecraft:poof ${x} ${y} ${z} 0.3 0.5 0.3 0.02 20`)
}

PlayerEvents.advancement(event => {
  var raw = String(event.advancement)
  var match = raw.match(/id=([a-z0-9_.\-]+:[a-z0-9_.\-\/]+)/)
  var advId = match ? match[1] : raw

  if (advId === 'minecolonies:minecolonies/place_townhall') {
    p3aSpawnNpc(event.player, P3A_PRESET_HERO, advId)
  }
})

const P3A_ITEM_TRIGGERS = {
  'p3a:lore_page_ignis': 'p3a_npc_after_ignis',
  'p3a:lore_page_ender_guardian': 'p3a_npc_after_ender_guardian'
}

Object.keys(P3A_ITEM_TRIGGERS).forEach(function (itemId) {
  PlayerEvents.inventoryChanged(itemId, function (event) {
    var player = event.player
    var flag = P3A_ITEM_TRIGGERS[itemId]

    if (player.persistentData.getBoolean(flag)) return
    player.persistentData.putBoolean(flag, true)

    p3aSpawnNpc(player, P3A_PRESET_HERO, itemId)
  })
})

SummoningRituals.complete(event => {
  var player = event.player
  if (!player) return

  if (event.recipeInfo.recipeId.toString() !== 'p3a:ritual_storm_bound_talisman') return

  p3aSpawnNpc(player, P3A_PRESET_SCYLLA, 'acropolis ritual')
})

EntityEvents.death('cataclysm:scylla', event => {
  var player = event.source ? event.source.player : null
  if (!player) return

  p3aSpawnNpc(player, P3A_PRESET_HERO, 'scylla defeated')
})
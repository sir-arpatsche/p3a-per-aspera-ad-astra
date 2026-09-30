global.getArenaPos = function(server, key) {
  const data = server.persistentData
  if (data.contains(`${key}_x`)) {
    return {
      x: data.getInt(`${key}_x`),
      y: data.getInt(`${key}_y`),
      z: data.getInt(`${key}_z`)
    }
  }
  return null
}

global.saveArenaPos = function(server, key, pos) {
  const data = server.persistentData
  data.putInt(`${key}_x`, pos.x)
  data.putInt(`${key}_y`, pos.y)
  data.putInt(`${key}_z`, pos.z)
}

global.ensureScyllaArena = function(server, player) {
  let pos = global.getArenaPos(server, 'p3a_scylla_arena')
  if (pos) return pos

  pos = {
    x: Math.floor(player.x) + 100,
    y: 200,
    z: Math.floor(player.z) + 100
  }

  server.runCommandSilent(
    `execute at ${player.username} run place structure cataclysm:acropolis ~100 200 ~100`
  )
  global.saveArenaPos(server, 'p3a_scylla_arena', pos)

  return pos
}

global.teleportToScyllaArena = function(player) {
  const pos = global.getArenaPos(player.server, 'p3a_scylla_arena')
  if (!pos) return
  player.server.runCommandSilent(`teleport ${player.username} ${pos.x} ${pos.y + 5} ${pos.z}`)
}

global.ensureLeviathanArena = function(server, player) {
  let pos = global.getArenaPos(server, 'p3a_leviathan_arena')
  if (pos) return pos

  pos = {
    x: Math.floor(player.x) - 200,
    y: -50,
    z: Math.floor(player.z) - 200
  }

  server.runCommandSilent(
    `fill ${pos.x - 40} ${pos.y - 20} ${pos.z - 40} ${pos.x + 40} ${pos.y + 20} ${pos.z + 40} minecraft:deepslate`
  )
  server.runCommandSilent(
    `fill ${pos.x - 35} ${pos.y - 15} ${pos.z - 35} ${pos.x + 35} ${pos.y + 15} ${pos.z + 35} minecraft:air`
  )
  server.runCommandSilent(`place structure cataclysm:sunken_city ${pos.x - 15} ${pos.y - 10} ${pos.z - 15}`)
  global.saveArenaPos(server, 'p3a_leviathan_arena', pos)

  return pos
}

global.teleportToLeviathanArena = function(player) {
  const pos = global.getArenaPos(player.server, 'p3a_leviathan_arena')
  if (!pos) return
  player.server.runCommandSilent(`teleport ${player.username} ${pos.x} ${pos.y + 5} ${pos.z}`)
}
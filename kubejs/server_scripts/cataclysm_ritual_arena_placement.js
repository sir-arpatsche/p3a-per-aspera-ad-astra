const LEVIATHAN_ARENA_POS = { x: 0, y: -50, z: 0 }
const SCYLLA_ARENA_POS = { x: 300, y: -50, z: 0 }

function ensureLeviathanArena(server) {
  const scoreboard = server.getScoreboard()
  const flag = scoreboard.getOrCreatePlayerScore('#global', 'p3a_leviathan_built')

  if (flag.getScore() > 0) return

  const { x, y, z } = LEVIATHAN_ARENA_POS

  server.runCommandSilent(
    `fill ${x - 40} ${y - 20} ${z - 40} ${x + 40} ${y + 20} ${z + 40} minecraft:deepslate`
  )
  server.runCommandSilent(
    `fill ${x - 35} ${y - 15} ${z - 35} ${x + 35} ${y + 15} ${z + 35} minecraft:air`
  )
  server.runCommandSilent(`place structure cataclysm:sunken_city ${x - 15} ${y - 10} ${z - 15}`)

  scoreboard.getOrCreatePlayerScore('#global', 'p3a_leviathan_built').setScore(1)
}

function ensureScyllaArena(server) {
  const scoreboard = server.getScoreboard()
  const flag = scoreboard.getOrCreatePlayerScore('#global', 'p3a_scylla_built')

  if (flag.getScore() > 0) return

  const { x, y, z } = SCYLLA_ARENA_POS

  server.runCommandSilent(`place structure cataclysm:acropolis ${x} ${y} ${z}`)

  scoreboard.getOrCreatePlayerScore('#global', 'p3a_scylla_built').setScore(1)
}

function teleportToLeviathanArena(player) {
  const { x, y, z } = LEVIATHAN_ARENA_POS
  player.teleportTo(player.server.getLevel('minecraft:overworld'), x, y, z)
}

function teleportToScyllaArena(player) {
  const { x, y, z } = SCYLLA_ARENA_POS
  player.teleportTo(player.server.getLevel('minecraft:overworld'), x, y, z)
}
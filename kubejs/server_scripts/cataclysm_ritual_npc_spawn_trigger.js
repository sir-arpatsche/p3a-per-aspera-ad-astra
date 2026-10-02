PlayerEvents.advancement(event => {
  if (event.advancement !== 'minecolonies:minecolonies/place_townhall') return

  const player = event.player
  const server = player.server

  const yaw = typeof player.yaw === 'number' ? player.yaw : player.getYRot()
  const angle = yaw * (Math.PI / 180)
  const offsetX = -Math.sin(angle) * 2
  const offsetZ = Math.cos(angle) * 2

  const x = Math.floor(player.x + offsetX)
  const y = Math.floor(player.y) + 1
  const z = Math.floor(player.z + offsetZ)

  server.runCommandSilent(
    `easy_npc spawn 79ff0935-313e-4355-9e74-2230d19891cf ${x} ${y} ${z}`
  )
  server.runCommandSilent(`playsound minecraft:entity.enderman.teleport master ${player.username} ${x} ${y} ${z}`)
  server.runCommandSilent(`particle minecraft:poof ${x} ${y + 1} ${z} 0.3 0.5 0.3 0.02 20`)
})
ServerEvents.commandRegistry(event => {
  const { commands: Commands } = event

  event.register(
    Commands.literal('p3a_debug_tp_scylla').executes(ctx => {
      const player = ctx.source.player
      if (!player) return 0
      const pos = global.getArenaPos(player.server, 'p3a_scylla_arena')
      if (!pos) {
        player.tell(Text.red('No Scylla arena position stored yet.'))
        return 0
      }
      player.tell(Text.gray(`Stored position: ${pos.x} ${pos.y} ${pos.z}`))
      global.teleportToScyllaArena(player)
      return 1
    })
  )

  event.register(
    Commands.literal('p3a_debug_place_acropolis').executes(ctx => {
      const player = ctx.source.player
      if (!player) return 0
      player.tell(Text.gray('Placing cataclysm:acropolis at player +100/150/+100...'))
      player.server.runCommandSilent(
        `execute at ${player.username} run place structure cataclysm:acropolis ~100 150 ~100`
      )
      player.tell(Text.gray('Command sent.'))
      return 1
    })
  )

  event.register(
    Commands.literal('p3a_debug_reset_scylla').executes(ctx => {
      const player = ctx.source.player
      if (!player) return 0
      player.server.persistentData.remove('p3a_scylla_arena_x')
      player.server.persistentData.remove('p3a_scylla_arena_y')
      player.server.persistentData.remove('p3a_scylla_arena_z')
      player.tell(Text.gray('Stored Scylla arena position cleared.'))
      return 1
    })
  )
})
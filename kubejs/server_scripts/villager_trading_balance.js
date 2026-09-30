// server_scripts/villager_gossip_cleanup.js
ServerEvents.tick(event => {
  if (event.server.tickCount % 60 === 0) { // alle 3 Sekunden
    event.server.runCommandSilent('execute as @e[type=minecraft:villager] run data remove entity @s Gossips[{Type:"minor_negative"}]')
    event.server.runCommandSilent('execute as @e[type=minecraft:villager] run data remove entity @s Gossips[{Type:"major_negative"}]')
  }
})
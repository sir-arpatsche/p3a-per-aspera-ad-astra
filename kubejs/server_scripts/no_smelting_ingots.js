ServerEvents.recipes(event => {
  // Vanilla Ofen/Blast Furnace
  event.remove({ output: '#c:ingots', type: 'minecraft:smelting' })
  event.remove({ output: '#c:ingots', type: 'minecraft:blasting' })

  event.remove({ output: '#c:ingots', type: 'create:compacting' })
})
//new recipe for crushing obsidian
ServerEvents.recipes(event => {
  event.recipes.createMilling(
    CreateItem.of('create:powdered_obsidian', 0.4),
    'minecraft:obsidian'
  )
})

//new recipe for buckets
ServerEvents.recipes(event => {
  event.remove({ id: 'minecraft:bucket' })

  event.shaped('minecraft:bucket', [
    'N N',
    'NNN'
  ], {
    N: 'minecraft:iron_nugget'
  })
})

//new cauldorn recipe
ServerEvents.recipes(event => {
  event.remove({ id: 'minecraft:cauldron' })

  event.shaped('minecraft:cauldron', [
    'B B',
    'N N',
    'NNN'
  ], {
    B: 'minecraft:bucket',
    N: 'minecraft:iron_nugget'
  })
})

//new copper pipe recipe
ServerEvents.recipes(event => {
  event.shaped('create:fluid_pipe', [
    'CCC',
    'I I',
    'CCC'
  ], {
    C: 'create:copper_nugget',
    I: 'minecraft:iron_nugget'
  })
})

//no more nuggets to ingots
ServerEvents.recipes(event => {
  event.remove({
    input: '#c:nuggets',
    output: '#c:ingots'
  })
})

//new stonecutter recipe for early progression
ServerEvents.recipes(event => {
  event.remove({ id: 'minecraft:stonecutter' })

  event.shaped('minecraft:stonecutter', [
    'NNN',
    '###'
  ], {
    N: 'minecraft:iron_nugget',
    '#': 'minecraft:stone'
  })
})

//new mechanical press recipe
ServerEvents.recipes(event => {
  event.shaped('create:mechanical_press', [
    'CDC',
    'OAO',
    'OOO'
  ], {
    C: 'create:cogwheel',
    A: 'create:andesite_alloy',
    O: 'minecraft:obsidian',
    D: 'create:andesite_casing'
  })
})

//andesite recipe
ServerEvents.recipes(event => {
  event.shaped('create:andesite_alloy', [
    'N#',
    '#N'
  ], {
    '#': 'minecraft:iron_nugget',
    N: 'minecraft:andesite'
  })
})

//new spot recipe
ServerEvents.recipes(event => {
  event.shaped('create:spout', [
    '#N#',
    '#N#',
    ' B '
  ], {
    '#': 'create:copper_nugget',
    N: 'create:andesite_casing',
    B: 'minecraft:bucket'
  })
})

//new foundry mixer Recipe
ServerEvents.recipes(event => {
  event.shaped('createmetallurgy:foundry_mixer', [
    ' C ',
    ' A ',
    ' O '
  ], {
    C: 'create:cogwheel',
    A: 'create:andesite_casing',
    O: 'createmetallurgy:sturdy_whisk'
  })
})

//new foundry smelting for iron
ServerEvents.recipes(event => {
  const metals = ['iron', 'copper', 'gold', 'zinc']

  metals.forEach(metal => {
    event.recipes.createMixing(Fluid.of(`createmetallurgy:molten_${metal}`, 10), [
      [
        `#c:nuggets/${metal}`
      ],
      Fluid.of('minecraft:lava', 100)
    ])
  })
})
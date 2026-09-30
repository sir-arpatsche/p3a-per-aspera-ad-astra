//new ore loot table
LootJS.modifiers(event => {
  const metals = [
    { ores: ['minecraft:copper_ore', 'minecraft:deepslate_copper_ore'], raw: 'minecraft:raw_copper', nugget: 'create:copper_nugget' },
    { ores: ['minecraft:iron_ore', 'minecraft:deepslate_iron_ore'], raw: 'minecraft:raw_iron', nugget: 'minecraft:iron_nugget' },
    { ores: ['minecraft:gold_ore', 'minecraft:deepslate_gold_ore'], raw: 'minecraft:raw_gold', nugget: 'minecraft:gold_nugget' },
    { ores: ['create:zinc_ore', 'create:deepslate_zinc_ore'], raw: 'create:raw_zinc', nugget: 'create:zinc_nugget' }
  ]
 

  metals.forEach(m => {
    m.ores.forEach(ore => {
     
      event.addBlockModifier(ore)
        .removeLoot(m.raw)
        .randomChance(0.5)
        .addLoot(m.raw)

      
      event.addBlockModifier(ore)
        .addLoot(Item.of(m.nugget, 3))
    })
  })
})

//no ingots or raw material in chests
LootJS.modifiers(event => {
  const items = [
    'minecraft:iron_block', 'minecraft:iron_ingot', 'minecraft:raw_iron',
    'minecraft:copper_block', 'minecraft:copper_ingot', 'minecraft:raw_copper',
    'minecraft:gold_block', 'minecraft:gold_ingot', 'minecraft:raw_gold',
    'create:zinc_block', 'create:zinc_ingot', 'create:raw_zinc'
  ]

  const modifier = event.addTableModifier(LootType.CHEST)
  items.forEach(id => modifier.removeLoot(id))
})
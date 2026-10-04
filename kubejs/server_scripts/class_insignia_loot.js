LootJS.modifiers(event => {
  var mobs = [
    'minecraft:zombie',
    'minecraft:husk',
    'minecraft:drowned',
    'minecraft:zombie_villager',
    'minecraft:skeleton',
    'minecraft:stray',
    'minecraft:bogged',
    'minecraft:wither_skeleton',
    'minecraft:piglin',
    'minecraft:piglin_brute'
  ]

  var TOTAL_CHANCE = 0.10

  var insignias = [
    'pmmo_classes:class_grant[pmmo_skill_books:skill_grant_data={application_type:"set",application_value:1L,color:"red",experience_cost:20,name:"pmmo_classes.insignia.iron.warrior",rank:"iron",skills:["barbarian","fighter","monk"],texture_type:"insignia"}]',
    'pmmo_classes:class_grant[pmmo_skill_books:skill_grant_data={application_type:"set",application_value:1L,color:"white",experience_cost:20,name:"pmmo_classes.insignia.iron.priest",rank:"iron",skills:["cleric","druid","paladin"],texture_type:"insignia"}]',
    'pmmo_classes:class_grant[pmmo_skill_books:skill_grant_data={application_type:"set",application_value:1L,color:"purple",experience_cost:20,name:"pmmo_classes.insignia.iron.mage",rank:"iron",skills:["sorcerer","warlock","wizard"],texture_type:"insignia"}]',
    'pmmo_classes:class_grant[pmmo_skill_books:skill_grant_data={application_type:"set",application_value:1L,color:"teal",experience_cost:20,name:"pmmo_classes.insignia.iron.expert",rank:"iron",skills:["artificer","bard","ranger","rogue"],texture_type:"insignia"}]'
  ]

  var perItemChance = TOTAL_CHANCE / insignias.length

  mobs.forEach(mob => {
    insignias.forEach(stack => {
      event.addEntityModifier(mob)
        .randomChance(perItemChance)
        .addLoot(Item.of(stack))
    })
  })
})
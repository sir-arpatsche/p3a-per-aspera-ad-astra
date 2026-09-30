LootJS.modifiers(event => {

  event.addEntityModifier('minecraft:wither')
    .removeLoot('minecraft:nether_star')

  event.addEntityModifier('cataclysm:the_harbinger')
    .addLoot('p3a:lore_page_harbinger')

  event.addEntityModifier('cataclysm:netherite_monstrosity')
    .addLoot('p3a:lore_page_netherite_monstrosity')

  event.addEntityModifier('cataclysm:ignis')
    .addLoot('p3a:lore_page_ignis')

  event.addEntityModifier('cataclysm:the_leviathan')
    .addLoot('p3a:lore_page_leviathan')

  event.addEntityModifier('cataclysm:ender_guardian')
    .addLoot('p3a:lore_page_ender_guardian')

  event.addEntityModifier('cataclysm:ancient_remnant')
    .addLoot('p3a:lore_page_ancient_remnant')

  event.addEntityModifier('cataclysm:maledictus')
    .addLoot('p3a:lore_page_maledictus')

})

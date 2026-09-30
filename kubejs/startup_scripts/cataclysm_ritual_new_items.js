StartupEvents.registry('item', event => {

  event.create('p3a:cursed_effigy')
    .texture('p3a:item/cursed_effigy')
    .maxStackSize(1)
    .rarity('rare')
    .tooltip(Text.gray('An effigy forged from cursed ice.'))
    .tooltip(Text.gray('Right-click the tombstone in the Frosted Prison.'))

  event.create('p3a:storm_bound_talisman')
    .texture('p3a:item/storm_bound_talisman')
    .maxStackSize(1)
    .rarity('rare')
    .tooltip(Text.gray('A talisman charged with the wrath of the storm.'))
    .tooltip(Text.gray('Right-click the anchor in the Acropolis.'))

  const lorePages = [
    'intro_lore_final_page',
    'lore_page_harbinger',
    'lore_page_netherite_monstrosity',
    'lore_page_ignis',
    'lore_page_leviathan',
    'lore_page_ender_guardian',
    'lore_page_ancient_remnant',
    'lore_page_maledictus'
  ]

  lorePages.forEach(id => {
    event.create(`p3a:${id}`)
      .texture('p3a:item/lost_lore_page')
      .maxStackSize(1)
      .rarity('uncommon')
      .tooltip(Text.gray('A fragment of forgotten knowledge.'))
  })

})
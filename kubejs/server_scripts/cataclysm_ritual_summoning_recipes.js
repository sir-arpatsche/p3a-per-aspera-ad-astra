ServerEvents.recipes(event => {

  event.shaped('summoningrituals:altar', [
    'ODO',
    'DGD',
    'ODO'
  ], {
    O: 'minecraft:obsidian',
    D: 'minecraft:diamond',
    G: 'minecraft:gold_block'
  })

  event.recipes.summoningrituals
    .altar('p3a:intro_lore_final_page')
    .itemInputs([
      'minecraft:wither_skeleton_skull',
      'minecraft:soul_sand'
    ])
    .itemOutputs(['minecraft:nether_star'])
    .id('p3a:ritual_nether_star')

  event.recipes.summoningrituals
    .altar('p3a:lore_page_ancient_remnant')
    .itemInputs([
      'cataclysm:remnant_skull'
    ])
    .itemOutputs(['p3a:cursed_effigy'])
    .id('p3a:ritual_cursed_effigy')

  event.recipes.summoningrituals
    .altar('p3a:lore_page_maledictus')
    .itemInputs([
      '3x cataclysm:cursium_ingot'
    ])
    .itemOutputs(['p3a:storm_bound_talisman'])
    .id('p3a:ritual_storm_bound_talisman')

  event.recipes.summoningrituals
    .altar('p3a:lore_page_ender_guardian')
    .itemInputs([
      'cataclysm:gauntlet_of_guard'
    ])
    .itemOutputs(['cataclysm:necklace_of_the_desert'])
    .id('p3a:ritual_necklace_of_the_desert')

  event.recipes.summoningrituals
    .altar('p3a:lore_page_ignis')
    .itemInputs([
      'cataclysm:ignitium_ingot',
      'cataclysm:abyssal_sacrifice'
    ])
    .entityOutputs(['cataclysm:the_leviathan'])
    .id('p3a:ritual_summon_leviathan')

})

const RITUAL_LORE_PAGE_RETURN = {
  'p3a:ritual_nether_star': 'p3a:intro_lore_final_page',
  'p3a:ritual_cursed_effigy': 'p3a:lore_page_ancient_remnant',
  'p3a:ritual_storm_bound_talisman': 'p3a:lore_page_maledictus',
  'p3a:ritual_necklace_of_the_desert': 'p3a:lore_page_ender_guardian',
  'p3a:ritual_summon_leviathan': 'p3a:lore_page_ignis'
}

SummoningRituals.complete(event => {
  const { recipeInfo, player } = event

  if (!player) return

  const recipeId = recipeInfo.recipeId.toString()
  const lorePage = RITUAL_LORE_PAGE_RETURN[recipeId]

  if (lorePage) {
    player.give(lorePage)
  }

  if (recipeId === 'p3a:ritual_storm_bound_talisman') {
    global.ensureScyllaArena(player.server, player)
    player.server.runCommandSilent(`advancement grant ${player.username} only p3a:story/acropolis_risen`)
  }
})

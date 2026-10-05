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
      '3x minecraft:wither_skeleton_skull',
      '4x minecraft:soul_sand',
      'minecraft:ghast_tear'
    ])
    .itemOutputs(['minecraft:nether_star'])
    .id('p3a:ritual_nether_star')

  event.recipes.summoningrituals
    .altar('p3a:lore_page_ancient_remnant')
    .itemInputs([
      'cataclysm:remnant_skull',
      '2x minecraft:ender_eye',
      '2x minecraft:gold_block'
    ])
    .itemOutputs(['p3a:cursed_effigy'])
    .id('p3a:ritual_cursed_effigy')

  event.recipes.summoningrituals
    .altar('p3a:lore_page_maledictus')
    .itemInputs([
      '3x cataclysm:cursium_ingot',
      '3x cataclysm:ignitium_ingot',
      '3x minecraft:netherite_ingot'
    ])
    .itemOutputs(['p3a:storm_bound_talisman'])
    .id('p3a:ritual_storm_bound_talisman')

  event.recipes.summoningrituals
    .altar('p3a:lore_page_ender_guardian')
    .itemInputs([
      'cataclysm:abyssal_egg',
      '8x minecraft:ender_pearl',
      '16x minecraft:obsidian'
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
  console.log('[P3A] ritual complete: ' + recipeId)
  const lorePage = RITUAL_LORE_PAGE_RETURN[recipeId]

  if (lorePage) {
    player.give(lorePage)
  }

  if (recipeId === 'p3a:ritual_storm_bound_talisman') {
    global.ensureScyllaArena(player.server, player)
    var grantResult = player.server.runCommand(`advancement grant ${player.username} only p3a:story/acropolis_risen`)
    console.log('[P3A] acropolis advancement grant result: ' + grantResult)
  }
})
// kubejs/server_scripts/relics_loot.js
// Relics seltener in Truhen (inkl. Lootr), gestaffelt nach den PMMO-Tiers.
// "chance" = Wahrscheinlichkeit, mit der das Relikt aus dem Truhen-Loot ENTFERNT wird.
// 0.65 -> nur noch ca. 35% der ursprünglichen Funde bleiben übrig.

LootJS.modifiers(event => {
  const tiers = [
    { // Tier 1
      chance: 0.4,
      items: [
        'relics:ice_skates', 'relics:roller_skates', 'relics:springy_boot',
        'relics:leather_belt', 'relics:wool_mitten', 'relics:leafy_ring',
        'relics:amphibian_boot'
      ]
    },
    { // Tier 2
      chance: 0.65,
      items: [
        'relics:ice_breaker', 'relics:infinity_ham', 'relics:aqua_walker',
        'relics:drowned_belt', 'relics:jellyfish_necklace', 'relics:magma_walker',
        'relics:phantom_boot', 'relics:bastion_ring', 'relics:spore_sack',
        'relics:chorus_inhibitor', 'relics:hunter_belt', 'relics:solid_snowball'
      ]
    },
    { // Tier 3
      chance: 0.85,
      items: [
        'relics:rage_glove', 'relics:reflection_necklace', 'relics:holy_locket',
        'relics:midnight_robe', 'relics:magic_mirror', 'relics:enders_hand',
        'relics:blazing_flask'
      ]
    },
    { // Tier 4
      chance: 0.97,
      items: [
        'relics:shadow_glaive', 'relics:space_dissector', 'relics:elytra_booster'
      ]
    }
  ]

  tiers.forEach(t => {
    const modifier = event.addTableModifier(LootType.CHEST).randomChance(t.chance)
    t.items.forEach(id => modifier.removeLoot(id))
  })
})
ServerEvents.recipes(event => {
  event.remove({ mod: 'plushie_buddies' })
})

LootJS.modifiers(event => {
  var ids = Ingredient.of('@plushie_buddies').itemIds
  ids.forEach(id => {
    event.addTableModifier(LootType.CHEST)
      .randomChance(0.01)
      .addLoot(Item.of(id))
  })
})
ServerEvents.tags('item', event => {
  event.add('c:hidden_from_recipe_viewers', /magistuarmory:.*(tin|silver|bronze).*/)
})
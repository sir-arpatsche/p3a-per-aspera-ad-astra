PlayerEvents.loggedIn(event => {
  const player = event.player

  if (player.persistentData.getBoolean('p3a_got_lore_book')) return

  player.persistentData.putBoolean('p3a_got_lore_book', true)
  player.give('patchouli:guide_book[patchouli:book="patchouli:lore"]')
  player.tell(Text.gray('An old book falls from your pack...'))
})

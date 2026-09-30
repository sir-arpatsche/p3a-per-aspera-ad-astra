BlockEvents.rightClicked('cataclysm:cursed_tombstone', event => {
  const { player, block, level } = event

  if (!player) return

  const heldItem = player.mainHandItem

  if (!heldItem.id.equals('p3a:cursed_effigy')) {
    event.cancel()

    if (!level.isRemote) {
      player.tell(Text.gray('The tombstone remains silent. Something is missing.'))
    }
    return
  }

  if (!level.isRemote) {
    heldItem.shrink(1)
  }
})

ItemEvents.entityInteracted(event => {
  const { player, target, item } = event

  if (!player) return
  if (target.type !== 'cataclysm:scylla') return

  if (!item.id.equals('p3a:storm_bound_talisman')) {
    event.cancel()

    if (!player.level.isRemote) {
      player.tell(Text.gray('The anchor does not stir. Something is missing.'))
    }
    return
  }

  if (!player.level.isRemote) {
    item.count--
  }
})
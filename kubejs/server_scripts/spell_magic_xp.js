// Magic-XP beim Spell-Cast - braucht den Mod "Iron's Spells KubeJS" (kubejs-irons-spells)
// Event-Gruppe bestaetigt aus dem echten Quellcode (Branch 2101):
// https://github.com/sentwayfarer/irons_spells_js/blob/2101/src/main/java/com/squoshi/irons_spells_js/event/IronsSpellsJSEvents.java
// GROUP = EventGroup.of("ISSEvents"), NICHT PlayerEvents!

const APIUtils = Java.loadClass('harmonised.pmmo.api.APIUtils')

ISSEvents.spellOnCast(event => {
  try {
    console.log('[spell_magic_xp] Event gefeuert: ' + event)

    var player = event.getEntity()
    console.log('[spell_magic_xp] player: ' + player)
    if (!player) return

    var spellLevel = event.getSpellLevel()
    console.log('[spell_magic_xp] spellLevel: ' + spellLevel)

    var xpAmount
    if (spellLevel >= 9) {
      xpAmount = 100 // Legendary
    } else if (spellLevel >= 7) {
      xpAmount = 75 // Epic
    } else if (spellLevel >= 4) {
      xpAmount = 50 // Rare
    } else {
      xpAmount = 25 // Uncommon (Level 1-3)
    }

    APIUtils.addXp('magic', player, xpAmount)
    console.log('[spell_magic_xp] XP vergeben: ' + xpAmount)
  } catch (e) {
    console.error('[spell_magic_xp] FEHLER: ' + e)
  }
})
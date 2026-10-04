// kubejs/server_scripts/pmmo_class_perk_refresh.js
//
// Project MMO: Classes setzt Klassen-Level per "set" - dabei berechnet PMMO die Attribut-Perks
// NICHT neu (im Spiel bestaetigt: Bonus erst nach /pmmo admin <spieler> attributes refresh).
// Dieses Skript erkennt, wenn sich die Klassen eines Spielers aendern (Insignie benutzt, Klasse
// geloescht, Subklasse gewaehlt, Ascended vergeben) und stoesst den Refresh automatisch an.
//
// Hinweise:
//  - Ein Refresh entfernt kurz alle PMMO-Attribut-Boni und setzt sie neu. Dabei wuerde die
//    aktuelle Lebensanzeige auf die Basis-Max-HP gekappt - das Skript stellt sie deshalb wieder her.
//  - Beim ersten Check nach dem Login mit Klassen wird einmal refreshed (schadet nicht, und
//    uebernimmt geaenderte Perk-Werte nach einer Config-Aenderung).
//  - Rhino/KubeJS: nur ES5 (var/function), eindeutige Praefixe PCL_ gegen Namenskollisionen.

var PCL_APIUtils = Java.loadClass('harmonised.pmmo.api.APIUtils');

var PCL_SKILLS = [
  "fighter", "barbarian", "monk", "paladin", "cleric", "druid",
  "wizard", "sorcerer", "warlock", "artificer", "bard", "ranger",
  "rogue", "alchemist", "armorer", "artillerist", "berserker", "storm_herald",
  "beast", "college_of_swords", "college_of_whispers", "college_of_spirits", "death_domain", "life_domain",
  "war_domain", "circle_of_dreams", "circle_of_spores", "circle_of_wildfire", "champion", "eldritch_knight",
  "samurai", "way_of_the_kensei", "way_of_shadow", "way_of_the_dragon", "oathbreaker", "oath_of_vengeance",
  "oath_of_redemption", "gloom_stalker", "drake_warden", "beast_master", "assassin", "scout",
  "soulknife", "divine_soul", "shadow_magic", "storm_sorcery", "hexblade", "archfey",
  "fathomless", "evocation", "necromancy", "graviturgy", "ragnarok", "sonomancer",
  "vestige", "wildweaver", "titan", "zenith", "luminar", "wayforged",
  "gloomsmith", "eidolon", "hexwright", "sage", "warchanter", "lightborn",
  "stormborn", "warlord", "wildsent", "crusader", "bloodforged", "reaver",
  "sanguinar", "cursebringer", "runebreaker", "hymncaller", "windsinger", "bladedancer",
  "wayfarer", "lorekeeper", "wanderer", "nightsong", "spellweaver", "fatesinger",
  "spellsinger", "hierophant", "templar", "ascetic", "paragon", "warden",
  "inquisitor", "mystic", "occultist", "divinist", "primal", "shaman",
  "wildoath", "stalker", "shade", "stormcaller", "blightcaster", "archdruid",
  "ironguard", "warborn", "vanguard", "duskrender", "runeharrow", "dreadmarked",
  "warcaller", "seraph", "traveler", "whisperer", "arcanist", "voidfist",
  "runic", "redeemer", "ravager", "emberbane", "herald", "auramancer",
  "nightstalker", "dreadhunter", "felweaver", "hexbane", "shadowcaster", "felstalker",
  "illusionist", "scion", "archmage", "darksage"
];

var PCL_CHECK_EVERY = 20;   // Ticks zwischen zwei Pruefungen (20 = 1 Sekunde)
var PCL_ticks = {};        // Zaehler je Spieler (nur im Speicher)
var PCL_signature = {};    // zuletzt gesehener Klassen-Stand je Spieler

PlayerEvents.tick(function (event) {
  var player = event.player;
  var id = String(player.uuid);

  var n = (PCL_ticks[id] || 0) + 1;
  if (n < PCL_CHECK_EVERY) { PCL_ticks[id] = n; return; }
  PCL_ticks[id] = 0;
  if (!player.isAlive()) return;

  var sig = '';
  for (var i = 0; i < PCL_SKILLS.length; i++) {
    var lvl = PCL_APIUtils.getLevel(PCL_SKILLS[i], player);
    if (lvl > 0) sig += PCL_SKILLS[i] + ':' + lvl + ',';
  }

  var old = PCL_signature[id];
  if (old === sig) return;
  PCL_signature[id] = sig;
  if (old === undefined && sig === '') return;   // erster Check, keine Klassen: nichts zu tun

  var hp = player.health;
  player.server.runCommandSilent('pmmo admin ' + player.username + ' attributes refresh');
  player.setHealth(Math.min(hp, player.maxHealth));
});

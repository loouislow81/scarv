/*
 * @@file: test2.js
 * @@description: unittest 02
 * @@version: 0.0.1
 * @@author:
 * @@license: MIT
 * @@copyright:
 */

/* These are some basic unit-tests for the scarv.js module */

var words = JSON.parse('["solut", "devic", "cryptkey2", "contain", "chang", "thi", "conf", "ckeyfiin", "support", "load", "here", "laptop", "file", "exampl", "paramet", "cryptsetup", "when", "proce", "line", "cryptkei", "wiki", "edit", "present", "describ", "ckei", "grub", "first", "warn", "mkinitcpio", "with", "updat", "mount", "manual", "ckeybyif", "least", "need", "multipl", "also", "found", "arch", "then", "us", "encrypt", "packag", "that", "over", "someth", "hook", "doesn", "avail", "avoid", "work", "which", "provid", "order", "initcpio", "anoth", "setup", "mean", "necessari", "default", "disk", "best", "linemkdir", "luk", "system", "unlock", "occurr", "requir", "command", "abl", "cryptdevice2", "encrypt2", "instal", "multi", "last", "extend", "obsolet", "boot", "your", "achiev", "second", "mkdir", "stuff", "final", "displai", "concern", "ad", "cryptdevic", "more", "copi"]');

var scarv2 = new ScarvFilter(words.length, 0.1);
console.log(scarv2);

// Add some elements to the filter.
for (var i = 0; i < words.length; i++) {
  scarv2.add(words[i]);
}

// Test if an item is in our filter.
// Returns true if an item is probably in the set,
// or false if an item is definitely not in the set.
for (var i = 0; i < words.length; i++) {
  console.log(words[i] + " : " + scarv2.test(words[i]));
}

// Serialisation. Note that scarv.buckets may be a typed array,
// so we convert to a normal array first.
var array = [].slice.call(scarv2.buckets),
  json = JSON.stringify(array);

console.log(scarv2.buckets);

/*
 * @@file: test.js
 * @@description: unittest 01
 * @@version: 0.0.1
 * @@author:
 * @@license: MIT
 * @@copyright:
 */

/* These are some basic unit-tests for the scarv.js module */

var scarv = new ScarvFilter(4, 0.1);

// Add some elements to the filter.
scarv.add("foo");
scarv.add("bar");

// Test if an item is in our filter.
// Returns true if an item is probably in the set,
// or false if an item is definitely not in the set.
console.assert(scarv.test("foo") === true);
console.assert(scarv.test("bar") === true);
console.assert(scarv.test("blah") === false);
console.assert(scarv.test("blahahvhzfeh") === false);
console.assert(scarv.test("blahahvhzfehgfgahafgfa") === false);

// Serialisation. Note that scarv.buckets may be a typed array,
// so we convert to a normal array first.
var array = [].slice.call(scarv.buckets),
  json = JSON.stringify(array);

console.log(array);
console.log(json);

// Deserialisation. Note that the any array-like object is supported, but
// this will be used directly, so you may wish to use a typed array for
// performance.
var scarv = new ScarvFilter(array, 0.1);
console.log(scarv);

console.assert(scarv.test("foo") === true);
console.assert(scarv.test("bar") === true);
console.assert(scarv.test("blah") === false);
console.assert(scarv.test("blahahvhzfeh") === false);
console.assert(scarv.test("blahahvhzfehgfgahafgfa") === false);

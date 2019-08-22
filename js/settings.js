/*
 * @@file: settigns.js
 * @@description:
 * @@version: 0.0.1
 * @@author:
 * @@license: MIT
 * @@copyright:
 */

/* Params */
var error_rate = 0.1;

/* Vars */
var scarv = Array(),
  index;
var ready = false;

/* Functions */
function callback() {

  if (typeof (index) === 'undefined' || scarv.length == 0) {
    return;
  }

  // Sets up the page, that is now ready
  ready = true;
  document.getElementById('main').innerHTML = '<y><form id="search_form" role="form"><label class="text-md text-grey-dark" for="search"><span class="text-grey text-lg font-bold">scarv</span> binary search</label><y class="mt-4"><input class="block text-xl text-grey-darkest depth-wide px-4 py-2 rounded-lg w-full" type="text" id="search" name="search" placeholder="Query..." autofocus="autofocus"></y></form></y>';

  // Handle onchange actions
  document.getElementById('search').oninput = function (e) {

    if (!ready) {
      return;
    }

    if (e.target.value !== "") {
      filter_results(e.target.value);
    }
    else {
      document.getElementById("results").innerHTML = "";
    }
  }
}

// Returns true iff all the terms in the array are in the scarv filter b
function terms_in_scarv(terms, b) {
  for (var i = 0; i < terms.length; i++) {
    if (!b.test(terms[i])) {
      return false;
    }
  }
  return true;
}

// Filter the results to match the query
function filter_results(query) {

  var search_terms = query.trim();

  if (search_terms === "") {
    document.getElementById('results').innerHTML = "";
  }
  search_terms = query.split(" ").map(stemmer);

  var results = Array();

  for (var i = 0; i < index.length; i++) {
    if (terms_in_scarv(search_terms, scarv[i])) {
      results.push(index[i]);
    }
  }

  if (results.length > 0) {

    results_html = '<y class="mb-4"><y class="text-sm text-grey depth-wider">' + results.length + ' results found:</y></y><y>';

    for (var i = 0; i < results.length; i++) {
      results_html += '<a class="ml-2 mr-2 text-sm font-semibold text-grey-lighter depth-wider" href="' + results[i]["url"] + '">' + results[i]["title"] + '</a>';
    }
    results_html += '</y>'
  }
  else {
    results_html = '<y class="text-md font-bold depth-wide text-red-light">No results found.</y>';
  }
  document.getElementById('results').innerHTML = results_html;
}


/* App */

// Get the words
var oReq = new XMLHttpRequest();

oReq.open("GET", "datasets/trained-model.pkl", true);
oReq.responseType = "arraybuffer";

oReq.onload = function (oEvent) {

  var array_buffer = oReq.response;

  if (array_buffer) {

    var byte_array = new Int32Array(array_buffer);

    // First element is the number of scarv filters in the binary file
    var nb_scarv_filters = byte_array[0];

    // nb_scarv_filters next elements are the lengths of the arrays
    var lengths = Array();

    for (var i = 0; i < nb_scarv_filters; i++) {
      lengths.push(byte_array[1 + i]);
    }

    // Then, builds Scarv filters
    var l = 0,
      tmp_array;

    for (var i = 0; i < nb_scarv_filters; i++) {
      tmp_array = byte_array.subarray(1 + nb_scarv_filters + l, 1 + nb_scarv_filters + l + lengths[i]);
      l += lengths[i];
      scarv.push(new ScarvFilter(tmp_array, error_rate));
    }

    callback();
  }
  else {
    var error = document.getElementById('error');

    error.innerHTML = 'Unable to load the scarv filters.';
    error.className = "text-md text-red font-bold depth-wide";
  }
};
oReq.send(null);

// Get the pages index
var req = new XMLHttpRequest();

req.open('GET', 'datasets/index.json', true);
req.onreadystatechange = function () {

  if (req.readyState == 4) {
    if (req.status == 200) {

      var tmp = JSON.parse(req.responseText);

      index = tmp['index'];

      callback();
    }
    else {
      document.getElementById('error').innerHTML = 'Unable to load the index.';
    }
  }
};
req.send(null);

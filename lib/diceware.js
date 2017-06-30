var words = require('./wordlist');

var DEFAULT_NUMWORDS = 3;
var WORDLIST_SIZE = 7776; // 6^5

var make_phrase = function() {
  numwords = DEFAULT_NUMWORDS;
  var phrase = "";

  for (var i = 0; i < numwords; i++) {
    var rand = Math.floor(Math.random() * WORDLIST_SIZE);
    phrase += words.num_to_str[rand] + " ";
  }
  // remove the trailing space
  return phrase.substring(0, phrase.length - 1);
}


var phrase_to_id = function(phrase, fixer) {
  var phrase_arr = phrase.trim().toLowerCase().split(' ');

  var base = 1;
  var id = 0;
  for (var i = 0; i < phrase_arr.length; i++) {
    if (phrase_arr[i].length) {
  		if (words.str_to_num[phrase_arr[i]]) {
      	id += words.str_to_num[phrase_arr[i]] * base;
      	base *= WORDLIST_SIZE;
  		}
      else if (typeof fixer == "function") {
        if (fixer(phrase_arr[i])) {
          id += words.str_to_num[fixer(phrase_arr[i])] * base;
        	base *= WORDLIST_SIZE;
        } else {
          throw new Error("Couldn't decode string");
        }
      }
    }
  }
  return id + '';
}

var id_to_phrase = function(id) {
	id = +id;
	var phrase = ''
	while (id > 0) {
		var this_word_code = id % WORDLIST_SIZE;
		phrase += words.num_to_str[this_word_code] + ' ';
		id = Math.floor(id / WORDLIST_SIZE);
	}

	// remove the trailing space
	return phrase.substring(0, phrase.length - 1);
}

module.exports = {
  'make_phrase': make_phrase,
  'phrase_to_id': phrase_to_id,
	'id_to_phrase' : id_to_phrase,
  'make_phrase_with_id': function() {
    var phrase = make_phrase();
    var id = phrase_to_id(phrase);
    return {phrase: phrase, id: id}
  }
}

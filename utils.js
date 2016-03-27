module.exports = {
  toChar: function(codePoint) {
	  return String.fromCharCode(codePoint);
	},
  toOrd: function(character) {
	  return character.charCodeAt(0);
	}
}

// random helper utilies
var colorRE = /^([0-9a-f]{3}){1,2}$/i;

// returns the color in hex or false
var isColor = function(str) {
  if (str[0] === '#') {
    str = str.substr(1);
  }
  if (colorRE.test(str)){
    return str;
  }
  return false;
};

exports.isColor = isColor;

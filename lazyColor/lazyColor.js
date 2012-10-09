var colors = [["aliceblue","#f0f8ff"],["antiquewhite","#faebd7"],["aqua","#00ffff"],["aquamarine","#7fffd4"],["azure","#f0ffff"],["beige","#f5f5dc"],["bisque","#ffe4c4"],["black","#000000"],["blanchedalmond","#ffebcd"],["blue","#0000ff"],["blueviolet","#8a2be2"],["brown","#a52a2a"],["burlywood","#deb887"],["cadetblue","#5f9ea0"],["chartreuse","#7fff00"],["chocolate","#d2691e"],["coral","#ff7f50"],["cornflowerblue","#6495ed"],["cornsilk","#fff8dc"],["crimson","#dc143c"],["cyan","#00ffff"],["darkblue","#00008b"],["darkcyan","#008b8b"],["darkgoldenrod","#b8860b"],["darkgray","#a9a9a9"],["darkgreen","#006400"],["darkgrey","#a9a9a9"],["darkkhaki","#bdb76b"],["darkmagenta","#8b008b"],["darkolivegreen","#556b2f"],["darkorange","#ff8c00"],["darkorchid","#9932cc"],["darkred","#8b0000"],["darksalmon","#e9967a"],["darkseagreen","#8fbc8f"],["darkslateblue","#483d8b"],["darkslategray","#2f4f4f"],["darkslategrey","#2f4f4f"],["darkturquoise","#00ced1"],["darkviolet","#9400d3"],["deeppink","#ff1493"],["deepskyblue","#00bfff"],["dimgray","#696969"],["dimgrey","#696969"],["dodgerblue","#1e90ff"],["firebrick","#b22222"],["floralwhite","#fffaf0"],["forestgreen","#228b22"],["fuchsia","#ff00ff"],["gainsboro","#dcdcdc"],["ghostwhite","#f8f8ff"],["gold","#ffd700"],["goldenrod","#daa520"],["gray","#808080"],["green","#008000"],["greenyellow","#adff2f"],["grey","#808080"],["honeydew","#f0fff0"],["hotpink","#ff69b4"],["indianred","#cd5c5c"],["indigo","#4b0082"],["ivory","#fffff0"],["khaki","#f0e68c"],["lavender","#e6e6fa"],["lavenderblush","#fff0f5"],["lawngreen","#7cfc00"],["lemonchiffon","#fffacd"],["lightblue","#add8e6"],["lightcoral","#f08080"],["lightcyan","#e0ffff"],["lightgoldenrodyellow","#fafad2"],["lightgray","#d3d3d3"],["lightgreen","#90ee90"],["lightgrey","#d3d3d3"],["lightpink","#ffb6c1"],["lightsalmon","#ffa07a"],["lightseagreen","#20b2aa"],["lightskyblue","#87cefa"],["lightslategray","#778899"],["lightslategrey","#778899"],["lightsteelblue","#b0c4de"],["lightyellow","#ffffe0"],["lime","#00ff00"],["limegreen","#32cd32"],["linen","#faf0e6"],["magenta","#ff00ff"],["maroon","#800000"],["mediumaquamarine","#66cdaa"],["mediumblue","#0000cd"],["mediumorchid","#ba55d3"],["mediumpurple","#9370db"],["mediumseagreen","#3cb371"],["mediumslateblue","#7b68ee"],["mediumspringgreen","#00fa9a"],["mediumturquoise","#48d1cc"],["mediumvioletred","#c71585"],["midnightblue","#191970"],["mintcream","#f5fffa"],["mistyrose","#ffe4e1"],["moccasin","#ffe4b5"],["navajowhite","#ffdead"],["navy","#000080"],["oldlace","#fdf5e6"],["olive","#808000"],["olivedrab","#6b8e23"],["orange","#ffa500"],["orangered","#ff4500"],["orchid","#da70d6"],["palegoldenrod","#eee8aa"],["palegreen","#98fb98"],["paleturquoise","#afeeee"],["palevioletred","#db7093"],["papayawhip","#ffefd5"],["peachpuff","#ffdab9"],["peru","#cd853f"],["pink","#ffc0cb"],["plum","#dda0dd"],["powderblue","#b0e0e6"],["purple","#800080"],["red","#ff0000"],["rosybrown","#bc8f8f"],["royalblue","#4169e1"],["saddlebrown","#8b4513"],["salmon","#fa8072"],["sandybrown","#f4a460"],["seagreen","#2e8b57"],["seashell","#fff5ee"],["sienna","#a0522d"],["silver","#c0c0c0"],["skyblue","#87ceeb"],["slateblue","#6a5acd"],["slategray","#708090"],["slategrey","#708090"],["snow","#fffafa"],["springgreen","#00ff7f"],["steelblue","#4682b4"],["tan","#d2b48c"],["teal","#008080"],["thistle","#d8bfd8"],["tomato","#ff6347"],["turquoise","#40e0d0"],["violet","#ee82ee"],["wheat","#f5deb3"],["white","#ffffff"],["whitesmoke","#f5f5f5"],["yellow","#ffff00"],["yellowgreen","#9acd32"]];

var $tbody = $('#colorTable > tbody');
var $input = $('#colorInput');

var ENABLE_HISTORY = location.protocol.substr(0,4) == 'http' &&
                     location.href.substr(location.href.length - 1) == '/' &&
                     window.history && window.history.pushState;

jQuery.fn.sortElements = function() {
  return this.pushStack([].sort.apply( this, arguments ), []);
};

jQuery.fn.sortChildren = function(fn){
  this.children().sortElements(fn).appendTo(this);
  return this;
};

(function createTable(){
  colors.forEach(function(value){
    $('<tr>' +
      '<td style="background-color: transparent;">&nbsp;</td>' +
      '<td style="background-color: ' + value[0] + ';">&nbsp;</td>' +
      '<td style="background-color: ' + value[1] + ';">&nbsp;</td>' +
      '<td class="name">' + value[0] + '</td>' +
      '<td class="hex">' + value[1] + '</td>' +
      '<tr>')
      .data('color', value[1].substr(1))
      .data('lab', Color.convert(value[1].substr(1), 'lab'))
      .appendTo($tbody);
  });
})();

function isColor(str){
  if (str[0] === '#') {
    str = str.substr(1);
  }
  var test = /[0-9a-f]{6}/i;
  if (test.test(str)){
    return str;
  }
  return false;
}

function difference(c1, c2){
  return Math.abs(c1.l - c2.l) + Math.abs(c1.a - c2.a) + Math.abs(c1.b - c2.b);
}


function new_color(color, inPopState){
  var old_color = window._oldColor;
  if (color && color != old_color){
    // TODO pre-compute differences
    var lab = Color.convert(color, 'lab');
    $tbody.sortChildren(function(a, b){
      return difference(lab, $(a).data('lab')) - difference(lab, $(b).data('lab'));
    });
    $tbody.find('tr > td:nth-child(1)').css('backgroundColor', '#' + color);
    window._oldColor = color;
    if (ENABLE_HISTORY && inPopState !== true){
      history.pushState({ color: color}, appHistory.newTitle(color), appHistory.newPath(color));
    }
  }
}

$input.on('keyup change', function(){
  var color = isColor($input.val());
  new_color(color);
});


// html5 history
var appHistory = {
  basePath: location.pathname,
  newPath: function(color){
    return this.basePath + color + '/';
  },
  title: $('head > title').html(),
  newTitle: function(color){
    return $tbody.find('tr:first > td.name').text() + " " + this.title;
  }
};
$(window).on("popstate", function(){
  var state = history.state;
  if (!state || !state.color){ return; }
  $input.val(state.color);
  new_color(state.color, true);
});


// autopopulate input if color found in url
(function (){
  var u = location.href;
  t = u.match(/([\w]+)\/?$/)[1];
  if (isColor(t)) {
    var pathname = location.pathname.split('/');
    // TODO improve this logic
    pathname.pop();
    pathname.pop();
    appHistory.basePath = pathname.join('/') + '/';
    console.log("override basepath", appHistory.basePath, pathname);
    $input.val(t).change();
  }
})();

/*global $, Color */
var w3ccolors = [["aliceblue","#f0f8ff"],["antiquewhite","#faebd7"],["aqua","#00ffff"],["aquamarine","#7fffd4"],["azure","#f0ffff"],["beige","#f5f5dc"],["bisque","#ffe4c4"],["black","#000000"],["blanchedalmond","#ffebcd"],["blue","#0000ff"],["blueviolet","#8a2be2"],["brown","#a52a2a"],["burlywood","#deb887"],["cadetblue","#5f9ea0"],["chartreuse","#7fff00"],["chocolate","#d2691e"],["coral","#ff7f50"],["cornflowerblue","#6495ed"],["cornsilk","#fff8dc"],["crimson","#dc143c"],["cyan","#00ffff"],["darkblue","#00008b"],["darkcyan","#008b8b"],["darkgoldenrod","#b8860b"],["darkgray","#a9a9a9"],["darkgreen","#006400"],["darkgrey","#a9a9a9"],["darkkhaki","#bdb76b"],["darkmagenta","#8b008b"],["darkolivegreen","#556b2f"],["darkorange","#ff8c00"],["darkorchid","#9932cc"],["darkred","#8b0000"],["darksalmon","#e9967a"],["darkseagreen","#8fbc8f"],["darkslateblue","#483d8b"],["darkslategray","#2f4f4f"],["darkslategrey","#2f4f4f"],["darkturquoise","#00ced1"],["darkviolet","#9400d3"],["deeppink","#ff1493"],["deepskyblue","#00bfff"],["dimgray","#696969"],["dimgrey","#696969"],["dodgerblue","#1e90ff"],["firebrick","#b22222"],["floralwhite","#fffaf0"],["forestgreen","#228b22"],["fuchsia","#ff00ff"],["gainsboro","#dcdcdc"],["ghostwhite","#f8f8ff"],["gold","#ffd700"],["goldenrod","#daa520"],["gray","#808080"],["green","#008000"],["greenyellow","#adff2f"],["grey","#808080"],["honeydew","#f0fff0"],["hotpink","#ff69b4"],["indianred","#cd5c5c"],["indigo","#4b0082"],["ivory","#fffff0"],["khaki","#f0e68c"],["lavender","#e6e6fa"],["lavenderblush","#fff0f5"],["lawngreen","#7cfc00"],["lemonchiffon","#fffacd"],["lightblue","#add8e6"],["lightcoral","#f08080"],["lightcyan","#e0ffff"],["lightgoldenrodyellow","#fafad2"],["lightgray","#d3d3d3"],["lightgreen","#90ee90"],["lightgrey","#d3d3d3"],["lightpink","#ffb6c1"],["lightsalmon","#ffa07a"],["lightseagreen","#20b2aa"],["lightskyblue","#87cefa"],["lightslategray","#778899"],["lightslategrey","#778899"],["lightsteelblue","#b0c4de"],["lightyellow","#ffffe0"],["lime","#00ff00"],["limegreen","#32cd32"],["linen","#faf0e6"],["magenta","#ff00ff"],["maroon","#800000"],["mediumaquamarine","#66cdaa"],["mediumblue","#0000cd"],["mediumorchid","#ba55d3"],["mediumpurple","#9370db"],["mediumseagreen","#3cb371"],["mediumslateblue","#7b68ee"],["mediumspringgreen","#00fa9a"],["mediumturquoise","#48d1cc"],["mediumvioletred","#c71585"],["midnightblue","#191970"],["mintcream","#f5fffa"],["mistyrose","#ffe4e1"],["moccasin","#ffe4b5"],["navajowhite","#ffdead"],["navy","#000080"],["oldlace","#fdf5e6"],["olive","#808000"],["olivedrab","#6b8e23"],["orange","#ffa500"],["orangered","#ff4500"],["orchid","#da70d6"],["palegoldenrod","#eee8aa"],["palegreen","#98fb98"],["paleturquoise","#afeeee"],["palevioletred","#db7093"],["papayawhip","#ffefd5"],["peachpuff","#ffdab9"],["peru","#cd853f"],["pink","#ffc0cb"],["plum","#dda0dd"],["powderblue","#b0e0e6"],["purple","#800080"],["red","#ff0000"],["rosybrown","#bc8f8f"],["royalblue","#4169e1"],["saddlebrown","#8b4513"],["salmon","#fa8072"],["sandybrown","#f4a460"],["seagreen","#2e8b57"],["seashell","#fff5ee"],["sienna","#a0522d"],["silver","#c0c0c0"],["skyblue","#87ceeb"],["slateblue","#6a5acd"],["slategray","#708090"],["slategrey","#708090"],["snow","#fffafa"],["springgreen","#00ff7f"],["steelblue","#4682b4"],["tan","#d2b48c"],["teal","#008080"],["thistle","#d8bfd8"],["tomato","#ff6347"],["turquoise","#40e0d0"],["violet","#ee82ee"],["wheat","#f5deb3"],["white","#ffffff"],["whitesmoke","#f5f5f5"],["yellow","#ffff00"],["yellowgreen","#9acd32"]];
var hexcolors = [["Abacas","#ABACA5"],["Abbess","#ABBE55"],["Accede","#ACCEDE"],["Access","#ACCE55"],["Accost","#ACC057"],["Acetal","#ACE7A1"],["Affect","#AFFEC7"],["Afloat","#AF10A7"],["Albata","#A1BA7A"],["Albedo","#A1BED0"],["Aldose","#A1D05E"],["Allele","#A11E1E"],["Assess","#A55E55"],["Assets","#A55E75"],["Allest","#A77E57"],["Babble","#BABB1E"],["Badass","#BADA55"],["Baffle","#BAFF1E"],["Balata","#BA1A7A"],["Balboa","#BA1B0A"],["Ballad","#BA11AD"],["Ballet","#BA11E7"],["Ballot","#BA1107"],["Basalt","#BA5A17"],["Basset","#BA55E7"],["Battle","#BA771E"],["Beaded","#BEADED"],["Beetle","#BEE71E"],["Befall","#BEFA11"],["Befool","#BEF001"],["Belted","#BE17ED"],["Blotto","#B10770"],["Bobble","#B0BB1E"],["Bobcat","#B0BCA7"],["Boobee","#B00BEE"],["Boodle","#B00D1E"],["Booted","#B007ED"],["Bootee","#B007ED"],["Bottle","#B0771E"],["Cabala","#CABA1A"],["Cabbie","#CABB1E"],["Cablet","#CAB1E7"],["Calces","#CA1CE5"],["Casaba","#CA5ABA"],["Castle","#CA571E"],["Catalo","#CA7A10"],["Cattle","#CA771E"],["Closed","#C105ED"],["Closet","#C105E7"],["Cobalt","#C0BA17"],["Cobble","#C0BB1E"],["Coddle","#C0DD1E"],["Coffee","#C0FFEE"],["Coffle","#C0FF1E"],["Collet","#C011E7"],["Cosset","#C055E7"],["Dabble","#DABB1E"],["Doddle","#D0DD1E"],["Debase","#DEBA5E"],["Decade","#DECADE"],["Decaff","#DECAFF"],["Decode","#DEC0DE"],["Deface","#DEFACE"],["Defeat","#DEFEA7"],["Defect","#DEFEC7"],["Delete","#DE1E7E"],["Detect","#DE7EC7"],["Detest","#DE7E57"],["Doodle","#D00D1E"],["Dossal","#D055A1"],["Dotted","#D077ED"],["Dottle","#D0771E"],["Efface","#EFFACE"],["Effect","#EFFEC7"],["Effete","#EFFE7E"],["Eldest","#E1DE57"],["Fabled","#FAB1ED"],["Faeces","#FAECE5"],["Fallal","#FA11A1"],["Fasces","#FA5CE5"],["Feeble","#FEEB1E"],["Felloe","#FE110E"],["Festal","#FE57A1"],["Fettle","#FE771E"],["Fleece","#F1EECE"],["Floats","#F10A75"],["Fiasco","#F1A5C0"],["Footed","#F007ED"],["Footle","#F0071E"],["LabLab","#1AB1AB"],["Lessee","#1E55EE"],["Loaded","#10ADED"],["Locale","#10CA1E"],["Obsess","#0B5E55"],["Obtect","#0B7EC7"],["Obtest","#0B7E57"],["0celot","#0CE107"],["Offset","#0FF5E7"],["Oldest","#01DE57"],["Oddles","#00D1E5"],["Osteal","#057EA1"],["Saddle","#5ADD1E"],["Salade","#5A1ADE"],["Sallet","#5A11E7"],["Salted","#5A17ED"],["Sealed","#5EA1ED"],["Secede","#5ECEDE"],["Select","#5E1EC7"],["Setose","#5E705E"],["Settee","#5E77EE"],["Settle","#5E771E"],["Solace","#501ACE"],["Sotted","#5077ED"],["Stable","#57AB1E"],["Stacte","#57AC7E"],["Steels","#57EE15"],["Tables","#7AB1E5"],["Tablet","#7AB1E7"],["Tassle","#7A55E1"],["Tasset","#7A55E7"],["Tattle","#7A771E"],["Tattoo","#7A7700"],["Teasel","#7EA5E1"],["Testee","#7E57EE"],["Testes","#7E57E5"],["Toddle","#70DD1E"],["Toffee","#70FFEE"],["Tootle","#70071E"]];

var $tbody = $('#colorTable > tbody'),
    $input = $('#colorInput'),
    $first;

var ENABLE_HISTORY = location.protocol.substr(0,4) == 'http' &&
                     location.href.substr(location.href.length - 1) == '/' &&
                     window.history && window.history.pushState;

// Utils
var utils = (function() {
  "use strict";
  // returns the color in hex or false
  var isColor = function(str) {
    if (str[0] === '#') {
      str = str.substr(1);
    }
    var test = /([0-9a-f]{3}){1,2}/i;
    if (test.test(str)){
      return str;
    }
    return false;
  };

  // exports
  return {
    isColor: isColor
  };
})();


// HTML5 History
(function(exports){
  "use strict";
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
    $('.input-label').text(state.color);
    lazyColor.newColor(state.color, true);
  });

  // autopopulate input if color found in url
  var u = location.href;
  var t = u.match(/([\w]+)\/?$/)[1];
  if (utils.isColor(t)) {
    var pathname = location.pathname.split('/');
    // TODO improve this logic
    pathname.pop();
    pathname.pop();
    appHistory.basePath = pathname.join('/') + '/';
    // console.log("override basepath", appHistory.basePath, pathname);
    $input.val(t).change();
    $('.input-label').text(t);
  }

  // exports
  exports.appHistory = appHistory;
})(window);


// the code to generate the tbody
/*global $tbody, Color, d3 */
var lazyColor = (function(exports){
  "use strict";

  var data,
      lastD,
      paper = d3.select($tbody[0]),
      rows = paper.selectAll('tr'),
      weights = {
        l: 1,
        a: 1,
        b: 1,
        h: 0,
        s: 0,
        v: 0
      };

  // bind DOM to `weights`
  $('#weight-h').on('change', function(){
    weights.h = this.value;
    if (typeof lastD !== 'undefined') {
      sortColorTable(lastD);
    }
  });
  $('#weight-s').on('change', function(){
    weights.s = this.value;
    if (typeof lastD !== 'undefined') {
      sortColorTable(lastD);
    }
  });
  $('#weight-v').on('change', function(){
    weights.v = this.value;
    if (typeof lastD !== 'undefined') {
      sortColorTable(lastD);
    }
  });

  var distance = function(c1, c2) {
    return Math.abs(c1.l - c2.l) +
      Math.abs(c1.a - c2.a) +
      Math.abs(c1.b - c2.b) +
      weights.h * Math.abs(c1.h - c2.h) +
      weights.s * Math.abs(c1.s - c2.s) +
      weights.v * Math.abs(c1.v - c2.v);
  };

  var sortColorTable = function(d) {
    for (var i = 0, n = data.length; i < n; i++) {
      data[i].distance = distance(d, data[i]);
    }
    rows.sort(function(a, b) {
      return a.distance - b.distance;
    });
    // update form element
    $input.val(d.hex);
    $('.input-label').text(d.hex);

    // HACK to get css transitions to work, need to delay setting color
    setTimeout(function() {
      $first.css('backgroundColor', d.hex);
    }, 1);
    // scroll to the top of the page
    var $page = $('html, body');
    if (!$page.filter(':animated').length){  // basic debounce
      $page.animate({'scrollTop': 0});
    }
    lastD = d;
  };

  // render the table, replacing the tbody
  // arguments:
  //   colors: an array of [name, rgb]
  var renderColorTable = function(colors) {
    data = colors.map(function(value) {
      // manually extend the hash instead of using an extend helper for speed
      var d = Color.convert(value[1].substr(1), 'lab'),
          hsv = Color.convert(value[1].substr(1), 'hsv');
      d.name = value[0];
      d.hex = value[1];
      d.h = hsv.h;
      d.s = hsv.s;
      d.v = hsv.v;
      return d;
    });

    // a template.... ish
    var templateish = function(d){
      var title = 'LAB: ' + d.l.toFixed(2) + ',' + d.a.toFixed(2) + ',' + d.b.toFixed(2) +
        ' HSV: ' + d.h + ',' + d.s + ',' + d.v;
      return '<td style="background-color: transparent;">&nbsp;</td>' +
        '<td style="background-color: ' + d.hex + ';" title="' + title + '">' +
        '<span class="named" style="background-color: ' + d.name + ';">&nbsp;</span>&nbsp;</td>' +
        '<td class="name">' + d.name + '</td>' +
        '<td class="hex">' + d.hex + '</td>' +
        '<tr>';
    };
    rows = rows.data(data);
    // CREATE
    rows.enter()
      .append('tr').html(templateish)
      .on('click', sortColorTable);
    // UPDATE
    rows
      .html(templateish);
    // DELETE
    rows.exit()
      .remove();

    $first = $tbody.find('tr > td:nth-child(1)');
    $input.change();
  };

  // change color
  var newColor = function(hex, inPopState) {
    var old_color = window._oldColor, lab;
    if (hex && hex == old_color) {
      return;
    }
    var datum = Color.convert(hex, 'lab'),
        hsv = Color.convert(hex, 'hsv');
    datum.name = 'unknown';
    datum.hex = '#' + hex;
    datum.h = hsv.h;
    datum.s = hsv.s;
    datum.v = hsv.v;
    sortColorTable(datum);
    window._oldColor = hex;
    if (ENABLE_HISTORY && inPopState !== true){
      history.pushState({ color: hex },
        window.appHistory.newTitle(hex),
        window.appHistory.newPath(hex));
    }
  };


  // exports
  return {
    renderColorTable: renderColorTable,
    newColor: newColor,
    sort: sortColorTable
  };
})();


// TOPBAR UI
//
// code for wiring up the widgets in the top bar to the app.
// TODO move input code here
// TODO move slider code here
(function(){
  "use strict";

  // options
  var ACTIVE_CLASS = "btn-primary";

  // TODO remember choice for... 30 days?
  $('<a class="btn btn-info btn-mini">Ok, I got it!</a>')
    .on('click', function() {
      // XXX meh, so hacky
      $('div.top').height($('div.controls').outerHeight());
      $('p.intro').hide(500);
    })
    .appendTo($('p.intro'));

  $input.on('keyup change', function(){
    var color = utils.isColor($input.val());
    lazyColor.newColor(color);
  });

  $('#colors-picker .btn').click(function(){
    var $this = $(this);
    if ($this.hasClass(ACTIVE_CLASS)) {
      return;
    }
    $this.addClass(ACTIVE_CLASS).siblings().removeClass(ACTIVE_CLASS);
    // TODO don't assume it's on `window`
    lazyColor.renderColorTable(window[$this.attr('rel')]);
  });

})();


// Main
lazyColor.renderColorTable(w3ccolors);

// the code to generate the tbody
/*global $, d3, Color */
define(function(){
  "use strict";

  // FIXME
  var $input = $('#colorInput');


  var data,
      lastD,
      $first,
      $el,
      el,
      paper,
      rows,
      weights = {
        l: 1,
        a: 1,
        b: 1,
        h: 0,
        s: 0,
        v: 0
      };

  var distance = function(c1, c2) {
    return Math.abs(c1.l - c2.l) +
      Math.abs(c1.a - c2.a) +
      Math.abs(c1.b - c2.b) +
      weights.h * Math.abs(c1.h - c2.h) +
      weights.s * Math.abs(c1.s - c2.s) +
      weights.v * Math.abs(c1.v - c2.v);
  };

  // a template.... ish
  var templateish = function(d){
    var title = 'LAB: ' + d.l.toFixed(2) + ',' + d.a.toFixed(2) + ',' + d.b.toFixed(2) +
      ' HSV: ' + d.h + ',' + d.s + ',' + d.v;
    return '<td style="background-color: transparent;">&nbsp;</td>' +
      '<td style="background-color: ' + d.hex + ';" title="' + title + '">' +
      '<span class="named" style="background-color: ' + d.name + ';">&nbsp;</span>&nbsp;</td>' +
      '<td class="name">' + d.name + '</td>' +
      '<td class="hex">' + d.hex + '</td>';
  };

  // convert ['name', '#abc'] to a data point
  var getDatum = function(value){
    // manually extend the hash instead of using an extend helper for speed
    var d = Color.convert(value[1].substr(1), 'lab'),
        hsv = Color.convert(value[1].substr(1), 'hsv');
    d.name = value[0];
    d.hex = value[1];
    d.h = hsv.h;
    d.s = hsv.s;
    d.v = hsv.v;
    return d;
  };

  // get external configuration
  var init = function(_$el) {
    $el = _$el;
    el = $el[0];
    paper = d3.select(el);
    rows = paper.selectAll('tr');
  };

  var setWeight = function(key, value) {
    weights[key] = value;
    // if table was already sorted once, re-sort
    if (typeof lastD !== 'undefined') {
      sortColorTable(lastD);
    }
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
    data = colors.map(getDatum);

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

    $first = $el.find('tr > td:nth-child(1)');
  };


  // change color
  var newColor = function(hex, inPopState) {
    if (hex && hex == window._oldColor) {
      return;
    }
    sortColorTable(getDatum(['unknown', '#' + hex]));
    window._oldColor = hex;
    // TODO
    // if (ENABLE_HISTORY && inPopState !== true){
    //   history.pushState({ color: hex },
    //     window.appHistory.newTitle(hex),
    //     window.appHistory.newPath(hex));
    // }
  };


  return {
    init: init,
    setWeight: setWeight,
    renderColorTable: renderColorTable,
    newColor: newColor,
    sort: sortColorTable
  };
});

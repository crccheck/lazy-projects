// the code to generate the tbody
/*jshint expr:true */
define(['jquery', 'd3', 'color'], function($, d3, Color){
  "use strict";

  function TBody($el, options) {
    // properties
    this.data = null;  // color data [[name, hex], ...]
    this.lastD = null;  // cheat used to determine if table has been sorted
    this.$first = null;  // cache selector to mass set input color
    this.$el = null;  // tbody $el
    this.el = null;  // tbody el
    this.paper = null;  // d3 container
    this.rows = null;  // d3 data-bound elems
    this.weights = {
      l: 1,
      a: 1,
      b: 1,
      h: 0,
      s: 0,
      v: 0
    };

    // events
    this.postSort = null;

    this.init($el, options);
  }


  TBody.prototype.distance = function(c1, c2) {
    return Math.abs(c1.l - c2.l) +
      Math.abs(c1.a - c2.a) +
      Math.abs(c1.b - c2.b) +
      this.weights.h * Math.abs(c1.h - c2.h) +
      this.weights.s * Math.abs(c1.s - c2.s) +
      this.weights.v * Math.abs(c1.v - c2.v);
  };


  // set internal properties based on external configuration
  TBody.prototype.init = function($el, options) {
    options = options || {};

    this.$el = $el;
    this.el = $el[0];
    this.paper = d3.select(this.el);
    this.rows = this.paper.selectAll('tr');
    this.postSort = options.postSort;
  };


  // API for changing weights
  TBody.prototype.setWeight = function(key, value) {
    this.weights[key] = value;
    // if table was already sorted once, re-sort
    if (this.lastD) {
      this.sort(this.lastD);
    }
  };


  TBody.prototype.sort = function(d) {
    var self = this;

    for (var i = 0, n = this.data.length; i < n; i++) {
      this.data[i].distance = this.distance(d, this.data[i]);
    }
    this.rows.sort(function(a, b) {
      return a.distance - b.distance;
    });

    this.postSort && this.postSort(d);

    // HACK to get css transitions to work, need to delay setting color
    setTimeout(function() {
      self.$first.css('backgroundColor', d.hex);
    }, 1);

    // scroll to the top of the page
    var $page = $('html, body');
    if (!$page.filter(':animated').length){  // basic debounce
      $page.animate({'scrollTop': 0});
    }
    this.lastD = d;
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


  // render the table
  // arguments:
  //   colors: an array of [name, rgb]
  TBody.prototype.setColors = function(colors) {
    var self = this;

    this.data = colors.map(getDatum);

    this.rows = this.rows.data(this.data);
    // CREATE
    this.rows.enter()
      .append('tr').html(templateish)
      .on('click', function(d){ self.sort(d); });
    // UPDATE
    this.rows
      .html(templateish);
    // DELETE
    this.rows.exit()
      .remove();

    this.$first = this.$el.find('tr > td:nth-child(1)');
  };


  // change color
  // wrapper around `sort`
  TBody.prototype.newColor = function(hex) {
    if (hex && hex == this._oldColor) {
      // nothing changed, skip
      return;
    }
    this.sort(getDatum(['unknown', '#' + hex]));
    this._oldColor = hex;
    // TODO
    // if (ENABLE_HISTORY && inPopState !== true){
    //   history.pushState({ color: hex },
    //     window.appHistory.newTitle(hex),
    //     window.appHistory.newPath(hex));
    // }
  };


  return TBody;
});

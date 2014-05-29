// HTML5 History
/*global location, history */
var utils = require('./utils.js');
var $ = require('jquery');

// FIXME
var $tbody = $('#colorTable > tbody'),
    $input = $('#colorInput');

var ENABLE_HISTORY = location.protocol.substr(0,4) == 'http' &&
                     location.href.substr(location.href.length - 1) == '/' &&
                     window.history && window.history.pushState;

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
  // FIXME uncomment next line
  // tbody.newColor(state.color, true);
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
module.exports = appHistory;

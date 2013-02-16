

## Getting the list of colors

* With jQuery on, execute:

### W3C Colors

* Browse to: http://www.w3.org/TR/css3-color/

    JSON.stringify($('.colortable:last tr:not(:first) > td:nth-child(3)').toArray().map(function(el){ return [$(el).text().trim(), $(el).next().text().trim()]; }))

### Hex Words

* Browse to: http://hexwords.info

    JSON.stringify($('div.block').map(function(){
      var parts = $(this).css('background-color').match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      delete (parts[0]);
      for (var i = 1; i <= 3; i+) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length === 1) parts[i] = '0' + parts[i];
      }
      var rgb ='#'+parts.join('').toUpperCase();
      var t = $('.name', this).text(); return [[t, rgb]]; }).toArray())

    // http://stackoverflow.com/questions/638948/background-color-hex-to-javascript-variable-jquery

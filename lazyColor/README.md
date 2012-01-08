

Getting the list of colors
==========================
* Browse to: http://www.w3.org/TR/css3-color/
* With jQuery on, execute:

    JSON.stringify($('.colortable:last tr:not(:first) > td:nth-child(3)').toArray().map(function(el){ return [$(el).text().trim(), $(el).next().text().trim()]; }))

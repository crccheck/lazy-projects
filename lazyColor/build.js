// see https://github.com/jrburke/r.js/blob/master/build/example.build.js
({
  baseUrl: 'js',
  name: '../vendor/almond',
  include: ['main'],
  wrap: true,
  paths: {
    jquery: 'vendor/jquery',
    d3: 'vendor/d3',
    color: 'vendor/i-color.dev'
  },
  shim: {
    'd3': {
      exports: 'd3'
    },
    'color': {
      exports: 'Color'
    }
  }
})

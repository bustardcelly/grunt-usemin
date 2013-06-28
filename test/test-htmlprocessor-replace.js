'use strict';
var assert = require('assert');
var HTMLProcessor = require('../lib/htmlprocessor');

describe('htmlprocessor', function () {

  describe('build:replace', function() {

    it('should detect and handle the usage on RequireJS in blocks', function () {
      var htmlcontent = '<!-- build:replace scripts/amd-app.js -->\n' +
      '<script data-main="scripts/main" src="scripts/vendor/require.js"></script>\n' +
      '<!-- endbuild -->';
      var hp = new HTMLProcessor('', '', htmlcontent, 3);
      assert.equal(1, hp.blocks.length);
      assert.ok(hp.blocks[0].requirejs);
      assert.equal('replace', hp.blocks[0].type);
      assert.equal('scripts/amd-app.js', hp.blocks[0].requirejs.dest);
      assert.equal('scripts', hp.blocks[0].requirejs.baseUrl);
      assert.equal('scripts/vendor/require.js', hp.blocks[0].requirejs.src);
      assert.equal('main', hp.blocks[0].requirejs.name);
    });

    describe('replaceWith', function() {

      it('should return a string that will remove the requirejs dependency and src as main output', function () {
        var htmlcontent = '<!-- build:replace scripts/amd-app.js -->\n' +
        '<script data-main="scripts/main" src="scripts/vendor/require.js"></script>\n' +
        '<!-- endbuild -->\n';
        var hp = new HTMLProcessor('', '', htmlcontent, 3);
        var replacestring = hp.replaceWith(hp.blocks[0]);
        assert.equal('<script src="scripts/amd-app.js"></script>', replacestring);
      });

    });

  });

});
'use strict';

var StarLog = require('starlog');

var api = {
    start: function(options)
    {
        if (options && this.starlog) {
            this.starlog.stop(); // stop the old one before redefining it with new options object
        }

        if (!this.starlog || options) {
            options = Object.assign({}, options);
            options.select = options.select || this;
            options.pattern = options.pattern || /Event(\.call\(this, |\()'(fin-[a-z-]+)'/;
            options.target = options.target || window.grid.canvas;

            var black = ['fin-tick'];
            options.match = options.match || {};
            options.match.greylist = options.match.greylist || {};
            options.match.greylist.black = options.match.greylist.black ? black.concat(options.match.greylist.black) : black;

            this.starlog = new StarLog(options);
        }

        this.starlog.start();
    },

    stop: function() {
        this.starlog.stop();
    }
};

function prefix(prefix, name) {
    if (prefix.length && prefix[prefix.length - 1] !== '_') {
        name = name.substr(0, 1).toUpperCase() + name.substr(1);
    }
    return prefix + name;
}

exports.preinstall = function(methodPrefix) {
    Object.keys(api).forEach(function(key) {
        this[prefix(methodPrefix || 'log', key)] = api[key];
    }, this);
};

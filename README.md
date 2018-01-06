Hypegrid starlog plug-in

### Summary

Adds an event logger to your Hypergrid application for debugging purposes.

### Synopsis

#### 1. Installing the plugin
```js
var Hypergrid = require('fin-hypergrid');
var eventLoggerPlugin = require('fin-hypergrid-event-logger')

// Shared plugin: Install on the prototype:
Hypergrid.prototype.installPlugins(eventLoggerPlugin);
// The plugin is now available to all existing and new grid instances

// Instance plugin: Install on the instance (available to this instance only):
var grid = new Hypergrid;
grid.installPlugins(eventLoggerPlugin);

// or in one step:
var grid = new Hypergrid({ plugins: eventLoggerPlugin });

```
> NOTE: In actual practice you would want to wait for the DOM to finish loading before instantiating a grid.

#### 2. Starting and stopping event logging
```js
myGrid.logStart(); // event signals are now being logged (to the console by default)
...
myGrid.logStop(); // events are no longer logged
```

### Description

Adds `logStart()` and `logStop()` methods to `Hypergrid.prototype` similar to the [`starlog`](https://www.npmjs.com/package/starlog) methods of the same names except that:
* The `StarLog` constructor is called automatically when this `logStart` is called with a starlog options object.
* This `logStart` adds some default option values directing starlog to:
   * Search grid instance for event strings
   * Blacklist the `fin-tick` event string
   * Attach logging listeners to the canvas element

The default [search pattern](https://github.com/fin-hypergrid/event-logger/blob/master/index.js#L18) looks for calls to `dispatchEvent` and `CustomEvent`.
The search currently yields 29 events.
Of these, [18 have custom listeners](https://github.com/fin-hypergrid/event-logger/blob/master/index.js#L18) that log specific information; the rest use the [default listener](https://github.com/joneit/starlog/blob/master/index.js#L138-L140) that logs only the event name.

### Installation options
`methodPrefix` is the only installation option.
It overrides the default method name prefix (`log`).
```js
Hypergrid.prototype.installPlugins([eventLoggerPlugin, 'starlog_']);
```
The above installs the methods `starlog_start()` and `starlog_stop()` instead of the default `logStart()` and `logStop()`.

### Loading the plug-in

See the [_Loading Modules_](https://github.com/fin-hypergrid/core/wiki/Loading-Modules) wiki.
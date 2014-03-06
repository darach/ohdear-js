**ohdear**

*Because black swans happen.*

This is a very simple module to enable periodic heap dump generation and launching webkit development tools on application start.

Hooks are provided to start/stop webkit development tools programatically or to take heapdump snapshots on demand.

## Examples

###**Default. Heapdump every hour, no debug agent**

```javascript
var feck = require('ohdear');

console.log('the rest of your app goes here')
```

###**Change heapdump periodicity to every minute**
```javascript
var feck = require('ohdear')({dumpInterval: 60000}); // 60000ms = 60s = 1m

console.log('the rest of you rapp goes here')
```

###**Debug. Heapdump every hour, activate debug agent on start**

```javascript
var feck = require('ohdear')({activateAgentOnStart: true});

console.log('the rest of your app goes here')
```

###**On demand heapdumps only with debug agent on start**

```javascript
var feck = require('ohdear')({dumpOnDemand: true, activateAgentOnStart: true});

console.log('the rest of your app goes here')
```

###**Dump heap as you need**

```javascript
var feck = require('ohdear')({dumpOnDemand: true, activateAgentOnStart: true});

feck.snapshot(); // Whenever you want/need a heapdump

console.log('the rest of your app goes here')
```

###**On demand debug agent enable/disable**

```javascript
var feck = require('ohdear')({dumpOnDemand: true, activateAgentOnStart: true});

feck.toggle(); // Activated -> Deactivated
feck.toggle(); // Deactivated -> Activated

console.log('the rest of your app goes here')
```

###**Is the debug agent running**

```javascript
var feck = require('ohdear')();

feck.isWatching(); // false, unless activated on start option is provided as above
```

###**Log interactions**

```javascript
var feck = require('ohdear')();

feck.onActivate(function() {
    console.log("Activated debug agent");
});
feck.onDeactivate(function() {
    console.log("Deactivated debug agent");
});
feck.onDump(function() {
    console.log("Taking a dump");
});
```

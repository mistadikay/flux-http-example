Flux example with http request
=====================

If you're stuck at understanding Flux architecture, this example might help you. It contains very basic flux data flow with http request and errors handling.

Flux technologies stack:
* for the sake of simplicity, this example uses just original [Facebook's Flux dispatcher](https://github.com/facebook/flux)
* [superagent](https://github.com/visionmedia/superagent) for http requests
* [eventemitter3](https://github.com/primus/eventemitter3) for emitting events from store to react component

Illustration of Flux unidirectional data flow:
![Flux flow](https://github.com/facebook/flux/raw/master/docs/img/flux-diagram-white-background.png)

### installation

```
npm install
```

### run

```
npm start
```
Runs webpack-dev-server with HMR at http://localhost:3000

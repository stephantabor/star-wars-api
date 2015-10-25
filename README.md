# star-wars-api [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> swapi.co (star wars api) wrapper for node


## Install

```sh
$ npm install --save star-wars-api
```

## Usage

```js
var StarWarsAPI = require('star-wars-api');

swapi = new StarWarsAPI();
```

### Get
All methods return a bluebird promise.

`.get` requires two arguments, a `resource` and an `id`. `id` can be a `string`, `number`, or `array`.

```js
swapi.get('people', 1)
    .then(person => /* do something */)
    .catch(err => /* handle error */);
    
swapi.get('starships', [9, 10])
    .then(console.log) // logs [{name: 'Death Star' ...}, {name: 'Millenium Falcon' ...}]
```

Errors and responses from swapi.co that are not of status code 200 will
be rejected.

```js
swapi.get('people', 'Vegeta')
    .catch(console.error) // logs [Error] 404
```

Too few arguments to `.get` also throws an error. All resources except a full url require an `id` argument to passed to `.get` with them. 

```js
// no id argument results in a rejected promise
swapi.get('planets')
    .then(console.log)    // doesn't log
    .catch(console.error) // logs [Error] id argument required

// full resource url doesn't need id
swapi.get('http://swapi.co/api/species/3/')
    .then(console.log) // {name: 'Wookiee', language: 'Shyriiwook'...}
```

The full list of valid resources is: 

```
people, films, starships, planets, vehicles, species
```


### Convenience Methods

All valid resource argumets to `.get` also have convenience methods: 

```js
swapi.people(1)
swapi.films([7, 6, 3, 2, 1])
// etc...
```

The full list of api resources can obtained from the api via `.describe`

```js
swapi.describe()
```

## License

MIT © [Stephan Tabor](http://stephantabor.com)


[npm-image]: https://badge.fury.io/js/star-wars-api.svg
[npm-url]: https://npmjs.org/package/star-wars-api
[travis-image]: https://travis-ci.org/stephantabor/star-wars-api.svg?branch=master
[travis-url]: https://travis-ci.org/stephantabor/star-wars-api
[daviddm-image]: https://david-dm.org/stephantabor/star-wars-api.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/stephantabor/star-wars-api
[coveralls-image]: https://coveralls.io/repos/stephantabor/star-wars-api/badge.svg
[coveralls-url]: https://coveralls.io/r/stephantabor/star-wars-api

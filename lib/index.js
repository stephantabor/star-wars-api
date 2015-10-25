import request from 'request';
import Promise from 'bluebird';
import {extend, urlJoin} from './utils.js';

class Swapi {
    constructor(stub) {
        this.baseUrl = 'http://swapi.co/api/';
        this.request = stub || request;
    }

    static _listResources() {
        return [
            'people',
            'films',
            'starships',
            'vehicles',
            'species',
            'planets'
        ];
    }

    describe() {
        return this._end(this.baseUrl);
    }

    get(resource, id) {
        if (Array.isArray(id)) {
            return Promise.all(id.map(elem => this.get(resource, elem)));
        }
        if (/^http/.test(resource)) {
            return this._end(resource);
        }
        if (id === undefined) {
            return this._buildQuery(resource);
        }

        return this._buildQuery(resource, id).bind(this).then(this._end);
    }

    _buildQuery(resource, id) {
        if (arguments.length < 2) {
            return Promise.reject(new Error('id argument is required'));
        }
        let query = urlJoin(this.baseUrl, resource, id);
        return Promise.resolve(query);
    }

    schema(resource) {
        return this._end(urlJoin(this.baseUrl, resource, 'schema'));
    }

    _end(query) {
        return new Promise((resolve, reject) => {
            this.request
                .get(query, (err, res, body) => {
                    if (res.statusCode !== 200) {
                        let e = new Error(res.statusCode);
                        return reject(e);
                    }

                    if (err) {
                        return reject(err);
                    }

                    return resolve(JSON.parse(body));
                });
        });
    }
}

extend(Swapi.prototype, Swapi._listResources().reduce((obj, item) => {
    obj[item] = function (id) {
        return this.get(item, id);
    };
    return obj;
}, {}));

export default Swapi;

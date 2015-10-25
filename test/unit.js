import Swapi from '../lib';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import requestStub from './stubs/request';
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('swapi unit tests', function () {
    let s;

    beforeEach(() => {
        s = new Swapi(requestStub);
    });

    describe('constructor', () => {
        it('should have a baseUrl', () => {
            expect(s.baseUrl).to.be.a('string');
            expect(s.baseUrl).to.equal('http://swapi.co/api/');
        });
    });

    describe('_buildQuery', () => {
        it('should throw an error for too few arguments', () => {
            return expect(s._buildQuery('people'))
                .to.eventually.be.rejected;
        });

        it('should build a people query', () => {
            expect(s._buildQuery('people', 1))
                .to.eventually.equal('http://swapi.co/api/people/1');
        });
    });
    describe('_end', () => {
        it('should fail for malformed query', () => {
            s.query = 'ayyy.lmao';
            return expect(s._end()).to.eventually.be.rejected;
        });
    });
    describe('get', () => {
        it('should get resource by full url', () => {
            var uri = 'http://swapi.co/api/people/1';
            return expect(s.get(uri).get('name'))
                .to.eventually.equal('Luke Skywalker');
        });

        it('should reject for too few arguments', () => {
            return expect(s.get('people')).to.eventually.be.rejected;
        });

        it('should get several resources for id array', () => {
            let names = s.get('people', [1, 1, 1])
                .reduce((name, person) =>
                    name === person.name ? 'Luke Skywalker' : false, 'Luke Skywalker');


            expect(names).to.eventually.equal('Luke Skywalker');
        });
    });

    describe('people', () => {
        let res;
        before(() => res = s.people(1));
        it('should get people', () => {
            return expect(res).to.eventually.be.fulfilled;
        });

        it('should be an object', () => {
            return expect(res).to.eventually.be.an('object');
        });

        it('should have a name', () => {
            return expect(res).to.eventually.have.property('name');
        });

        it('should be \'Luke Skywalker\'', () => {
            return expect(res.get('name'))
                .to.eventually.equal('Luke Skywalker');
        });

        it('should fail to get nonexistent People', () => {
            return expect(s.people('Vegeta')).to.eventually.be.rejected;
        });

    });


    describe('films', () => {
        let film;
        before(() => film = s.films(1));
        it('should get films', () => {
            return expect(film).to.eventually.be.fulfilled;
        });

        it('should be an object', () => {
            return expect(film).to.eventually.be.an('object');
        });

        it('should have a title property', () => {
            return expect(film)
                .to.eventually.have.property('title');
        });

        it('should be \'A New Hope\'', () => {
            return expect(film.get('title'))
                .to.eventually.equal('A New Hope');
        });

        it('should fail to get nonexistent film', () => {
            return expect(s.films('The Tree of Might')).to.eventually.be.rejected;
        });
    });
    describe('starships', () => {
        let starship;
        before(() => starship = s.starships(9));
        it('should get the starships', () => {
            return expect(starship).to.eventually.be.fulfilled;
        });

        it('should be an object', () => {
            return expect(starship).to.eventually.be.an('object');
        });

        it('should have a name property', () => {
            return expect(starship).to.eventually.have.property('name');
        });

        it('should be \'Death Star\'', () => {
            return expect(starship.get('name'))
                .to.eventually.equal('Death Star');
        });

        it('should fail to get nonexistent starship', () => {
            return expect(s.starships('Outlaw Star')).to.eventually.be.rejected;
        });

    });
    describe('vehicles', () => {
        let vehicle;
        before(() => vehicle = s.vehicles(4));
        it('should get vehicle', () => {
            return expect(vehicle).to.eventually.be.fulfilled;
        });

        it('should be an object', () => {
            return expect(vehicle).to.eventually.be.an('object');
        });

        it('should have a name', () => {
            return expect(vehicle).to.eventually.have.property('name');
        });

        it('should be \'Sand Crawler\'', () => {
            return expect(vehicle.get('name'))
                .to.eventually.equal('Sand Crawler');
        });

        it('should fail to get nonexistent type', () => {
            return expect(s.vehicles('Flying Nimbus')).to.eventually.be.rejected;
        });
    });
    describe('species', () => {
        let species;
        before(() => species = s.species(3));
        it('should get moves', () => {
            return expect(species).to.eventually.be.fulfilled;
        });

        it('should be an object', () => {
            return expect(species).to.eventually.be.an('object');
        });

        it('should have a name', () => {
            return expect(species).to.eventually.have.property('name');
        });

        it('should be \'Wookiee\'', () => {
            return expect(species.get('name'))
                .to.eventually.equal('Wookiee');
        });

        it('should fail to get nonexistent species', () => {
            return expect(s.species('Saiyan')).to.eventually.be.rejected;
        });
    });
    describe('planets', () => {
        let planet;
        before(() => planet = s.planets(1));
        it('should get abilities', () => {
            return expect(planet).to.eventually.be.fulfilled;
        });

        it('should be an object', () => {
            return expect(planet).to.eventually.be.an('object');
        });

        it('should have a name', () => {
            return expect(planet).to.eventually.have.property('name');
        });

        it('should be \'Tatooine\'', () => {
            return expect(planet.get('name'))
                .to.eventually.equal('Tatooine');
        });

        it('should fail to get nonexistent planets', () => {
            return expect(s.planets('Namek'))
                .to.eventually.be.rejected;
        });
    });
});

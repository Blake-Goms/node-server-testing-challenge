const request = require('supertest')
const db = require('../data/dbConfig.js');
const server = require('./server')


describe('server', () => {
    // cross-env DB_ENV=testing
    it('tests are running with DB_ENV set as "testing"', () => {
        expect(process.env.DB_ENV).toBe('testing');
    }) 
    
    describe('GET /', () => {
        it('returns 200 OK', () => {
            //make a GET request to / on our server
            return request(server)
                .get('/')
                .then(res => {
                    // check that the status code is 200
                    expect(res.status).toBe(200);
                })
        })
        //it.only  only runs this test
        //it.skip skips that test
        it('return JSON', () => {
            return request(server)
                .get('/')
                .then(res => {
                    // matching on regular expressions
                    expect(res.type).toMatch(/json/);
                })
        })
    })

    describe('GET /hobbits', () => {
        it('should return an array', () => {
            return request(server)
                .get('/hobbits')
                .then(res => {
                    //matching on regular expression
                    //expect(res.body.length).toBe(4);
                    expect(Array.isArray(res.body)).toBe(true);
                })
        })
    })

    describe('POST /hobbits', () => {
        beforeEach(async() => {
            await db('hobbits').truncate(); 
            // guarantees that the table is clear before any tests run
        })
        it('should insert a hobbit into a db', () => {
            //insert one
            return request(server)
            .post('/hobbits')
            .send({
                name:'gaffer'
            })
            .then(res => {
                //check how many are on the db again
                expect(res.body.length).toBe(1)
                })
        })
        it('should insert more than one hobbit' ,async() => {
            await request(server).post('/hobbits')
            .send([
                {
                    name:'sam',
                },
                {
                    name: 'rose'
                },
                {
                    name: 'frodo'
                }
            ])
            //check that there are two records in table
            const hobbits = await db('hobbits');
            //expect(hobbits.length).toBe(3);
            expect(hobbits).toHaveLength(3);
        })

        
    })

    // describe('PUT /:id', () => {
    //     it('should update a name', async() => {
            
    //         await request(server).put(`${1}`)
    //         .send([
    //             {
    //                 name: 'aragorn'
    //             }
    //         ])
    //         const updatedChar = await db('hobbits');
    //         expect(res.status).toBe(200);
    //     })
    // })
})
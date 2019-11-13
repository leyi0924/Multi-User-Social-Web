/*
 * Test suite for articles
 */
const fetch = require('isomorphic-fetch');

const url = path => `https://protected-earth-75479.herokuapp.com${path}`

describe('Validate Profile functionality', () => {

	it('GET /headlines return array with 1 element containing headline for logged in user', (done) => {
		myHeader = new Headers();
		myHeader.append('Content-Type','application/json')
		fetch(url('/login'),{
			method:"POST",
			headers: myHeader,
			body: JSON.stringify({
				username: "Lucy",
				password: "888888"
			}),
			credentials: "include"
		}).then(r=>{
			const cookie = r.headers._headers['set-cookie']
			myHeader.append('cookie',cookie)
			fetch(url('/headlines/Lucy'), {
				method: "GET",
				headers: myHeader,
				credentials: "include"
			}).then(r=>r.json()).then(r=>{
				expect(r.headlines.length).toBe(1);
				expect(r.headlines[0].username).toBe('Lucy');
				expect(r.headlines[0].headline).toBe('Today it\'s foggy!');
				fetch(url('/logout'), {
					method: "PUT",
					headers: myHeader,
					credentials: "include"
				}).then(r=>{
					done()
				})

			})
		})
	});

	it('PUT /headline update logged in user headline', (done) => {
		myHeader = new Headers();
		myHeader.append('Content-Type','application/json')
		fetch(url('/login'),{
			method:"POST",
			headers: myHeader,
			body: JSON.stringify({
				username: "John",
				password: "123456"
			}),
			credentials: "include"
		}).then(r=>{
			const cookie = r.headers._headers['set-cookie']
			myHeader.append('cookie',cookie)
			fetch(url('/headline'), {
				method: "PUT",
				headers: myHeader,
				body: JSON.stringify({
					headline: 'This is a new headline'
				}),
				credentials: "include"
			}).then(r=>r.json()).then(r=>{
				expect(r.username).toBe('John');
				expect(r.headline).toBe('This is a new headline');
				fetch(url('/logout'), {
					method: "PUT",
					headers: myHeader,
					credentials: "include"
				}).then(r=>{
					done()
				})

			})
		})
	});

});

/*
 * Test suite for articles
 */
const fetch = require('isomorphic-fetch');

const url = path => `https://protected-earth-75479.herokuapp.com${path}`


describe('Validate Auth functionality', () => {


	it('POST /login log in user', (done) => {
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
		}).then(r=>r.json()).then(r=>{
				expect(r.result).toBe('success')
				done()
		})
	});


	it('PUT /logout log out current logged in user', (done) => {
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
			fetch(url('/logout'), {
				method: "PUT",
				headers: myHeader,
				credentials: "include"
			}).then(r=>r.json()).then(r=>{
				expect(r.status).toBe('OK')
				done()
			})
		})

 	});

	it('POST /register register new user', (done) => {
		myHeader = new Headers();
		myHeader.append('Content-Type','application/json')
		fetch(url('/register'),{
			method:"POST",
			headers: myHeader,
			body: JSON.stringify({
				username:'Dan', email:"d@rice.edu", dob:'02/09/1995', zipcode:'77005', password:'123'
			}),
			credentials: "include"
		}).then(r=>r.json()).then(r=>{
			expect(r.result).toBe('success');
			expect(r.username).toBe('Dan');
			done()
		})
	});


});

/*
 * Test suite for articles
 */
const fetch = require('isomorphic-fetch');

const url = path => `https://protected-earth-75479.herokuapp.com${path}`

const Article = require('../src/model.js').Article


describe('Validate Article functionality', () => {

		it('GET /articles (should return at least 5 articles if test user is logged in user)', (done) => {
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
				fetch(url('/articles'), {
					method: "GET",
					headers: myHeader,
					credentials: "include"
				}).then(r=>r.json()).then(r=>{
					expect(r.articles.length).toBeGreaterThan(4);
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

	it('GET /articles/id (where id is a valid or invalid article id)', (done) => {
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
			fetch(url('/articles/1'), {
				method: "GET",
				headers: myHeader,
				credentials: "include"
			}).then(r=>r.json()).then(r=>{
				expect(r.articles.length).toBe(1);
				expect(r.articles[0]._id).toBe(1);
				fetch(url('/articles/20'), {
					method: "GET",
					headers: myHeader,
					credentials: "include"
				}).then(r=>r.json()).then(r=>{
					expect(r.articles.length).toBe(0);
					fetch(url('/logout'), {
						method: "PUT",
						headers: myHeader,
						credentials: "include"
					}).then(r=>{
						done()
					})
				})

			})
		})
	});


	it('POST /article (adding an article for logged in user returns list of articles with new article, validate list increased by one and contents of the new article)', (done) => {
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
			Article.find().exec(function(err, items) {
				let originArticleNum=0
				items.forEach(function(a) {
					originArticleNum += 1
				})
				fetch(url('/article'), {
					method: "POST",
					headers: myHeader,
					body: JSON.stringify({
						text: "This is a new article."
					}),
					credentials: "include"
				}).then(r=>r.json()).then(r=>{
					expect(r.articles.length).toBe(originArticleNum+1);
					let newArticle = r.articles.filter(x=>x.text === "This is a new article.")
					expect(newArticle.length).toBeGreaterThan(0)
					fetch(url('/logout'), {
						method: "PUT",
						headers: myHeader,
						credentials: "include"
					}).then(r=>{
						done()
					})

				})
			})

		})
	});

});

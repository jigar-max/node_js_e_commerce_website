const express = require('express');

const mysql = require('mysql');

const body_parser = require('body-parser');

const session = require('express-session');

const app = express();

//Make MySQL Database Connection
const connection = mysql.createConnection({
	host : 'localhost',
	database : 'testing',
	user : 'root',
	password : ''
});

//Check MySQL Database Connection
connection.connect((error) => {
	console.log('MySQL Database is connected Successfully');
});

//Set up Session Middleware
app.use(session({
	secret : '1234567890abcdefghijklmnopqrstuvwxyz',
	resave : false,
	saveUninitialized : true,
	cookie : { secure : false }
}));

//Create Route for Load Product Data
app.get("/", (request, response) => {

	const query = `SELECT * FROM product LIMIT 3`;

	//Execute Query
	connection.query(query, (error, result) => {

		// if(!request.session.cart)
		// {
		// 	request.session.cart = [];
		// }

		response.render('product', { products : result, cart : request.session.cart });

	});

});


app.listen(3000, () => {

	console.log('Server has started on port number 3000');

});

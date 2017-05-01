//requirers to run the program
var inquirer = require('inquirer');
var mysql =  require('mysql');

//connecting to the database
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Learning1',
  database : 'bamazon'
});
  
connection.connect();
 
//checking and displaying all of the inventory in the bamazon->products 
function inventory(){  
	connection.query('SELECT * FROM products', function (error, results, fields) {
  		if (error) throw error;
  		for (i = 0; i <results.length; i++) {
  			console.log("\n\nID# " + results[i].item_id + " \nProduct: " +results[i].product_name + " || Dept: " 
  			+ results[i].department_name + " \nPrice: $" +  results[i].price + "\n");
  			}
	});
}

//starts the inventory function and the inquirer prompt
function search() {
	inventory();
	inquirer.prompt ([{
		type: "input",
		message: "Which ID# are you interested in?",
		name: "order"
	},
	{
		type: "input",
		message: "How Many?",
		name: "amount"
	}])
	.then (function(answer) {
//switch-cases for each of the 10 items	
	var amount = answer.amount;	
	switch (answer.order) {
		case "1":
		checkOut(1, amount);
		break;

		case "2":
		checkOut(2, amount);
		break;

		case "3":
		checkOut(3, amount);
		break;

		case "4":
		checkOut(4, amount);
		break;
		
		case "5":
		checkOut(5, amount);
		break;

		case "6":
		checkOut(6, amount);
		break;

		case "7":
		checkOut(7, amount);
		break;

		case "8":
		checkOut(8, amount);
		break;
		   
		case "9":
		checkOut(9, amount);
		break;

		case "10":
		checkOut(10, amount);
		break;
	}
	// incase they put anything other than 1-10
	if (answer.order === undefined || answer.order > 10 || answer.order <= 0) {
		console.log("Wrong Input, Try agian?");
		shopAgain();	
	}
	});
}

//updates the inventory and gives the total price and item description
function checkOut(answer, amount) {
	connection.query('SELECT * FROM products', function (error, results, fields) {
        	connection.query('UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?', [amount, answer], function(error, results) { 
        		if (results[answer].stock_quantity < 0) {
				    console.log("Sorry, Insufficent Stock");
					connection.query('UPDATE products SET stock_quantity = 0 WHERE item_id = ?', [answer], function (error, results, fields) {
	            	shopAgain(); 
	            	});
        		}
			});
	});		
}		
//prompt to see if the user wants to check the inventory again
function shopAgain() {
	inquirer.prompt ({
		type: "list",
		message: "Would you like to continue shopping?",
		choices: ["yes", "no"],
		name: "again"
	})
	.then (function(answer) {

	switch (answer.again) {
		case "yes":
		search()
		break;

		case "no":
		connection.end();
		break; 
	}
	});
}

//runs the display of inventory and the initial query
search();
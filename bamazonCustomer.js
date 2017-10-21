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
	//making a query request for ALL ITEMS (*) <---, from the table products, 
	//becase we are already using the database bamazon above
	connection.query('SELECT * FROM products', function (error, results, fields) {
  		if (error) throw error;
  		//looping through each of the results(which can be named anything ex. data and displaying it in node
  		for (i = 0; i <results.length; i++) {
  			console.log("\n\nID# " + results[i].item_id + " \nProduct: " +results[i].product_name + " || Dept: " 
  			+ results[i].department_name + " \nPrice: $" +  results[i].price + "\n" + 'Stock Quantity Remaining: ' + results[i].stock_quantity + '\n');
  			}
  		search(results);	
	});
}

// this runs when inventory() is finished and results parameter from inventory is passed in
function search(results) {
	inquirer.prompt ([{
		//type input is default
		type: "input",
		//this is the question that is asked to the user
		message: "Which ID# are you interested in? Or type finished to exit",
		//stores the answer in the answer hash
		name: "order"

	}]).then (function(orderId) {
		//REMEMBER THESE orderId.order ARE STRINGS, SO '2' > 10 IS FALSE, SO NO ERROR
		if (orderId.order === 'finished') {
			connection.end();
		} else if (orderId.order === undefined || orderId.order > 10 || orderId.order <= 0 || isNaN(orderId.order) ) {
			console.log("Sorry, there was a problem with one of the numbers inputted, please checkout again");
			shopAgain();
			return;
		}  else {	
			inquirer.prompt ([{
				type: "input",
				message: "How Many?",
				name: "amount"

		}]).then (function(answer) {
			//both working, able to pass orderId.order parameter into this .then function
			// console.log(orderId.order,  answer.amount);
			var currentInventory = results[orderId.order -1].stock_quantity;
			var productName = results[orderId.order -1].product_name;
			var updatedInventory = currentInventory - answer.amount;

			if (updatedInventory <= 0) {
				console.log('THERE WAS NOT ENOUGH OF ' + productName + '\nTHERE WAS ONLY ' + currentInventory + ' IN STOCK, PLEASE SEARCH AGAIN' );
				inventory();
			} else {
				//HAS TO BE A ENTIRE STRING TO WORK
			//so UPDATE products table AND set stock_quantity= {updatedInventory} WHERE product_name= {productName}
			connection.query("UPDATE products SET stock_quantity=" + "'" + updatedInventory + "'" + "WHERE product_name=" + "'" + productName + "'",
            function(err, res2) {
               if (err) {
                  throw err;
               }
               console.log(productName + " PURCHASED, stock quantity UPDATED TO:" + updatedInventory);
					inventory();
				})
			}		
		//2nd then promise
		})
		//else statement	
		}
	//1st then promise	
	})
//end of the search function	
};


//prompt to see if the user wants to check the inventory again
//THERE IS A BUG WITH VERSION OF NODE THAT ARROW KEYS WILL NOT WORK, AS OF 10/20/2017
function shopAgain() {
	inquirer.prompt ({
		type: "list",
		message: "Would you like to continue shopping?",
		choices: ["yes", "no"],
		name: "again"
	
	}).then (function(name) {

	switch (name.again) {
		case "yes":
		search()
		break;

		case "no":
		connection.end();
		break; 
	}
	});
};

//runs the display of inventory and the initial query
inventory();
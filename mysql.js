//this is the dummy data that will create, use, and insert 10 different items with multiple different columns
//you can add this file in sql workbench instead of manually inputting the info
create database bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10, 2) NOT NULL,
	stock_quantity INTEGER(100) NOT NULL
);


USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Cards against Humanity', 'games', 24.99, 99),
('Apple 7 iPhone', 'electronics', 699.99, 99),
('Apple Airbook', 'electronics', 999.99, 99),
('Xbox One', 'games', 299.99, 99),
('PS4', 'games', 299.99, 99),
('Socks', 'clothes', 6.99, 99),
('Bananas', 'grocery', .59, 1),
('Mass Effect 4', 'games', 59.99, 99),
('Yeezys Men 10.5', 'clothes', 199.99, 0),
('Dez Nuts', 'gottem', .99, 2)
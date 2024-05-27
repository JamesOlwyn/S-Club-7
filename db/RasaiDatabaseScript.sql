CREATE DATABASE rasaiDB /* Execute this separately first */

USE rasaiDB /* Execute this separately second */

/* After the above steps, execute the rest of the script all together */

CREATE TABLE Customer(
	CustID int identity(1,1) PRIMARY KEY,
	Username varchar(20) NOT NULL,
	Userpass varchar(20) NOT NULL,
	FName varchar(20) NOT NULL,
	LName varchar(20) NOT NULL,
	Phone varchar(15) NOT NULL,
	Email varchar(30) NOT NULL
)

CREATE TABLE Orders(
	OrderID int identity(1,1) PRIMARY KEY,
	CustID int FOREIGN KEY REFERENCES Customer(CustID),
	OrderDate date NOT NULL,
	OrderAddress varchar(50) NOT NULL,
	AdultGuests int NOT NULL,
	ChildGuests int NOT NULL
)

CREATE TABLE Menu(
	MenuID int identity(1,1) PRIMARY KEY,
	MenuName varchar(50) NOT NULL,
	MenuDesc varchar(750) NOT NULL,
	MenuPrice decimal(3,2) NOT NULL
)

CREATE TABLE OrderItems(
	OrderID int FOREIGN KEY REFERENCES Orders(OrderID),
	CustID int FOREIGN KEY REFERENCES Customer(CustID),
	Quantity int NOT NULL,
	PRIMARY KEY (OrderID, CustID)
)

CREATE TABLE Inquiries(
	InqID int identity(1,1) PRIMARY KEY,
	FName varchar(20) NOT NULL,
	LName varchar(20) NOT NULL,
	Email varchar(30) NOT NULL,
	Phone varchar(15) NOT NULL,
	AdultGuests int NOT NULL,
	ChildGuests int NOT NULL,
	EventAddress varchar(50),
)
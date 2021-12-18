DROP DATABASE IF EXISTS Vet_Application;
CREATE DATABASE Vet_Application; 
USE Vet_Application;


DROP TABLE IF EXISTS USER;
CREATE TABLE USER (
	UserId					integer, -- not null,
    FName					varchar(25),--  not null,
    LName					varchar(25),--  not null,
    Email					varchar(200),--  not null,
    Role					varchar(50),--  not null,
    Password				varchar(30),--  not null,
    Blocked					varchar(10),
    
    primary key (UserId)
);

INSERT INTO USER (UserId,FName,LName,Email,Role, password,blocked)
VALUES
('1','Ali','Zirahi','ali.zirahi@gmail.com','Admin', "111", "No"),
('2','Amir','Abbaspour','amir@gmail.com','Admin', "222", "No"),
('3','Cameron','Pepper','cameron@gmail.com','Instructor', "333", "No"),
('4','Jeff','Smith','js@gmail.com','Health Technician', "444", "No"),
('5','Mike','Jones','mj@gmail.com','Care Attendant', "555", "No"),
('6','Majid','Bahrevar','majid@gmail.com','Student', "666", "No");

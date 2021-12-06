DROP DATABASE IF EXISTS Vet_Application;
CREATE DATABASE Vet_Application; 
USE Vet_Application;

DROP TABLE IF EXISTS ANIMAL;
CREATE TABLE ANIMAL (
	AnimalId				integer, -- not null,
	Name					varchar(25), -- not null,
	Species					varchar(25), -- not null,
    Sex						char(1), -- not null,
    Breed					varchar(25), -- not null,
    Age						integer, -- not null,
    RFID					varchar(25), -- not null,
    Altered					varchar(25), -- not null,
    Weight					integer, -- not null,
    Special_Problem			varchar(200),
    Continuous_Medication	varchar(100),
    Special_Instructions	varchar(200),
    Special_Diet			varchar(200),
    Tatoo					varchar(100), -- not null,
    Color					varchar(25), -- not null,
    Status					varchar(50), -- not null,
    
    Booked_Id				integer,
    
	primary key (AnimalId)
);
INSERT INTO ANIMAL (AnimalId, Name,Species, Sex, Breed, Age, RFID, Altered, Weight,Special_Problem,
    Continuous_Medication,Special_Instructions,Special_Diet,Tatoo,Color, Status)
VALUES
('20','Rudy','Persian','M','Mongola','2','12343ER','Yes','10',null, null,null,null,'WAS12','Black','Healthy');

DROP TABLE IF EXISTS USER;
CREATE TABLE USER (
	id						integer AUTO_INCREMENT NOT NULL,
	UserId					integer, -- not null,
    FName					varchar(25),--  not null,
    LName					varchar(25),--  not null,
    Email					varchar(200),--  not null,
    Role					varchar(50),--  not null,
    Password				varchar(30),--  not null,
    
    primary key (id)
);

INSERT INTO USER (UserId,FName,LName,Email,Role, password)
VALUES
('1','Ali','Zirahi','ali.zirahi@gmail.com','Admin', "123"),
('2','Amir','Abbaspour','amir@gmail.com','Admin', "321"),
('3','Cameron','Pepper','cameron@gmail.com','Instructor', "456"),
('4','Jeff','Smith','js@gmail.com','Technician', "654");

DROP TABLE IF EXISTS COMMENT;
CREATE TABLE COMMENT (
	CmntId					integer,--  not null,
    Date					varchar(50),
    UserId					integer,--  not null,
    AnimalId				integer,-- not null,
    Note					varchar(2000),--  not null,
    
    primary key (AnimalId,CmntId)
    -- foreign key (AnimalId) references ANIMAL(AnimalId),
    -- foreign key (UserId) references USER(UserId)
);

INSERT INTO COMMENT (CmntId,Date,UserId,AnimalId,Note)
VALUES
('1','2021-04-20','1','20','The animal is not well');


DROP TABLE IF EXISTS ONGOING_CARE;
CREATE TABLE ONGOING_CARE (
	CareId					integer,--  not null,
	UserId					integer,--  not null,
    AnimalId				integer,--  not null,
    Date					Date,--  not null,
    ProcessDescription		varchar(300),--  not null,
    Weight					integer,
    Drug					varchar(1000),--  not null,
    NextDue					Date,
    Note					varchar(2000),--  not null,
    
    primary key (AnimalId,CareId)
--     foreign key (AnimalId) references ANIMAL(AnimalId),
--     foreign key (UserId) references USER(UserId)
);

DROP TABLE IF EXISTS ANIMAL_STATUS;
CREATE TABLE ANIMAL_STATUS (
	StatusId				integer,--  not null,
	CareAttId				integer,--  not null,
    AnimalId				integer,--  not null,
    Date					Date,--  not null,
    ProcessDescription		varchar(300),--  not null,
    Temperature				integer,
    Weight					integer,
    HeartRate				integer,
    Symptoms				varchar(1000),--  not null,
    DiagnoseDrug			varchar(1000),--  not null,
    VetId					integer,--  not null,
    
    primary key (AnimalId,StatusId)
--     foreign key (AnimalId) references ANIMAL(AnimalId),
--     foreign key (CareAttId) references USER(UserId),
--     foreign key (VetId) references USER(UserId)    
);
CREATE TABLE users (
id INT(60) NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL,
username VARCHAR(30) NOT NULL,
password TEXT NOT NULL
email VARCHAR(500),
admin VARCHAR(1) NOT NULL DEFAULT '0'
reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)


CREATE TABLE filters (
id INT(60) NOT NULL AUTO_INCREMENT PRIMARY KEY,
type VARCHAR(30) NOT NULL,
name TEXT NOT NULL,
)


CREATE TABLE activities (
id INT(60) NOT NULL AUTO_INCREMENT PRIMARY KEY,
filter VARCHAR(60) NOT NULL,
name TEXT NOT NULL,
description TEXT NOT NULL,
map TEXT NOT NULL,
location TEXT NOT NULL,
local TEXT NOT NULL,
image TEXT NOT NULL
)




CREATE TABLE locations (
id INT(60) NOT NULL AUTO_INCREMENT PRIMARY KEY,
name TEXT NOT NULL,
description TEXT NOT NULL,
map TEXT NOT NULL,
location TEXT NOT NULL,
local TEXT NOT NULL,
image TEXT NOT NULL,
stars FLOAT(100) NOT NULL DEFUALT 1,
activities TEXT NOT NULL,
durations TEXT NOT NULL
)
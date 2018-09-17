
# Installation

### Method #1 - Using Docker

#### Requirements
* Have Docker installed
* Angular CLI: 6+
* Node: 8+
* Configure /server variables file .env

##### Variables

* **INIT_DATA**: Number

  1 -->  Drop all data and initialize.

  0 -->  Keep data, do not initialize. 

* **MONGO_URI**: String

  Set **mongodb://mongo:27017/project** for docker configuration

* **HN_INTERVAL**: Number
  
  Posts request interval in millisecs
  
#### Run server
```
1. cd server
2. docker-compose build
3. docker-compose up
```


> Can test api url 
> http://localhost:3000/api/post

#### Run web page
```
1. cd angularApp
2. npm install
3. ng serve --open
```

### Method #2 

#### Requirements
* Have MongoDB installed
* Angular CLI: 6+
* Node: 8+
* Have gulp cli installed
* Configure /server variables file .env

##### Variables

* **INIT_DATA**: Number

  1 -->  Drop all data and initialize.

  0 -->  Keep data, do not initialize. 

* **MONGO_URI**: String

  Set **mongodb://localhost:27017/project** for local configuration and standard port

* **HN_INTERVAL**: Number
  
  Posts request interval in millisecs
  
  #### Run server
  > Must have a running mongodb instance
  
  Run following commands on terminal
  ```
  1. cd server
  2. npm install
  3. npm start
  ```
  
  #### Run web page
  ```
  1. cd angularApp
  2. npm install
  3. ng serve --open
  ```
  
#### Important
>  if node(server) port is changed, go to angularApp/src/app/app.services.ts and change line 26 with new port

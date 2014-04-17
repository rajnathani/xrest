xrest
=====

![Imgur](http://i.imgur.com/xfn9rwt.png)

file based routing built over express

## File based routing ?

With xRest, each file is treated as a route.


### Conventional routing:

**app.js**
    
    var express = require('express');
    var app = express();
    
    app.get('/schools/', function(req, res) {
      return res.render("schools.jade");
    })
    
    app.post('/school/:school_id', function(req, res) {
      return res.send(200);
    })
    
   
  
### xRest routing:
  
**app.js**

    var express = require('express');
    var app = express()
    
    require('xrest')(app);
    

**route/GET/school.js**

    exports.x = function(req, res) {
      return res.render("schools.jade");
    }
    

**route/POST/school/\_school_id\_.js**

    exports.x = function(req, res) {
      return res.send(200);
    }


## Parse Rules

Given a directory:

    | app.js
    | -- route
    |    | -- GET
    |    |    | -- index.js
    |    | -- POST
    |    |    | -- school
    |    |    |    | -- _id_.js
    |    | -- PATCH
    |    |    | -- school
    |    |    |    | -- _id_.js
    |    |    |    | -- __helper.js
    
(1) index.js -> '/'  
    therefore in the above directory, the index.js route will resolve to `GET /`
    
(2) params -> _<param>_  
    therefore in the above directory, POST/school/_id_.js will resolve to `POST /school/:id`  
    (regular expressions in params are not permitted)
    
(3) helpers -> non js / non directory / \_\_\<name>    
    js files and directories create the route tree, any other file will be ignored. To make the parser ignore any other helper js files or directories, prepend its name with two underscores '__'.  
    therefore in the above directory, PATCH/school/__helper.js will be *ignored*



## Installation

(1) download:

    npm install xrest --save
    
(2) enable:
    
    var express = require('express');
    var app = express();
    
    require('xrest')(app);


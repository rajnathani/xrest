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




## Installation

(1) download:

    npm install xrest --save
    
(2) enable:
    
    var express = require('express');
    var app = express();
    
    require('xrest')(app);


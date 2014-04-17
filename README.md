xrest
=====

[Imgur](http://i.imgur.com/xfn9rwt.png)

file based routing built over express

## Meaning of file based routing

### Conventional routing:

**app.js**
    
    var express = require('express');
    var app = express();
    
    app.get('/schools/', function(req, res) {
      return res.render("schools.jade");
    })
    
    app.get('/school/professor', function(req, res) {
      return res.send("professor");
    });
    
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
    
**route/GET/school/professor.js**

    exports.x = function(req, res) {
      return res.send("professor");
    }

**route/POST/school/_school_id_.js**

    exports.x = function(req, res) {
      return res.send(200);
    }




## Installation

(1) download:

    npm install xrest
    
(2) enable:
    
    var express = require('express');
    var app = express();
    
    require('xrest')(app);


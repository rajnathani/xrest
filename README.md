xrest
=====

![Imgur](http://i.imgur.com/xfn9rwt.png)

file based routing built over express

# Installation

(1) download:

    npm install xrest --save
    
(2) enable:
    
    var express = require('express');
    var app = express();
    
    require('xrest')(app);
    
# File based routing ?

With xrest, each file is treated as a route.


## Conventional routing:

**app.js**
    
    var express = require('express');
    var app = express();
    
    app.get('/schools/', function(req, res) {
      return res.render("schools.jade");
    })
    
    app.post('/school/:school_id', function(req, res) {
      return res.send(200);
    })
    
   
  
## xrest routing:
  
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


# Parse Rules

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



# License

The MIT License (MIT)

Copyright (c) 2014 Relfor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

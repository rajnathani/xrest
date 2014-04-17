var fs = require('fs');
var path = require('path');
var util = require('util');
var colors = require('colors');

var reg_helper = /^__[^]*.js$/;
var reg_js = /([^]*).js$/;
var reg_path_js = /^(_)?([^]*)(_)?.js$/;



function multics(app) {
  var root_path = path.dirname(require.main.filename) + '/route';
  var verbs = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
  console.log('');
  verbs.forEach(function (verb) {
    try {
      var all_of_verb = walk(root_path + '/' + verb, []);    
      all_of_verb.forEach(function (route_and_func) {
        var cut_path = removeTrailingSlash(cutPath(route_and_func[0], verb));
        cut_path = cut_path === '' ? '/' : cut_path;
        console.log('    ' + verb.green + generateSpaces(8-verb.length) + cut_path)
        app[verb.toLowerCase()](cut_path, route_and_func[1])
      })
    } catch (err) {
      console.log("Error in compiling routes: " + err);
    }
  });
  console.log('');
};


/*
 * Generate `n` spaces
 */
function generateSpaces(n){
  s = "";
  for(var i=0;i<n;i++){
    s += " "
  }
  return s;
}
/**
 * Given an absolute path of a file, eg: /Users/relfor/blah/hello/
 * Return an object of {
 *   base:< everything excluding the final token with a trailing slash, eg: /Users/relfor/blah/ >
 *   title:< the remaining without any trailing slash, eg: hello >
 * }
 */
function extractFileName(v) {
  if (v[v.length - 1] === '/') { //remove trailing slash
    v = v.substring(0, v.length - 1);
  }
  var rindex = v.lastIndexOf('/');
  return {base: singleTrailingSlash(v.substring(0, rindex + 1)), title: v.substring(rindex + 1)}
}


/**
 * Inputs the absolute path a of file. Cut out
 * the part till after the mention of the delimiter `delimiter`,
 * and return the remaining.
 * eg:
 * /Users/relfor/project/route/GET/foo/bar (delimiter: 'GET')
 * ->
 * /foo/bar
 */
function cutPath(v, delimiter) {
  return singleTrailingSlash(v.substring(v.lastIndexOf(delimiter) + delimiter.length))
};

/**
 * Given an absolute path `v`.
 * replace all the files and directories
 * of formation '_<name>_' to ':<
 */
function expressjsPath(v) {
 return v.replace(/_([^\/]*)_/g, ':$1');
}

/**
 * Given a path `v` ensure that the path trails
 * with a single slash
 * eg: /foo   -> /foo/ 
 * eg: /foo// -> /foo/
 * eg:        -> /
 */
function singleTrailingSlash(v) {
  var v= v.replace(/\/+$/, '/'); //reduces multiple trailing slashes to a single slash
  return v + (v[v.length-1] === '/' ? '' : '/'); //adds a trailing slash if it doesn't exist
}

/**
 * Given a path `v` remove the trailing slash if it exists
 * eg: /foo/  -> /foo
 */
function removeTrailingSlash(v){
  return v.replace(/\/+$/, '');
}

/**
 * Given a path, replace any terminal 'index' to ''
 * eg: 'foo/bar/index'  -> 'foo/bar/'
 * (with trailing slash apply the same behaviour)
 * eg: 'foo/bar/index/' -> 'foo/bar/'
 *
 */
function indexCheck(v){
  return v.replace(/index\/?$/, '')
}

function walk(fname, cumulation) {
  if (!fs.existsSync(fname)) {
    return []
  }
  if (!fs.lstatSync(fname).isDirectory()) {
    var extracted_file_name = extractFileName(fname);
    var reg_file_title_js = extracted_file_name.title.match(reg_js);

    if (!reg_file_title_js) {
      return []
    } else {      
      return [[expressjsPath(indexCheck(extracted_file_name.base + reg_file_title_js[1])),
        require(fname).x]];
    }
  }
 
  var files = fs.readdirSync(fname);
 
  files.forEach(function (file) {
    if (!file.match(reg_helper)) {
      cumulation = cumulation.concat(walk(fname + '/' + file, cumulation));
    }
  });
  return cumulation;
}


if (process.env.NODE_ENV === 'unittest') {
  exports.indexCheck = indexCheck;
  exports.singleTrailingSlash = singleTrailingSlash;
  exports.removeTrailingSlash = removeTrailingSlash;
  exports.expressjsPath = expressjsPath;
  exports.cutPath = cutPath;
  exports.extractFileName = extractFileName;
  exports.walk = walk;
} else {
  module.exports = multics;
}

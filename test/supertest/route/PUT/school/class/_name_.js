exports.x  = function(req,res){
  res.send("new class " + req.params.name + " posted");
}
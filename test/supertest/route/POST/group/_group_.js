exports.x  = function(req,res){
  res.send("you have posted to group " + req.params.group);
}
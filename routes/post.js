var db = require("../models");

exports.findOne = function(req, res){
	db.post.findAll({where : ["id = ?", req.params.id]}).success(function(posts) {
		res.json(posts);
	});
};

exports.findAll = function(req, res){
	db.post.findAll({order: "id DESC"}).success(function(posts) {
		res.json(posts);
	});
}

exports.create = function(req, res){
  db.post.create(req.body).complete(function(err, post) {
    res.json(post);
  });
};

exports.update = function(req, res){
  db.post.find(req.params.id).success(function(post) {
    post.updateAttributes(req.body).success(function(post) {
      res.json(post);
    })
  });
};

exports.destroy = function(req, res){
  db.post.find(req.params.id).success(function(post) {
    post.destroy().success(function() {
      res.status(200);
      res.end()
    })
  });
};
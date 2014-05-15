module.exports = function(sequelize, DataTypes) {
	var Post = sequelize.define("post", {
		title 	: DataTypes.STRING,
		content : DataTypes.TEXT
	}, {
		underscored: true
	})
	return Post
}
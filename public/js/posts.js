Post = Backbone.Model.extend({
	urlRoot: "/posts"
});

PostCollection = Backbone.Collection.extend({
	model: Post,
	url: "/posts",
});

var posts = new PostCollection();

PostRouter = Backbone.Router.extend({
	routes: {
		"posts"				: "posts",
		"posts/new" 		: "newPost",
		"posts/:id"			: "getPost",
		"posts/edit/:id" 	: "editPost", 
		"posts/remove/:id"	: "deletePost"
	},
	posts : function() {
		posts.fetch({
			success: function() {
				var postsView = new PostsView({
					el : "#container",
					collection: posts
				}).render();
			}
		});
	},
	newPost: function() {
		var createView = new PostCreateView({
			el : "#container",
			collection: posts
		}).render();
	},
	getPost: function(pId) {
		var post = new Post({id: pId});

		post.fetch({
			success: function() {
				var postView = new PostView({
					el : "#container",
					model: post
				}).render();
			}
		});
	},
	editPost: function(pId) {
		var post = new Post({id: pId});

		post.fetch({
			success: function() {
				var editView = new EditView({
					el : "#container",
					model: post
				}).render();
			}
		});
	},
	deletePost: function(pId) {
		var post = new Post({id: pId});

		post.fetch({
			success: function() {
				post.destroy();
				postRoutes.navigate("posts", {trigger: true});
			}
		});
	}
});

// View for showing post create form
PostCreateView = Backbone.View.extend({
	initialize: function() {
		this.collection.bind("add remove change", _.bind(this.render, this))
	},
	template: Handlebars.compile($("#post-create-template").html()),
	events: {
		"submit form" 			: "addPost",
	},
	addPost: function(e) {
		e.preventDefault();
		var form = $(e.target);
		if(form.find("#title").val() != "" && form.find("#content").val() != "")
		{
			this.collection.create({
				title: form.find("#title").val(),
				content: form.find("#content").val()
			});
			form[0].reset();
			form.find(".error").html("");

			postRoutes.navigate("posts", {trigger: true});
		}
		else
		{
			form.find(".error").html("All fields are required to fill!");
		}
	},
	render: function() {
		this.$el.empty();
		var html = this.template();

		this.$el.html(html);
	}
});
// View for showing all posts
PostsView = Backbone.View.extend({
	initialize: function() {
		this.collection.bind("add remove change", _.bind(this.render, this))
	},
	template: Handlebars.compile($("#posts-template").html()),
	render: function() {
		this.$el.empty();
		var html = this.template({
			posts: 	this.collection.toJSON()
		});

		this.$el.html(html);
	}
});
// View for showing one post
PostView = Backbone.View.extend({
	initialize: function() {
		this.model.bind("add remove change", _.bind(this.render, this))
	},
	template: Handlebars.compile($("#post-template").html()),
	events: {
		"click #remove" : "removePost"
	},
	render: function() {
		this.$el.empty();
		var html = this.template(this.model.toJSON());

		this.$el.html(html);
	}
});

//View for editing a post
EditView = Backbone.View.extend({
	template: Handlebars.compile($("#edit-template").html()),
	events: {
		"submit form" : "editPost"
	},
	editPost: function(e) {
		e.preventDefault();
		var post = this.model;
		var form = $(e.target);
		if(form.find("#title").val() != "" && form.find("#content").val() != "")
		{
		post.set({
			title: form.find("#title").val(), 
			content: form.find("#content").val()
		});
		post.save();
		form[0].reset();
		form.find(".error").html("");
		postRoutes.navigate("posts", {trigger: true});
		}
		else
		{
			form.find(".error").html("All fields are required to fill!");
		}
	},
	render: function() {
		this.$el.empty();
		var html = this.template(this.model.toJSON());

		this.$el.html(html);
	}
});

var postRoutes = new PostRouter();
Backbone.history.start();
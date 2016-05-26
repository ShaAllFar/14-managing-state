(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //this method parameters take a content, and a callback function.
  articlesController.loadById = function(ctx, next) {
    //a variable set to a function that sets the context data based on the argument inputed(article)
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };
    //the findWhere method takes three parameters, field,value,and callback. In this call the field is 'id', value will what we get back through the findWhere() query, and we pass articleData to set the ctx values. this is ran when page('/article:id')
    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // this function does the same thing as the loadByID method but the difference is that this one goes by author and not id.
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
    //the author name we get back is going to have a space inbetween the first and last name. so, we use the replace method to change the space between to a plus sign so it doesnt break the link.
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //this method has the same functionality as the first two but instead we are targeting the category and not the author name or ID.
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articlesController.loadAll = function(ctx, next) {
    //defines the function that will set the ctx.articles with the information grabbed from the database in the fetchAll() method.
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };
    //checks to make sure data is loaded. if yes, calls next callback, if no, goes and fetches data
    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };
  module.articlesController = articlesController;
})(window);

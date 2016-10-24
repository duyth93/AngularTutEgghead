angular.module('categories.bookmarks', [
  'categories.bookmarks.edit',
  'categories.bookmarks.create',
  'eggly.models.categories',
  'eggly.models.bookmarks'
])
.config(function($stateProvider){
  $stateProvider.state('eggly.categories.bookmarks', {
    url: 'categories/:category',
    views: {
      'bookmarks@': {
        templateUrl: 'app/categories/bookmarks/bookmarks.tmpl.html',
        controller: 'BookmarksCtrl as bookmarksListCtrl'
      }
    }
  });
})
.controller('BookmarksCtrl', function($stateParams, BookmarksModel){
  var bookmarksListCtrl = this;
  bookmarksListCtrl.currentCategoryName = $stateParams.category;
  BookmarksModel.getBookmarks().then(function(result){
    bookmarksListCtrl.bookmarks = result;
  });
})
;
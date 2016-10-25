angular.module('categories.bookmarks.edit', [
  
])
.config(function($stateProvider){
  $stateProvider.state('eggly.categories.bookmarks.edit', {
    url: '/bookmarks/:bookmarkId/edit',
    templateUrl: 'app/categories/bookmarks/edit/edit.bookmark.tmpl.html',
    controller: 'EditBookmarkCtrl as editBookmarkCtrl'
  });
})
.controller('EditBookmarkCtrl', function(){
  
})
;
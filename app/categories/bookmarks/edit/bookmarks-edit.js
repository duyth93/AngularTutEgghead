angular.module('categories.bookmarks.edit', [
  
])
.config(function($stateProvider){
  $stateProvider.state('eggly.categories.bookmarks.edit', {
    url: '/bookmarks/:bookmarkId/edit',
    templateUrl: 'app/categories/bookmarks/edit/edit.bookmark.tmpl.html',
    controller: 'EditBookmarkCtrl as editBookmarkCtrl'
  });
})
.controller('EditBookmarkCtrl', function($state, $stateParams, BookmarksModel){
  var editBookmarkCtrl = this;
  
  function returnToBookmark(){
    $state.go('eggly.categories.bookmarks', {
      category: $stateParams.category
    });
  }
  
  function cancelEditing(){
    returnToBookmark();
  }
  
  function updateBookmark() {
    editBookmarkCtrl.bookmark = angular.copy(editBookmarkCtrl.editedBookmark);
    BookmarksModel.updateBookmark(editBookmarkCtrl.bookmark);
    returnToBookmark();
  }
  
  BookmarksModel.getBookmarkById($stateParams.bookmarkId).then(function(bookmark){
    if(bookmark){
      editBookmarkCtrl.bookmark = bookmark;
      editBookmarkCtrl.editedBookmark = angular.copy(editBookmarkCtrl.bookmark);
    } else {
      returnToBookmark();
    }
  });
  
  editBookmarkCtrl.cancelCreating = cancelEditing;
  editBookmarkCtrl.updateBookmark = updateBookmark;
})
;
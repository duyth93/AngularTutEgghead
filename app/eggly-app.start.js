angular.module('Eggly', [])
.controller('MainCtrl', function($scope) {
  $scope.hello = 'world';
  
  $scope.categories = [
    {"id": 0, "name": "Development"},
    {"id": 1, "name": "Design"},
    {"id": 2, "name": "Exercise"},
    {"id": 3, "name": "Humor"}
  ];

  $scope.bookmarks = [
    {"id": 0, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development" },
    {"id": 1, "title": "Egghead.io", "url": "http://angularjs.org", "category": "Development" },
    {"id": 2, "title": "A List Apart", "url": "http://alistapart.com/", "category": "Design" },
    {"id": 3, "title": "One Page Love", "url": "http://onepagelove.com/", "category": "Design" },
    {"id": 4, "title": "MobilityWOD", "url": "http://www.mobilitywod.com/", "category": "Exercise" },
    {"id": 5, "title": "Robb Wolf", "url": "http://robbwolf.com/", "category": "Exercise" },
    {"id": 6, "title": "Senor Gif", "url": "http://memebase.cheezburger.com/senorgif", "category": "Humor" },
    {"id": 7, "title": "Wimp", "url": "http://wimp.com", "category": "Humor" },
    {"id": 8, "title": "Dump", "url": "http://dump.com", "category": "Humor" }
  ];
  
  $scope.currentCategory = null;
  
  function setCurrentCategory(category) {
    $scope.currentCategory = category;
    cancelEditting();
    cancelCreating();
  }
  
  function isCurrentCategory(category) {
    return $scope.currentCategory !== null && $scope.currentCategory.name === category.name;
  }
  
  $scope.setCurrentCategory = setCurrentCategory;
  $scope.isCurrentCategory = isCurrentCategory;
  $scope.editedBookmark = null;
  
  function setEditedBookmark(bookmark) {
    $scope.editedBookmark = angular.copy(bookmark);
  }
  
  function updateBookmark(bookmark) {
    var index = _.findIndex($scope.bookmarks, function(b) {
      return b.id == bookmark.id;
    });
    $scope.bookmarks[index] = bookmark;
    $scope.editedBookmark = null;
    $scope.isEditting = false;
  }
  
  function isSelectedBookmark(bookmark_id) {
    return $scope.editedBookmark !== null && $scope.editedBookmark.id == bookmark_id;
  }
  
  $scope.setEditedBookmark = setEditedBookmark;
  $scope.updateBookmark = updateBookmark;
  $scope.isSelectedBookmark = isSelectedBookmark;
  
  function deleteBookmark(bookmark) {
    _.remove($scope.bookmarks, function(b) {
      return b.id == bookmark.id;
    });
  }
  
  $scope.deleteBookmark = deleteBookmark;
  
  //-------------------------------------------------------------------------------------------------
  // CREATING AND EDITING STATES
  //-------------------------------------------------------------------------------------------------
  $scope.isCreating = false;
  $scope.isEditting = false;
  
  function resetCreateForm() {
    $scope.newBookmark = {
      title: '',
      url: '',
      category: $scope.currentCategory
    };
  }
  
  function startCreating() {
    $scope.isCreating = true;
    $scope.isEditting = false;
    resetCreateForm();
  }
  
  function cancelCreating() {
    $scope.isCreating = false;
  }
  
  function startEditting() {
    $scope.isCreating = false;
    $scope.isEditting = true;
  }
  
  function cancelEditting() {
    $scope.isEditting = false;
  }
  
  function shouldShowCreating() {
    return $scope.currentCategory && !$scope.isEditting;
  }
  
  function shouldShowEditting() {
    return $scope.isEditting && !$scope.isCreating;
  }
  
  $scope.startCreating = startCreating;
  $scope.cancelCreating = cancelCreating;
  $scope.startEditting = startEditting;
  $scope.cancelEditting = cancelEditting;
  $scope.shouldShowCreating = shouldShowCreating;
  $scope.shouldShowEditting = shouldShowEditting;
  
  //-------------------------------------------------------------------------------------------------
  // CRUD
  //-------------------------------------------------------------------------------------------------
  
  function createBookmark(bookmark) {
    bookmark.id = $scope.bookmarks.length;
    bookmark.category = bookmark.category.name;
    $scope.bookmarks.push(bookmark);
    resetCreateForm();
  }
  
  $scope.createBookmark = createBookmark;
})
;
angular.module('Eggly', [
  'ui.router',
  'categories',
  'categories.bookmarks'
])

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('eggly', {
      url: '',
      abstract: true
    });
  $urlRouterProvider.otherwise('/');
})

.controller('MainCtrl', function($scope, $state) {
  $scope.hello = 'world';
  
  $scope.currentCategory = null;
  
  function setCurrentCategory(category) {
    $scope.currentCategory = category;
//    $state.go('eggly.categories.bookmarks', {category:category.name});
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
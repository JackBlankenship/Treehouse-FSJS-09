( function () {
	'user strict';
	angular.module('app')
	.controller('RecipeDetailController', function ($scope, dataService, $location, $rootScope, $window) {
		$scope.recipeID = $location.url().substr(7);
		$scope.pageType = $location.url().substr(1,4);
		$scope.recipe = {};
		$scope.errors = [];
		$scope.state = "Home";
		$scope.errorCount = 0;
		$scope.foodItems = [];

		// This get passed by the recipes page, but reload kills the object. My thinking is that I would want to prevent as many
		// trips back and forth from the API in a real application.
		if (!$rootScope.categories) {						
			//dataService.getCategories(function (response) {
			dataService.getData("/categories").then( function (response) {
				$rootScope.categories = response.data;
			});
		};

		if ($scope.foodItems.length == 0) {
			//dataService.getFoodItems(function (response) {
			dataService.getData("/fooditems").then( function (response) {
				$scope.foodItems = response.data;
			});
		};

		if ($scope.pageType === 'edit' ) { 
			dataService.getRecipeByID($scope.recipeID)
				.then(function (response){
					$scope.recipe = response.data;
					$scope.process = $scope.recipe.name;
				}, function (error) {
					$scope.errors.push({message: error.data + " for id: " + $scope.recipeID});
					$scope.errorCount++;
				});

		} else {
			$scope.process = "Add New Recipe";
			$scope.recipe = { name: "", description: "", category: "", prepTime: "", cookTime: "", 
			ingredients: [{foodItem: "", condition: "", amount: ""}], steps: [{description: ""}], _id : ""}
		};

		// $scope functions
		$scope.saveRecipe = function () {
			// to clean this up a bit, only save this when $scope.state == "Cancel" aka has a changed state.
			// I could add ng-show="state =='Cancel'" on the save button html
			dataService.processRecipe($scope.recipe, $scope.pageType)
				.then (
					function (response) {
						$scope.updResponse = response;  // not sure why I am doing this.
						$location.path("/");
					}, function (error) {
						// handle error condition.
					});
		};

// This will reload the page if you have made changes, otherwise route to the home page.
		$scope.cancelRecipe = function () {
			if  ( $scope.state === "Cancel" ) {
				$window.location.reload();
			} else {
				$location.path("/");
			};

		};

		// handel the delete or additions to the ingredients and steps arrays
		$scope.changed = function () {
			$scope.state = "Cancel";
		}
		$scope.deleteEntry = function (array, index) {
			array.splice(index, 1);
			$scope.changed();
		};
		$scope.addEntry = function (array) {
			array.push({});
			$scope.changed();
		};
		
	});
}) () ;
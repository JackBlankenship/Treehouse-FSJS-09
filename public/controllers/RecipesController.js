(function () {
	'use strict';
	angular.module('app')
	.controller('RecipesController', function ($scope, dataService, $location, $rootScope) {
		$scope.recipeMatch = true;		// hide the two recipe div
		$scope.recipeCount = 0;

		//dataService.getCategories(function( response) {
		dataService.getData("/categories").then ( function (response) {
			$rootScope.categories = response.data;
		});

		getAllRecipes();

		function getAllRecipes () {
			dataService.getData("/recipes").then ( function (response) {
				$scope.recipes = response.data;
				setPageData();
			});
		};

		function setPageData () {
			$scope.recipeCount = $scope.recipes.length;
			if ($scope.recipeCount > 0) {
				$scope.recipeMatch = true;
			} else {
				$scope.recipeMatch = false;
			};
		};

		$scope.findRecipes = function () {
			// not sure if I should call this every time.
			if ($scope.selectedCategory !== null) {
				dataService.getRecipesByCategory($scope.selectedCategory.name).then( function(response) {
					$scope.recipes = response.data;
					console.log(response);
					setPageData();
				});
			} else {
				getAllRecipes();
			};
		};

		$scope.routeRecipeDetail = function($index) {
			console.log($scope.recipes[$index]);
			$location.path("/edit/:" + $scope.recipes[$index]._id);
		};

		$scope.routeRecipeDelete = function($index) {
			$scope.isConfirmed = confirm("Are you sure to delete this record ?");
	      		if ($scope.isConfirmed) {
					dataService.deleteSelectedRecipe($scope.recipes[$index]._id)
					.then ( function (response) {
						// success
						$scope.recipes.splice($index, 1);
					}, function (error) {
						// failed
					}); 
	      		} else {
	        		return false;
	      		};

			//$location.path("")
		};
		$scope.addRecipe = function () {
			$location.path("/add"); 
		};
	});
}) ();
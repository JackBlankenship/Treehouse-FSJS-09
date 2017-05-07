( function () {

	'use strict';

	angular.module('app')
	.service('dataService', function($http) {

	/*
	To your service, add methods to call the following API endpoints:
	Completed - GET /api/recipes - Gets all of the recipes.
	Completed - GET /api/categories - Gets all of the categories.
	Completed - GET /api/fooditems - Gets all of the food items.
	Completed - GET /api/recipes?category={category} - Gets all of the recipes for the specified category.
	Completed - GET /api/recipes/{id} - Gets the recipe for the specified ID.
	Completed - PUT /api/recipes/{id} - Updates the recipe for the specified ID.
	Completed - POST /api/recipes - Adds a recipe.
	Completed - DELETE /api/recipes/{id} - Deletes the recipe for the specified ID.
	*/
		let baseURL = "http://localhost:5000/api";

		//this.getRecipes = function (callback) {
		//	$http.get(baseURL + '/recipes').then(callback);
		//};
		//this.getCategories = function(callback) {
		//	$http.get(baseURL + '/categories').then(callback);
		//};	
		//this.getFoodItems = function(callback) {
		//	$http.get(baseURL + '/fooditems').then(callback);
		//};
	// replace the above three functions with this one below.
		this.getData = function (APIcall, callback) {
			return $http.get(baseURL + APIcall)
		};

		this.getRecipesByCategory = function (category, callback) {
			return $http.get(baseURL + '/recipes?category=' + category);
		};
		this.getRecipeByID = function(id, callback) {
			return $http.get(baseURL + '/recipes/' + id);
		};

		// DO NOT stringify the JSON objects
		this.processRecipe = function(dataObject, type, callback) {
			if (type === "edit") {
				return $http.put(baseURL + '/recipes/' + dataObject._id, dataObject);
			} else {
				return $http.post(baseURL + '/recipes', dataObject);
			};
		};

		this.addRecipe = function(dataObject, callback) {
			return $http.post(baseURL + '/recipes', dataObject);
		};
		this.updateRecipe = function (dataObject, callback) {
			return $http.put(baseURL + '/recipes/' + dataObject._id, dataObject);
		};
		this.deleteSelectedRecipe = function (id, callback) {
			return $http.delete(baseURL + "/recipes/" + id);
		}
	});
} )();
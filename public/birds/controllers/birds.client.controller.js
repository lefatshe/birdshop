// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'birds' controller
angular.module('birds').controller('BirdsController', ['$scope', '$routeParams', '$location', 'Authentication', 'Birds', 'ngCart',
    function($scope, $routeParams, $location, Authentication, Birds, ngCart ) {

        // Config ngCart
        ngCart.setTaxRate(7.5);
    	ngCart.setShipping(2.99);  


    	// Expose the Authentication service
        $scope.authentication = Authentication;

        // Create a new controller method for creating new birds
        $scope.create = function() {
        	// Use the form fields to create a new bird $resource object
            var bird = new Birds({
                title: this.title,
                subtitle: this.subtitle,
                content: this.content,
                price: this.price,
                preprice: this.preprice,
                img: this.img
            });

            // Use the bird '$save' method to send an appropriate POST request
            bird.$save(function(response) {
            	// If an bird was created successfully, redirect the user to the bird's page 
                $location.path('/#!/');
                //$('#confirm').html("<div class='alert text-center alert-success alert-dismissible overflow' role='alert'>You have successfully submitted a 'BirdFree product'. <p class='terms-name'> Item"+ response._id + "</p><button class='pull-right' type='button' aria-label='Close' data-dismiss='alert'><span aria-hidden='true'>&times;</span></button></div>");
            }, function(errorResponse) {
            	// Otherwise, present the user with the error message
                $scope.error = errorResponse.data.message;
            });
        };

        // Create a new controller method for retrieving a list of birds
        $scope.find = function() {
        	// Use the bird 'query' method to send an appropriate GET request
            $scope.birds = Birds.query();
        };

        // Create a new controller method for retrieving a single bird
        $scope.findOne = function() {
        	// Use the bird 'get' method to send an appropriate GET request
            $scope.bird = Birds.get({
                articleId: $routeParams.articleId
            });
        };

        // Create a new controller method for updating a single bird
        $scope.update = function() {
        	// Use the bird '$update' method to send an appropriate PUT request
            $scope.bird.$update(function() {
            	// If an bird was updated successfully, redirect the user to the bird's page 
                $location.path('birds/' + $scope.bird._id);
            }, function(errorResponse) {
            	// Otherwise, present the user with the error message
                $scope.error = errorResponse.data.message;
            });
        };

        // Create a new controller method for deleting a single bird
        $scope.delete = function(bird) {
        	// If an bird was sent to the method, delete it
            if (bird) {
            	// Use the bird '$remove' method to delete the bird
                bird.$remove(function() {
                	// Remove the bird from the birds list
                    for (var i in $scope.birds) {
                        if ($scope.birds[i] === bird) {
                            $scope.birds.splice(i, 1);
                        }
                    }
                });
            } else {
            	// Otherwise, use the bird '$remove' method to delete the bird
                $scope.bird.$remove(function() {
                    $location.path('birds');
                });
            }
        };
    }
]);
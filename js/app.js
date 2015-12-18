/*!
** Example App
** Licensed under the Apache License v2.0
** http://www.apache.org/licenses/LICENSE-2.0
** Built by Jay Kanakiya ( @techiejayk )
**/

"use strict";

var App = angular.module("toDoApp",["ui.sortable","LocalStorageModule"]);

App.controller("TodoCtrl",function  ($scope,localStorageService) {
    $scope.init = function(){
        if(localStorageService.get("todoList")===null){
            $scope.todos = [
                {
                    taskName:"Write an Angular js Tutorial for you",
                    isDone:false,
                    date:new Date()
                }
            ];
        }
        else{
            $scope.todos =localStorageService.get("todoList");
        }
    }
    $scope.todoSortable={
        containment:"parent",
        cursor:"move",
        tolerance:"pointer"
    };
    $scope.addToDo = function(){
        $scope.todos.push({
            taskName:$scope.newTodo.taskName,
            isDone:false,
            date:$scope.newTodo.date
        });
        $scope.newTodo.taskName="";
        $scope.newTodo.date=null;
    };
    $scope.$watch("todos",function  (newVal,oldVal) {
        if (newVal !== null && angular.isDefined(newVal) && newVal!==oldVal) {
            localStorageService.add("todoList",angular.toJson(newVal));
        }
    },true);
	//
});
app.controller('todoCtrl', function () {
	let vm = this;

	// todo List Array
	vm.todos = [];

	// registrition user array
	vm.registerUser = [];

	// loginName Array
	vm.loginName = [];

	// registration inputs
	vm.registerUserEmail = null;
	vm.registerUserPassword = null;

	// hello start user
	vm.startUser; 

	// login varriables
	vm.login = null;
	vm.password = null;

	//varriables for sharing tasks
	vm.shareTodoText = null;
	vm.enteredTaskSender = null;
	vm.getTaskOwner = null;

	// input writting todo task 
	vm.newTodo = null;

	// adding task function
	vm.btnAdd = function () {
		vm.todos.push({
			todo: vm.newTodo,
			taskOwner: vm.startUser,
			taskSender: null
		});
		$("#exampleModalCenter").modal('hide');
		vm.stringifyItem = angular.toJson(vm.todos);
		vm.addToLocal = localStorage.setItem('todo', vm.stringifyItem);
		vm.newTodo = '';
	}



	// checking if localStorage is not empty
	if (localStorage.getItem('todo')) {
		vm.str = localStorage.getItem('todo');
		vm.todos = JSON.parse(vm.str);
	}
	if (localStorage.getItem('user_data')) {
		vm.str2 = localStorage.getItem('user_data');
		vm.registerUser = JSON.parse(vm.str2);
	}
	if (localStorage.getItem('user_login_data')) {
		vm.str3 = localStorage.getItem('user_login_data');
		vm.loginName = JSON.parse(vm.str3);
	}

	//button remove todo
	vm.btnRemove = function (index) {
		vm.todos.splice(index, 1);
		localStorage.clear();
		if (vm.todos.length != localStorage.length) {
			vm.stringifyItem = angular.toJson(vm.todos);
			vm.stringifyUser = angular.toJson(vm.registerUser);
			vm.stringifyLogin = angular.toJson(vm.loginName);
			vm.addToLocal = localStorage.setItem('todo', vm.stringifyItem);
			vm.addUserData = localStorage.setItem('user_data', vm.stringifyUser);
			vm.addUserLogin = localStorage.setItem('user_login_data', vm.stringifyLogin);
		}
		else {
			vm.stringifyItem = angular.toJson(vm.todos);
			vm.stringifyUser = angular.toJson(vm.registerUser);
			vm.stringifyLogin = angular.toJson(vm.loginName);
			vm.addToLocal = localStorage.setItem('todo', vm.stringifyItem);
			vm.addUserData = localStorage.setItem('user_data', vm.stringifyUser);
			vm.addUserLogin = localStorage.setItem('user_login_data', vm.stringifyLogin);
		}

	}

	// button edit task 
	vm.btnEdit = function (edit) {
		vm.editTodoText = edit.todo;
		localStorage.clear();
		vm.saveTodo = function () {
			if (edit.todo != vm.editTodoText) {
				edit.todo = vm.editTodoText;
				vm.editTodoText = '';
				vm.stringifyItem = angular.toJson(vm.todos);
				vm.stringifyUser = angular.toJson(vm.registerUser);
				vm.stringifyLogin = angular.toJson(vm.loginName);
				vm.addToLocal = localStorage.setItem('todo', vm.stringifyItem);
				vm.addUserData = localStorage.setItem('user_data', vm.stringifyUser);
				vm.addUserLogin = localStorage.setItem('user_login_data', vm.stringifyLogin);
			}
			else {
				vm.stringifyItem = angular.toJson(vm.todos);
				vm.stringifyUser = angular.toJson(vm.registerUser);
				vm.stringifyLogin = angular.toJson(vm.loginName);
				vm.addToLocal = localStorage.setItem('todo', vm.stringifyItem);
				vm.addUserData = localStorage.setItem('user_data', vm.stringifyUser);
				vm.addUserLogin = localStorage.setItem('user_login_data', vm.stringifyLogin);
			}
		}
	}

	// task sharing function
	vm.getDataToShare = function (index) {
		vm.shareTodoText = index.todo;
		vm.getTaskOwner = index.taskOwner;
		vm.sendToUser = function () {
			if (vm.taskReceiver !== index.taskOwner && $('.sender').val() !== '') {
				index.taskSender = "You have got this task from: " + vm.enteredTaskSender;
				index.todo = vm.shareTodoText;
				index.taskOwner = vm.taskReceiver;
				alert('Task has already sent to: ' + vm.taskReceiver);
				vm.enteredTaskSender = '';
			}
			else {
				alert("You can not share task with yourself or list/input is empty! Please check select and input for correct value!");
			}

		}
	}

	//registration function
	vm.registerUserBtn = function () {
		if (vm.registerUserEmail.length != 0 && vm.registerUserPassword.length != 0) {
			vm.registerUser.push({
				user_name: vm.registerUserEmail,
				user_password: vm.registerUserPassword
			})
			localStorage.setItem('user_data', JSON.stringify(vm.registerUser));
			vm.login = vm.registerUserEmail;
			vm.password = vm.registerUserPassword;
			$('#modalRegisterForm').modal('hide');
			$('#loginModal').modal('show');
		}
		else {
			alert('Fill in all the fields correctly!!!');
		}
	}


	// login function
	vm.submit = function () {
		vm.pluckObj = _.pluck(vm.registerUser, 'user_name'); //getting user name from registration array to check if exists
		vm.pluckObj2 = _.pluck(vm.loginName, 'userName'); //getting user name from login array to check if exists
		if (vm.pluckObj.indexOf(vm.login) == -1 && vm.pluckObj2.indexOf(vm.login) == -1) { //checking if loginning user exists in registration array
			alert('Enter your email and password correctly! Maybe you are not registered user. Please click the link below to registrate!');
			$('#modalRegisterForm').modal('show');
		}
		else {
			vm.loginName.push({ //push login if user exists in registration array
				userName: vm.login,
				userPassword: vm.password
			});

			vm.uniqUser = _.uniq(vm.loginName, function (person) { //get only unique users to avoid user name duplicating
				return person.userName;
			});
			localStorage.setItem('user_login_data', angular.toJson(vm.loginName));
			vm.startUser = vm.login;
		}
		vm.login = "";
		vm.password = "";
		vm.registerUserEmail = '';
		vm.registerUserPassword = '';
		$('#loginModal').modal('hide');
	}

	//jQuery section
	$(function () {
		alert("Sign in to start using todo list");
		$("#signInLink").click(function () {
			$('#modalRegisterForm').modal('hide');
			$('#loginModal').modal('show');
		});
		$("#signUpLink").click(function () {
			$('#modalRegisterForm').modal('show');
			$('#loginModal').modal('hide');
		});
		$('#editModal').blur(function () {
			vm.stringifyItem = angular.toJson(vm.todos);
			vm.addToLocal = localStorage.setItem('todo', vm.stringifyItem);
		});
		$('.fade').click(function () {
			$(this).modal('show');
		});
		$('#modalRegisterForm').modal('show');
		$('.xIcon').click(function () {
			$('#table').fadeOut(600);
			$('#btnAdd').fadeOut(600);
			$('.triangle').fadeOut(600);
		});
		$('.todoOpen').click(function () {
			$('#table').fadeIn(600);
			$('#btnAdd').fadeIn(600);
			$('.triangle').fadeIn(600);
		});
	});
})

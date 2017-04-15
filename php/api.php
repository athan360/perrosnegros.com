<?php
	ini_set('display_errors',1);  
	ini_set('display_startup_errors',1);
	error_reporting(1);
	//start session 
	session_start();
	//get the controller class
	require_once($_SERVER['DOCUMENT_ROOT'].'php/services/controller.php');
	
	//define response
	$response= "";
	//initialize connection
	$controller= new controller();
	//initialize response
	if(isset($_GET)){
		//evaluate session
		if($_GET['command']=='checkLogin'){
			$response= $controller-> checkLogin();
		}
		//checkLogin
		else if($_GET['command']=='doLogin'){
			//return the login
			$response= $controller-> doLogin($_POST['user'],$_POST['password']);
		}
		//only with session
		else if($controller->checkLogin()){
			//doLogout
			if($_GET['command']=='doLogout'){
				//return teh login
				$response= $controller->doLogout();
			}
			/*USER FUNCTIONS*/
			else if($_GET['command']=='getAllUsers'){
				//return users
				$response= $controller->getAllUsers();
			}
		}
	}
	echo json_encode($response);
?>
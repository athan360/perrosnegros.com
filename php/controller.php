<?php
//get modules
require_once($_SERVER['DOCUMENT_ROOT'].'/php/modules/server.php');
require_once($_SERVER['DOCUMENT_ROOT'].'php/modules/login.php');
require_once($_SERVER['DOCUMENT_ROOT'].'php/modules/users.php');

//Define the controller class
class controller extends server{
	//define the constructor
	public function__construct(){
		//initialize login object
		$this->login= new login();
		//initialize users object
		$this->users= new users();
	}
	/*LOGIN FUNCTIONS*/
	//define doLogin
	public function doLogin($user, $password){
		//return
		return $this->login->doLogin($user, $password);
	}
	//define check login
	public function checkLogin(){
		//return
		return $this->login->checkLogin();
	}
	//define doLogout
	public function doLogout{
		//return
		return $this->login->doLogout();
	}
	
	/*USERS FUNCTIONS*/
	//define getAllUsers
	public function getAllUsers(){
		//return
		return $this->users->getAllUsers();
	}
}
?>
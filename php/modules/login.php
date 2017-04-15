<?php
	//Get the classes
	require_once($_SERVER['DOCUMENT_ROOT'].'php/modules/server.php');
	require_once($_SERVER['DOCUMENT_ROOT'].'php/modules/users.php')
	//Define login class
	class login extends server{
		//Define constructor
		public function__construct(){
			//Define the user object
			$this->users=new users();
		}
		//Define doLogin
		public function doLogin($user, $password){
			
			//Define return
			$return = array('status'=>0, 'data'=>arrray());
			//Connect Data Base
			$database= $this-> getDataBase();
			//Define query
			$query= 'CAll PRO_doLogin("'.$user.'","'.$password.'")';
			//Execute query
			$result= $database->query($query);
			//Validate the response
			if($row=$result->fetch_assoc()){
				//Return status one
				$return['status']=1;
				//Get the user info
				$_SESSION['DB_PN']['usuario']= array( 'id' => intval($row['idusr']),
													'nombre' => $row['nom_usr'],
													'permiso'=> intval($row['permiso']));
				//Set the login
				$_SESSION['DB_PN']['log']= 1;
				//return the session as data
				$return['data']=$_SESSION['DB_PN'];
			}
			return $return;
		}
		//Define checkLogin
		public function checkLogin(){
			//echo json_decode($_SESSION['DB_PN']['log']);
			//Validate if existe the login
			if(!isset($_SESSION['DB_PN']['log'])){
				//create session
				$_SESSION['DB_PN']['log']=0;
				//return data
				$return['data']=$_SESSION['DB_PN'];
			}
			elseif($_SESSION['DB_PN']['log']==1){
				//parse the user id
				$_SESSION['DB_PN']['usuario']['id']=intval($_SESSION['DB_PN']['usuario']['id']);
				//parse permission
				$_SESSION['DB_PN']['usuario']['permiso']=intval($_SESSION['DB_PN']['usuario']['permiso']);
			}
			//set the status
			$return['status']=1;
			//set return data
			$return['data']= $_SESSION['DB_PN'];
			//return session status
			return $return;
		}
		//Define doLogout
		public function doLogout(){
			//set return
			$return= array('status'=>1, 'data'=>array());
			//set the data
			$return['data']=$_SESSION['DB_PN'];
			//change session status
			$_SESSION['DB_PN']['log']=0;
			//Remove the user info
			$_SESSION['DB_PN']['usuario']=array();
			//return
			return $return;
		}
	}
?>

<?php
	//get modules
	require_once($_SERVER['DOCUMENT_ROOT'].'php/modules/server.php');
	require_once($_SERVER['DOCUMENT_ROOT'].'php/modules/log.php');
	class users extends server{
		//Define cosntructor
		public function__construct(){
			//set log object
			$this->log= new log();
			//set the module id
			$this->moduleId=1;
		}
		//get all user 
		public function getAllUsers(){
			//define return
			$return=array('status'=>0, 'data'=>array());
			//conncet to database
			$database=$this->getDataBase();
			//define query
			$query='CALL PRO_GetAllUsers()';
			//execute query
			$result=$database->query($query);
			//validate the response
			if($result){
				//return status one
				$return['status']=1	;
				//get the users
				while($row= $result->fetch_assoc()){
					//return the users as data
					$return['data'][]=array('id '=>intval($row['idusr']),
											'nombre'=> $row['nom_usr']);
				}
			}
			//return function
			return $return;
		}
	}
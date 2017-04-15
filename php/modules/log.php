<?php
	//Getting all the modules
	require_once($_SERVER['DOCUMENT_ROOT'].'php/module/server.php');
	//Define the log class
	class log extends server{
	//Define the constructor
		public function__construct(){
			//empty
		}
		//Define addLog
		public function AddLog($module, $action, $data){
			//Define return
			$return=0;
			//connect to database
			$database= $this ->getDataBase();
			//define query
			$query='CALL PRO_AddLog("'.$_SESSION['DB_PN']['usuario']['id'].'")';
			//$query= 'CALL PRO_AddLog("'.$_SESSION['DB_PN']['usuarios']['idusr'].'","'.$module.'","'.$action.'","'.$data.'","'.$_SERVER['HTTP_USER_AGENT']'","'.$_SERVER['REMOTE_ADDR'].'")';
			//Excute query
			$result= $database->query($query);
			//Validate the response
			if($row= $result-> fetch_assoc()){
				//get the log id 
				$return= intval($row['log_usr']);
			}
			//return
			return $return;
		}
	}
?>
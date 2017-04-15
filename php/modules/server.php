<?php
	//Define Server Class
	class server {
		//Define Construct
		public function __construct() {
			//Empty
		}

		//Define database function
		public function getDataBase() {
			//Create a connection
			$dataBase = new mysqli('127.0.0.1','USR_PN','PerrosN.1','DB_PN'); 
			if(mysqli_connect_errno()){
				printf(error_db_conmect());
				exit();
			}

			/*if ($dataBase->connect_error) {
    			die("Fallo conexion: " . $dataBase->connect_error);
			}
			echo "conexion exitosa";*/
			//Set the encode
			$dataBase->query('SET CHARACTER SET utf8');
			//Return the Connection
			return $dataBase;
		}

		public function htmlReplace($text) {
			//Replace the á's
			$text = str_replace('á', '&aacute;', $text);
			//Replace the é's
			$text = str_replace('é', '&eacute;', $text);
			//Replace the í's
			$text = str_replace('í', '&iacute;', $text);
			//Replace the ó's
			$text = str_replace('ó', '&oacute;', $text);
			//Replace the ú's
			$text = str_replace('ú', '&uacute;', $text);
			//Replace the ñ's
			$text = str_replace('ñ', '&ntilde;', $text);
			//Replace the Á's
			$text = str_replace('Á', '&Aacute;', $text);
			//Replace the É's
			$text = str_replace('É', '&Eacute;', $text);
			//Replace the Í's
			$text = str_replace('Í', '&Iacute;', $text);
			//Replace the Ó's
			$text = str_replace('Ó', '&Oacute;', $text);
			//Replace the Ú's
			$text = str_replace('Ú', '&Uacute;', $text);
			//Replace the Ñ's
			$text = str_replace('Ñ', '&Ntilde;', $text);
			//Replace the ¡'s
			$text = str_replace('¡', '&#161;', $text);
			//Return the text
			return $text;
		}
	}
?>
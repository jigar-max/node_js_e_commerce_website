
<?php
session_start();

$con = mysqli_connect('localhost', 'root', 'admin');
if($con){
	echo "Connection successful";
}else{
	echo "no connection";
}

$db = mysqli_select_db($con, 'admindatabase');

if(isset($_POST['submit'])){
	$username = $_POST['user'];
	$password = $_POST['pass'];

	$sql = " select * from  admintable where admin_id='$username' and admin_password='$password' ";

	$query = mysqli_query($con,$sql);
	//echo"$sql";

	//$row = mysqli_num_rows($query);	
	if(!$query || mysqli_num_rows($query)==1){
			echo "login successful";
			$_SESSION['user'] = $username;
			header('location:adminmainpage.php');
		}else{
			echo "login failed";
			header('location:adminlogin.php');
		}

}


?>
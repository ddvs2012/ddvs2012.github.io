<?php 
if(empty($_POST) === false){
	$errors = array();

	$name 		= $_POST['name'];
	$email 		= $_POST['email'];
	$message 	= $_POST['message'];

	// echo $name, ' ', $email, ' ', $message;

	if (empty($name) === true || empty($email) === true || empty($message) === true){
		$errors[] = 'Name,email, and message are required!';
	} else{
		if (ctype_alpha($name) === false) {
			$errors[] = 'Name must only be letters';
		}
		if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
			$errors[] = 'Invalid email address';
		}		
	}
}
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Contact</title>
	</head>
	<body>
		<?php
		if (isset($_GET['sent']) === true){
			echo '<p>boo!</p>';
		} else{
				if (empty($errors) === false) {
					echo '<ul>';
					foreach ($errors as $error) {
						echo '<li>', $error, '</li>';
					}
					echo '</ul>';
				}
				if (empty($errors) === false){
					//send
					mail('dalexander@dannysview.com','Contact Form','$message','From: ' . $email);
					//redirect user
					header('Location: scratch.php?sent');
					exit();
				}
			?>
			<form action="" method="post">
				<p>
					<label for="name">Name:</label><br>
					<input type="text" name="name" id="name" <?php if(isset($_POST['name'])===true) {echo "value='", strip_tags($_POST["name"]),  "'";} ?>>
				</p>
				<p>
					<label for="email">Email:</label><br>
					<input type="text" name="email" id="email" <?php if(isset($_POST['email'])===true) {echo "value='", strip_tags($_POST["email"]),  "'";} ?>>
				</p>
				<p>
					<label for="message">Message:</label><br>
					<textarea name="message" id="message"><?php if(isset($_POST['message'])===true) {echo strip_tags($_POST["message"]);} ?></textarea>
				</p>
				<p>
					<input type="submit" value="Submit">
				</p>
			</form>
		<?php 
		}
		?>
	</body>
</html>
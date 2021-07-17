<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$email = $_POST['user_email'];


$mail->isSMTP();                                      
$mail->Host = 'smtp.mail.ru';  																						
$mail->SMTPAuth = true;                               
$mail->Username = 'edusolutions@mail.ru'; 
$mail->Password = '36082312Hb*';
$mail->SMTPSecure = 'ssl';                           
$mail->Port = 465; 

$mail->setFrom('edusolutions@mail.ru');
$mail->addAddress('mansur.sabirov99@gmail.com');    
$mail->isHTML(true);                                  

$mail->Subject = 'Все работает';
$mail->Body    = '' .$name . ' оставил заявку, его телефон ' .$phone. '<br>Почта пользователя: ' .$email;
$mail->AltBody = '';

if(!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'данные отправлены!';
}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);

?>
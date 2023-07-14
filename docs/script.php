<!--
if($_POST["message"]) {
mail("adamsuchecki@wp.pl", "Here is the subject line",
$_POST["insert your message here"]. "From: an@email.address");
}
 -->


 <?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Tutaj możesz dodać kod walidacji danych, np. sprawdzanie czy pola nie są puste

    // Adres e-mail, na który zostanie wysłana wiadomość
    $to = 'michal.zawadzki1221@gmail.com';
    // Temat wiadomości e-mail
    $subject = 'Nowa wiadomość z formularza kontaktowego';
    // Treść wiadomości e-mail
    $email_message = "Od: $name\n";
    $email_message .= "Email: $email\n";
    $email_message .= "Wiadomość:\n$message";

    // Nagłówki e-mail
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Wysyłanie wiadomości e-mail
    if (mail($to, $subject, $email_message, $headers)) {
        echo 'Wiadomość została wysłana.';
    } else {
        echo 'Wystąpił błąd podczas wysyłania wiadomości.';
    }
}
?>


<?php
// On déconnecte la session en effaçant totalement $_SESSION

session_start();
unset($_SESSION['user']);

header('Location: '.$_SERVER['HTTP_REFERER']);
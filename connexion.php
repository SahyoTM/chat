<?php
session_start();

// Formulaire de connexion
// Doit afficher en haut de page "Vous êtes connecté(e)" si le mail et le mot de passe sont bons.
// Doit afficher en haut de page "Email et/ou mot de passe invalide" si le mail et le mot de passe ne sont pas bons.

if(isset($_POST) && !empty($_POST)){
    if(isset($_POST['email']) && !empty($_POST['email']) && isset($_POST['pass']) && !empty($_POST['pass'])){
        $mail = strip_tags($_POST['email']);
        $pass = $_POST['pass'];

        require_once('assets/bdd.php');

        $sql = 'SELECT * FROM `users` WHERE `email` = :email;';
        $query = $db->prepare($sql);

        $query->bindValue(':email', $mail, PDO::PARAM_STR);

        $query->execute();

        $user = $query->fetch(PDO::FETCH_ASSOC);

        if(!$user){
            echo 'Email et/ou mot de passe invalide';
        }else{
            if(password_verify($pass, $user['password'])){
                $_SESSION['user'] = [
                    'id'    => $user['id'],
                    'email' => $user['email'],
                    'pseudo'  => $user['pseudo']
                ];

                header('Location: index.php');
            }else{
                echo 'Email et/ou mot de passe invalide';
            }
        }

    }else{
        echo "Veuillez remplir tous les champs...";
    }
}

include_once('assets/header.php');
?>
<div class="col-12 my-1 mx-auto">
    <h1 class="text-center font-weight-bold">CONNEXION</h1>
    <form method="post">
        <div class="form-group">
            <label for="email">E-mail :</label>
            <input class="form-control" type="email" id="email" name="email">
        </div>
        <div class="form-group">
            <label for="pass">Mot de passe :</label>
            <input class="form-control" type="password" id="pass" name="pass">
        </div>
        <button class="btn btn-primary text-center">Me connecter</button>
    </form>
</div>
<?php
include_once('assets/footer.php');

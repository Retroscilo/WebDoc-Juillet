<?php

// Récupération du paramètre NomEleve passé dans la requête ajax dans mon fichier.js
$name=$_GET['name'];
//exemple bidon on cherche le prénom de l'élève de nom donné

// Ecriture de l'objet JSON contenant les infos qui vont être renvoyées
header('Content-type: application/json');
?>
    {
    "PrenomEleve": "<?php echo $name;?>"
    }
<?php
exit(0);
?>
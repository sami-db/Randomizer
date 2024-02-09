
document.getElementById("btnRoue").addEventListener("click", function() {
    afficherJeu("jeuRoue");
    if (!roue) {
        initialiserRoue(["Valeur 1", "Valeur 2", "Valeur 3"]); // Valeurs par défaut
    }
});


document.getElementById("btnPileFace").addEventListener("click", function() {
    afficherJeu("jeuPileFace");
});
document.getElementById("btnDe").addEventListener("click", function() {
    afficherJeu("jeuDe");
    previsualiserDe();
});

function afficherJeu(idJeu) {
    var jeux = document.getElementsByClassName("jeu");
    for (var i = 0; i < jeux.length; i++) {
        jeux[i].style.display = "none";
    }
    document.getElementById(idJeu).style.display = "block";
}


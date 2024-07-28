document.addEventListener('DOMContentLoaded', () => {
    const settingsButton = document.querySelector('.button-1 img');
    const settingsWidget = document.getElementById('settings-widget');
    const closeWidgetButton = document.getElementById('close-widget');
    const gameButtons = document.querySelectorAll('.button-game .button-3');
    const menu = document.getElementById('menu');
    const logo = document.getElementById('logo');
    const jeux = {
        'btnRoue': 'jeuRoue',
        'btnPileFace': 'jeuPileFace',
        'btnDe': 'jeuDe'
    };

    if (settingsButton) {
        settingsButton.addEventListener('click', () => {
            console.log('Settings button clicked');
            settingsWidget.style.display = 'block';
        });
    } else {
        console.error('Settings button not found.');
    }

    if (closeWidgetButton) {
        closeWidgetButton.addEventListener('click', () => {
            console.log('Close button clicked');
            settingsWidget.style.display = 'none';
        });
    } else {
        console.error('Close widget button not found.');
    }

    if (gameButtons) {
        gameButtons.forEach(button => {
            button.addEventListener('click', () => {
                console.log('Game button clicked');
                // Ajoutez l'animation de sortie
                menu.classList.add('slide-out');
                logo.classList.add('slide-out');

                // Créez le rectangle gris
                const greyRectangle = document.createElement('div');
                greyRectangle.classList.add('grey-rectangle');
                document.body.appendChild(greyRectangle);

                // Afficher le jeu correspondant après l'animation
                setTimeout(() => {
                    document.querySelectorAll('.jeu').forEach(jeu => {
                        jeu.style.display = 'none';
                    });
                    const jeuId = jeux[button.id];
                    document.getElementById(jeuId).style.display = 'block';
                }, 1000); // Durée de l'animation en millisecondes
            });
        });
    } else {
        console.error('Game buttons not found.');
    }
});




//document.getElementById("btnRoue").addEventListener("click", function() {
//    afficherJeu("jeuRoue");
//    if (!roue) {
//        initialiserRoue(["Valeur 1", "Valeur 2", "Valeur 3"]); // Valeurs par défaut
//    }
//});


//document.getElementById("btnPileFace").addEventListener("click", function() {
//    afficherJeu("jeuPileFace");
//});
//document.getElementById("btnDe").addEventListener("click", function() {
//    afficherJeu("jeuDe");
//    previsualiserDe();
//});

//function afficherJeu(idJeu) {
//    var jeux = document.getElementsByClassName("jeu");
//    for (var i = 0; i < jeux.length; i++) {
//        jeux[i].style.display = "none";
//    }
//    document.getElementById(idJeu).style.display = "block";
//}


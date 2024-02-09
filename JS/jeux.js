// ########################################
// ##########  ROUE DE LA CHANCE ##########
// ########################################

var roue; // Déclaration de la variable globale pour la roue
var estRoueEnCours = false;
function initialiserRoue(valeurs) {
    var couleurs = ['#eae56f', '#89f26e', '#7de6ef', '#e7706f'];
    var segments = valeurs.map(function(val, index)  {
        return { 'fillStyle' : couleurs[index % couleurs.length], 'text' : val };
    });
    roue = new Winwheel({
        'canvasId'    : 'canvasRoue',
        'numSegments' : valeurs.length,
        'segments'    : segments,
        'animation'   : {
            'type'     : 'spinToStop',
            'duration' : 5,           // Durée de l'animation en secondes
            'spins'    : 8,           // Nombre de tours complets
            'callbackFinished' : alertResultat
        }
    });
}
function lancerRoue() {
    if (estRoueEnCours) return; // Empêcher le lancement multiple
    estRoueEnCours = true;
    var input = document.getElementById("valeursRoue").value;
    var valeurs = input.split(',').map(function(item) {
        return item.trim();
    }).filter(function(item) {
        return item !== ""; // Filtre les valeurs vides
    });

    if (valeurs.length > 0) {
        initialiserRoue(valeurs);
        roue.startAnimation();
    } else {
        alert("Veuillez entrer au moins une valeur.");
    }
}


function alertResultat() {
    estRoueEnCours = false;
    var segmentSelectionne = roue.getIndicatedSegment();
    document.getElementById("resultatRoue").innerHTML = "La roue s'arrête sur: " + segmentSelectionne.text;
}
// ####################################
// ##########  PILE OU FACE  ##########
// ####################################
var estPileFaceEnCours = false;
function lancerPileFace() {
    if (estPileFaceEnCours) return;
    estPileFaceEnCours = true;
    var piece = document.getElementById("piece");
    var isFace = true; // Commence par l'image de face

    // Fonction pour changer l'image
    function changerImage() {
        piece.src = isFace ? "https://i.ibb.co/6vfNhPT/pile.png" : "https://i.ibb.co/MnTMfJ8/face.png";
        isFace = !isFace;
    }

    // Commencer l'animation
    piece.classList.add("flip");
    var intervalId = setInterval(changerImage, 250);
    // Arrêter l'animation et afficher le résultat final
    setTimeout(function() {
        estPileFaceEnCours = false;
        clearInterval(intervalId); // Arrête de changer l'image
        var resultat = Math.random() < 0.5 ? "Pile" : "Face";
        piece.src = resultat === "Pile" ? "https://i.ibb.co/6vfNhPT/pile.png" : "https://i.ibb.co/MnTMfJ8/face.png";
        document.getElementById("resultatPileFace").innerHTML = "Résultat : " + resultat;
        piece.classList.remove("flip");
    }, 3000); // Durée totale de l'animation
}

// ######################################
// ##########  Dé à six faces  ##########
// ######################################

var scene, camera, renderer, cube;
var animationId;
var vitesseRotation = 0.1;
var ralentissement = 0.99;
var estDeEnCours = false;
function initDe() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0xffffff, 0);
    renderer.setSize(400, 400);
    document.getElementById('containerDe').appendChild(renderer.domElement);

    var materials = [
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('https://i.ibb.co/0BKqRHL/1.png') }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('https://i.ibb.co/BBYf3hF/2.png') }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('https://i.ibb.co/QX73yY4/3.png') }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('https://i.ibb.co/fXz9c87/4.png') }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('https://i.ibb.co/0XyswTh/5.png') }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('https://i.ibb.co/pnK1vTX/6.png') }),
    ];

    var geometry = new THREE.BoxGeometry(2, 2, 2);
    cube = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    scene.add(cube);

    camera.position.z = 5;
}

/** Pour calculer les rotations cibles de chaque face d'un dé, vous devez d'abord comprendre comment votre dé est orienté dans votre scène 3D. Les dés standards ont des faces opposées qui totalisent sept (1 opposé à 6, 2 opposé à 5, 3 opposé à 4).

 Pour simplifier, considérons que votre dé est positionné de sorte que lorsque la face "1" est en haut, les faces "2" et "4" sont sur les côtés (frontal et droit respectivement), et la face "3" est vers la caméra.

 Déterminer les Rotations Cibles
 Pour chaque face, vous devez déterminer les rotations autour des axes X et Y pour amener cette face vers le haut. Voici un exemple basé sur l'orientation standard du dé : **/
function calculerRotationCible(resultat) {
    var rotationCible = { x: 0, y: 0 };
    switch (resultat) {
        case 1: // Face 1 en haut (pas de rotation)
            rotationCible.x = 0;
            rotationCible.y = -Math.PI / 2;
            break;
        case 2: // Face 2 en haut (rotation autour de l'axe Y de 90 degrés)
            rotationCible.x = 0;
            rotationCible.y = Math.PI / 2;
            break;
        case 3: // Face 3 en haut (rotation autour de l'axe X de 90 degrés)
            rotationCible.x = Math.PI / 2;
            rotationCible.y = 0;
            break;
        case 4: // Face 4 en haut (rotation autour de l'axe X de -90 degrés)
            rotationCible.x = -Math.PI / 2;
            rotationCible.y = 0;
            break;
        case 5: // Face 5 en haut (rotation autour de l'axe Y de -90 degrés)
            rotationCible.x = 0;
            rotationCible.y = 0;
            break;
        case 6: // Face 6 en haut (rotation autour de l'axe X de 180 degrés)
            rotationCible.x = Math.PI;
            rotationCible.y = 0;
            break;
    }
    return rotationCible;
}


var cibleRotation;
var estEnCoursDeRalentissement = false;

function animateDe() {
    animationId = requestAnimationFrame(animateDe);

    if (estEnCoursDeRalentissement) {
        // Ralentir progressivement et ajuster la rotation vers la cible
        cube.rotation.x += (cibleRotation.x - cube.rotation.x) * 0.1;
        cube.rotation.y += (cibleRotation.y - cube.rotation.y) * 0.1;
        vitesseRotation *= ralentissement;

        // Arrêter l'animation une fois qu'elle est suffisamment lente
        if (vitesseRotation < 0.01) {
            cancelAnimationFrame(animationId);
        }
    } else {
        // Rotation normale
        cube.rotation.x += vitesseRotation;
        cube.rotation.y += vitesseRotation;
    }

    renderer.render(scene, camera);
}

function previsualiserDe() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }

    // Réinitialiser les paramètres d'animation pour une rotation lente
    vitesseRotation = 0.02; // Vitesse plus lente pour la prévisualisation
    ralentissement = 0.99;
    estEnCoursDeRalentissement = false;

    animateDe();
}

function lancerDe() {
    if (estDeEnCours) return;
    estDeEnCours = true;
    if (animationId) {
        cancelAnimationFrame(animationId);
    }

    var resultat = Math.floor(Math.random() * 6) + 1;
    cibleRotation = calculerRotationCible(resultat);

    // Réinitialiser les paramètres d'animation
    vitesseRotation = 0.1;
    ralentissement = 0.95;
    estEnCoursDeRalentissement = false;

    animateDe();

    // Commencer le ralentissement après un court délai
    setTimeout(function() {
        estEnCoursDeRalentissement = true;
    }, 1000); // Délai avant de commencer le ralentissement

    // Attendre la fin de l'animation pour afficher le résultat
    setTimeout(function() {
        estDeEnCours = false;
        document.getElementById("resultatDe").innerHTML = "Le dé montre : " + resultat;
    }, 2000); // Durée totale de l'animation
}


initDe();
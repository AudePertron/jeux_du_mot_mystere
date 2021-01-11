/* sélection des éléments de la page pour travailler avec */
var airDeJeu = document.getElementById("air_de_jeu")
//inputs contient tous les élements html de class 'aTrouver'
//inputs est un tableau qui contient plusieurs valeurs
//ici tous les inputs de class 'aTrouver'
var inputs = airDeJeu.getElementsByClassName("aTrouver")
var jeu = document.getElementById("jeu")
var message = document.getElementById("message")
var affichage = document.getElementById("affichage")
var fin = document.getElementById("fin")

/* déclaration des variables */
// message à afficher dans la <p id="message">
var solution = "Demandez un nouveau jeu"
//compter le nombre d'erreur. Pour dire perdu au bout de 7 erreurs
var etape = 0
//pour compter le nombre de bonne lettre et dire gagner au bon moment
var bravo = 0
//var mots = "garage"
//liste des mots à trouver, un est tiré au hasard
var mots=["svelte", "hacker", "bifide", "bonsai", "cheval"]

/* déclaration des fonctions */

//fonction pour récupérer le niveau de difficulté
function getNiveau(){
    var params = new URLSearchParams(document.location.search.substring(1))
    var niveau = params.get("niveau")
    return niveau
}

//fonction pour activer ou desactiver les champs de saisie
//ok=false
function desactiver(nodes, ok){
    //couleur de dégrisage
    var couleur = "#ffffff"

    //ok est vrai si il faut griser
    // si ok=false pas de if
    if(ok)
    {
        //couleur de grisage
        couleur = "#302535"
    }

    //si pas de if, alors couleur="#ffffff"

    //modifie le background_color des input text
    var style = "background-color: " + couleur

    //boucle pour modifier tous les inputs d'un coup
    //il y en 7 en tout
    //c'est quoi nodes ? tableau qui contient tous les inputs text
    //le for va de 0 à la taille maxi de nodes (nodes.length)
    for (var i = 0; i < nodes.length; i++) {
        //efface toutes les lettres dans les inputs text
        nodes[i].value = ""
        //applique le bon background color
        nodes[i].setAttribute("style", style)
        //bloque la saisie
        //disabled = false
        nodes[i].disabled = ok
    }
}

//fonction pour mettre à jour la page web lors d'une victoire
function gagner(nodes, solution){
    desactiver(nodes, true)
    message.innerHTML = solution
    message.setAttribute("style", "color: #7a4c81")
    affichage.src = "./public/gagne.png"
}

//fonction pour mettre à jour la page web lorsque le mot n'est pas trouvé
function perdre(nodes, solution){
    desactiver(nodes, true)
    message.innerHTML = solution
    affichage.src = "./public/jeu07.png"
    message.setAttribute("style", "color: #f9674d")    
}

/* logique de jeu */
var niveau = getNiveau()

//Liste de mots pour le niveau facile
document.getElementById("lettre6").hidden = true

//Liste de mots pour le niveau difficile
// ici on tire un mot de 7 pour le niveau difficile
if (niveau == 7)
{
    mots = ["absolue","butanol","cabotin","gabarie","piccolo"]
    document.getElementById("lettre6").hidden = false
}

//initialiser le jeu
//alert(jeu.innerHTML)
desactiver(inputs, true)
message.innerHTML = solution

/* évènements */

//Click sur le bouton 'nouveau jeu'
jeu.addEventListener("click", function(){
    //solution = mots
    var max = mots.length
    var indice = Math.floor(Math.random() * max)
    solution = mots[indice]

    //appel à la fonction desactiver. On lui passe en paramètres inputs et false
    //false valeur bool
    //du coup ok = 'false'
    //nodes = inputs
    desactiver(inputs, false)
    //
    affichage.src = "./public/jeu00.png"
    message.innerHTML = ""
    message.setAttribute("style", "color: #302535")
    bravo = 0
    etape = 0
})

//Click sur le bouton 'voir la solution'
fin.addEventListener("click", function(){
    perdre(inputs, solution)
})

//saisie dans un champs texte
for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("change",function(){
        var position = this.getAttribute("id").charAt(6)
        var saisie = this.value
        var lettre = solution.charAt(position)
        
        if(saisie.toLowerCase() == lettre.toLowerCase())
        {
            bravo++

            //c'est ici qu'on gère le niveau 7
            if (bravo == niveau)
            {
                gagner(inputs, solution)
            }

        }else{
            //etape = etape+1
            etape++
            //modifie le src de img
            //car la var affichage contient la balise img
            affichage.src = './public/jeu0'+etape+'.png'
            //à la première erreur, src = './public/jeu01.png'

            if(etape > 6){
                perdre(inputs, solution)
            }
        }
    })
}
// Variables globales
let lastId = 0

// On attend le chargement du document
window.onload = () => {
    let texte = document.querySelector("#texte")
    texte.addEventListener("keyup", verifEntree)

    let valid = document.querySelector("#valid")
    valid.addEventListener("click", ajoutMessage)
    setInterval(chargeMessages, 1000)
}

/**
 * Charge les derniers messages en Ajax et les insère dans la discussion
 */

function chargeMessages(){
    let xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = function(){
        if (this.readyState == 4){
            if(this.status == 200){
                let messages = JSON.parse(this.response)
                messages.reverse()
                let discussion = document.querySelector("#discussion")

                for(let message of messages){
                    let dateMessage = new Date(message.created_at)
                    discussion.innerHTML = `<p>${message.pseudo} : ${message.message} <br><span class="dateMess"> [${dateMessage.toLocaleString()}]</span></p>` + discussion.innerHTML
                    lastId = message.id
                }
            }else{
                let erreur = JSON.parse(this.response)
                alert(erreur.message)
            }
        }
    }
    xmlhttp.open("GET", "ajax/chargeMessages.php?lastId="+lastId)
    xmlhttp.send()
}


/**
 * Cette fonction vérifie si on a appuyé sur la touche entrée
 */
function verifEntree(e){
    if(e.key == "Enter"){
        ajoutMessage();
    }
}

/**
 * Cette fonction envoie le message en ajax à un fichier ajoutMessage.php
 */
function ajoutMessage(){
    let message = document.querySelector("#texte").value
    if(message != ""){
        let donnees = {}
        donnees["message"] = message
        let donneesJson = JSON.stringify(donnees)

        let xmlhttp = new XMLHttpRequest()

        xmlhttp.onreadystatechange = function(){
            if(this.readyState == 4){
                if(this.status == 201){
                    document.querySelector("#texte").value = ""
                }else{
                    let reponse = JSON.parse(this.response)
                    alert(reponse.message)
                }
            }
        }
        xmlhttp.open("POST", "ajax/ajoutMessage.php")

        xmlhttp.send(donneesJson)
    }
}
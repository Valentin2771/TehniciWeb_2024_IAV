//console.log(locals.catalog);
// console.log(arrObjElevi)

// Se sorteaza cu o functie parametru array-ul rezultat prin parsarea colectiei HTML cu clasa "elev"
function sortare (sens){
    let arrObjElevi = document.getElementsByClassName("elev");
    let arrWork = Array.from(arrObjElevi);
    //console.log(arrWork);
    arrWork.sort(function (a,b){
        let medie_a = parseFloat(a.getElementsByClassName("medie-note")[0].innerHTML);
        let medie_b = parseFloat(b.getElementsByClassName("medie-note")[0].innerHTML);
        if(medie_a == medie_b){
            let nume_a = a.getElementsByClassName("nume")[0].innerHTML;
            let nume_b = b.getElementsByClassName("nume")[0].innerHTML;
            return sens*nume_a.localeCompare(nume_b);
        }
        return sens*(medie_a - medie_b);
    });
    for(let iter of arrWork){
        iter.parentElement.appendChild(iter);
    }
    //console.log(arrObjElevi)
}

document.getElementById("btn-sortare").addEventListener("click", function(){
    let selectie = document.getElementById("sortare").value;
    if(selectie == "ascendent"){
        sortare(1);
    } else {
        sortare(-1);
    }
})

// Filtrare pe fragment de cuvant; articolele care nu satisfac cautarea primesc display:none

document.getElementById("btn-filtrare").addEventListener("click",function(){
    let fragment = document.getElementById("criteriu-filtrare").value.toLowerCase();
    let arrObjElevi = document.getElementsByClassName("elev");
    let arrWork = Array.from(arrObjElevi);
    //console.log(arrWork);
    for(let elm of arrWork){
        let nume = elm.getElementsByClassName("nume")[0].innerHTML.toLowerCase();
        let prenume = elm.getElementsByClassName("prenume")[0].innerHTML.toLowerCase();
        if(!prenume.includes(fragment) && !nume.includes(fragment)){
            elm.setAttribute("style", "display:none");
        }
    }
})

window.onkeydown= function(e){
    if (e.key == "+"){
        
        let arrObjElevi = document.getElementsByClassName("elev");
        let arrWork = Array(arrObjElevi);

        for (let elev of arrObjElevi){
            if(elev.style.display != "none")
            {
               let note_elev =  elev.getElementsByClassName("nota");
               for(let nota of note_elev){
                nota.innerHTML = 10;
               }
            }
        }
    }
}

// test event listener on change pt element de tip range

window.addEventListener("load", function(){

    document.getElementById("puncte").onchange = function(){
        document.getElementById("info-range").innerHTML = this.value;
    }
})



// window.onload = function(){
//     document.getElementById("puncte").onchange=function(){
//         // pt ca suntem intr-o metoda , putem folosi this pt a accesa instanta (care e inputul range)
//         document.getElementById("info-range").innerHTML= this.value;
//     }
// }

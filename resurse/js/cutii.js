console.log("hello");

// Filtrare pe optiunea selectata; articolele care nu satisfac cautarea primesc display:none

let myCallback1 = function(){

    console.log(document.getElementById("selector").value);
    let selectie = document.getElementById("selector").value;
    let secCutii = document.getElementsByTagName("section");
    for(let itr of secCutii){
        //console.log(itr.getElementsByClassName("input-pret-unitar")[0].value);
        itr.style.display = "none";
        let pretCurent = itr.getElementsByClassName("input-pret-unitar")[0].value;
        if(selectie == 'fmic'){
            if(pretCurent > 0 && pretCurent <= 5){
                itr.style.display="block";
            }

        } else if(selectie == 'mic'){
            if(pretCurent > 5 && pretCurent <= 10){
                itr.style.display="block";
            }

        } else if(selectie == 'mediu'){
            if(pretCurent > 10 && pretCurent <= 15){
                itr.style.display="block";
            }
        }else {
            if(pretCurent > 15 ){
                itr.style.display="block";
            }
        }
    }
}
document.getElementById("filtreaza").addEventListener("click", function(){
    setTimeout(myCallback1, 2000);

});
   

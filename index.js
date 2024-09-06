const express = require("express");
const fs= require('fs');

const path=require('path');
const sharp=require('sharp');
const sass=require('sass');
const ejs=require('ejs');

// pentru conectarea la serverul postgres
const {Client} = require('pg');
 
app= express();
console.log("Folder proiect", __dirname);
console.log("Cale fisier", __filename);
console.log("Director de lucru", process.cwd());

app.set("view engine","ejs");
 
app.use("/resurse", express.static(__dirname+"/resurse"));
app.use("/node_modules", express.static(__dirname+"/node_modules"));


var client = new Client({
    database: "tehniciweb1",
    user: "valentin",
    password: "postgres12sql27!!",
    host: "localhost",
    port: 5432
});

client.connect();

client.query("select * from produse", function(err, rez){
    if(err){
        console.log(err);
    } else {
        obGlobal.optiuniMeniu = rez.rows;
        // console.log(rez.rows);
    }
});
 

obGlobal = {
    obErori: null,
    obImagini: null,
    folderScss: path.join(__dirname, "resurse/scss"),
    folderCss: path.join(__dirname, "resurse/css"),
    folderBackup: path.join(__dirname, "backup")
}


let vect_foldere = ["temp", "backup"];

for(let folder of vect_foldere){
    let caleFolder = path.join(__dirname, folder);
    if(!fs.existsSync(caleFolder)){
        fs.mkdirSync(caleFolder);
    }
}

// -- vector cereri

app.get(["/", "/index", "/home"], function(req, res){
    //res.sendFile(path.join(__dirname, "../_ProiectTW_septembrie_2024/index.html"));
    //res.sendFile(__dirname+"/index.html");
    res.render("pagini/index", {ip: req.ip, imagini: obGlobal.obImagini.imagini});
});


// expresie regulata pentru id-uri concatenate de elevi

// let exp_reg_elevi = /\/elevi\?id=([1-9]+\d*\+)+([1-9]+\d*)+$/gi;

// app.get(exp_reg_elevi, function(req, res){
//    res.render("/pagini/elevi", {test:req.query})
// });

app.get("/elevi", function(req, res){
    // console.log("Afisez query:", req.query.id);
    let arr_ids = req.query.id?.split(' ');



    let conditieWhere = '';
    if(arr_ids?.length){
        conditieWhere = ' where id in (';
        for(let iter = 0; iter < arr_ids.length; iter++){
            if(iter != arr_ids.length - 1){
                conditieWhere += arr_ids[iter] +',';
            } else{
                conditieWhere += arr_ids[iter] +')';
            }
        } 
    }
    // console.log(conditieWhere);
    client.query("select * from elevi" + conditieWhere, function(err, rec){
        if(err){
            console.log(err)
        } else {
            
            console.log(rec.rows)
            res.render("pagini/elevi", {catalog: rec.rows})
        }
    })
})

app.get("/produse", function(req, res){
    client.query("select * from unnest(enum_range(null::categorie_principala))", function(err, rezCategorie){
        if(err){
            console.log(err);
        } else {
            let conditieWhere = "";
            if(req.query.tip)
                conditieWhere = ` where gen = '${req.query.tip}'`;

            client.query("select * from produse " + conditieWhere, function(err, rez){
                console.log(300);
                if(err){
                    console.log(err);
                    afisareEroare(res, 2);
                } else {
                    console.log(rez);
                    res.render("pagini/produse", {produse:rez.rows, optiuni:rezCategorie.rows});
                }
            })
        }
    });
});


app.get("/produs/:id", function(req, res){
    client.query(`select * from produse where id=${req.params.id}`, function(err, rez){
        if (err || rez.rowCount == 0){
            console.log(err);
            afisareEroare(res, 2);
        }
        else{
            res.render("pagini/produs", {prod: rez.rows[0]})
        }
    })
})



// app.get("/eroare", function(req, res){

//    /* res.render("pagini/eroare"); */
//    afisareEroare(res, 403);
// });

// app.get("/eroare", function(req, res){
//     res.render("pagini/eroare");
// });

// cerinta pagina despre

app.get("/despre", function(req, res){
    res.render("pagini/despre");
});

// cerinta favicon

app.get("/favicon.ico", function(req, res){
    res.sendFile(path.join(__dirname, "/resurse/imagini/ico/favicon.ico"));
});

// cerinta 17

let expr = /^\/resurse\/[a-zA-Z0-9_\/-]+$/;

app.get(expr, function(req, res){
    afisareEroare(res, 403);
});

// cerinta 18

app.get("/*.ejs", function(req, res){
    afisareEroare(res, 400);
})

// interceptare cereri catre resurse care nu pot fi gasite
app.get("/*", function(req, res){

    try{
        res.render("pagini" + req.url, function(err, rezHtml){
            if(err){
                if(err.message.startsWith("Failed to lookup view")){
                    afisareEroare(res, 404);
                    console.log("Nu a gasit pagina ", req.url);
                } else {
                    res.send(Html);
                }
            }
        });
    } catch(err1){
        if(err1.message.startsWith("Cannot find module")){
            afisareEroare(res, 404);
            console.log("Nu a gasit resursa ", req.url);
            return;
        }
        afisareEroare(res);
    }
    
});

// completare cale imagini erori

function initErori(){
    let continut = fs.readFileSync(path.join(__dirname, "resurse/json/erori.json")).toString("utf-8");

    obGlobal.obErori = JSON.parse(continut);

    console.log(obGlobal.obErori);
    // setare cale imagini eroare
    for (let eroare of obGlobal.obErori.info_erori){
        eroare.imagine = path.join("/", obGlobal.obErori.cale_baza, eroare.imagine);
    }
    obGlobal.obErori.eroare_default.imagine = path.join("/", obGlobal.obErori.cale_baza, obGlobal.obErori.eroare_default.imagine);  
}
initErori();

// galerie imagini

function initImagini(){
    let continut= fs.readFileSync(path.join(__dirname,"resurse/json/galerie.json")).toString("utf-8");

    obGlobal.obImagini=JSON.parse(continut);
    let vImagini=obGlobal.obImagini.imagini;

    let caleAbs=path.join(__dirname,obGlobal.obImagini.cale_galerie);
    let caleAbsMediu=path.join(__dirname,obGlobal.obImagini.cale_galerie, "mediu");
    if (!fs.existsSync(caleAbsMediu))
        fs.mkdirSync(caleAbsMediu);

    for (let imag of vImagini){
        [numeFis, ext]=imag.fisier.split(".");
        let caleFisAbs=path.join(caleAbs,imag.fisier);
        let caleFisMediuAbs=path.join(caleAbsMediu, numeFis+".webp");
        sharp(caleFisAbs).resize(300).toFile(caleFisMediuAbs);
        imag.fisier_mediu=path.join("/", obGlobal.obImagini.cale_galerie, "mediu",numeFis+".webp" )
        imag.fisier=path.join("/", obGlobal.obImagini.cale_galerie, imag.fisier )
        
    }
    console.log(obGlobal.obImagini);
}
initImagini();

function compileazaScss(caleScss, caleCss){
    if(!caleCss){
        let numeFisExt = path.basename(caleScss);
        let numeFis = numeFisExt.split(".")[0];
        caleCss = numeFis + ".css";
    }

    if(!path.isAbsolute(caleScss)){
        caleScss = path.join(obGlobal.folderScss, caleScss);
    }

    if(!path.isAbsolute(caleCss)){
        caleCss = path.join(obGlobal.folderCss, caleCss);
    }

    let caleBackup = path.join(obGlobal.folderBackup, "resurse/css");

    if(!fs.existsSync(caleBackup)){
        fs.mkdirSync(caleBackup, {recursive:true});
    }

    let numeFisCss = path.basename(caleCss);

    if(fs.existsSync(caleCss)){
        fs.copyFileSync(caleCss, path.join(obGlobal.folderBackup, "resurse/css", numeFisCss));
    }

    rez = sass.compile(caleScss, {"sourceMap": true});
    fs.writeFileSync(caleCss, rez.css);

}

vFisiere = fs.readdirSync(obGlobal.folderScss);

for(let numeFis of vFisiere){
    if(path.extname(numeFis) == ".scss"){
        compileazaScss(numeFis);
    }
}

fs.watch(obGlobal.folderScss, function(eveniment, numeFis){
    if(eveniment == "change" || eveniment == "rename"){
        let caleCompleta = path.join(obGlobal.folderScss, numeFis);
        if(fs.existsSync(caleCompleta)){
            compileazaScss(caleCompleta);
        }
    }
});


function afisareEroare(res, _identificator, _titlu, _text, _imagine){
    let eroare = obGlobal.obErori.info_erori.find(function(elem){
        return elem.identificator == _identificator; // find: primul elem din vector care satisface conditia opreste cautarea!
    }); // la final, eroare va avea valoarea undefined sau va fi setat la primul obiect gasit care satisface conditia

    if(!eroare)
        eroare = obGlobal.obErori.eroare_default;
    res.render("pagini/eroare", 
        {
            titlu: _titlu || eroare.titlu,
            text: _text || eroare.text,
            imagine: _imagine || eroare.imagine
 
        } // obiectul "locals"
    );
}


app.listen(8080);
console.log("Serverul a pornit");
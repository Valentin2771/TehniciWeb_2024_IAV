DROP TABLE IF EXISTS produse;
DROP TYPE IF EXISTS categorie_principala;
DROP TYPE IF EXISTS categorie_secundara;
DROP TYPE IF EXISTS categorie_tertiara;

CREATE TYPE categorie_principala as enum ('didactică', 'polițistă', 'sci-fi', 'literatură universală', 'știință');
CREATE TYPE categorie_secundara as enum ('nouă', 'bună', 'uzată');
CREATE TYPE categorie_tertiara as enum ('hardcover', 'paperback');

create table if not exists produse(
	id serial PRIMARY KEY,
	nume VARCHAR(200) NOT NULL,
	descriere TEXT,
	imagine VARCHAR(200) NOT NULL DEFAULT '/resurse/imagini/foto_produse/pixabay_carte_generica.jpg',
	gen categorie_principala DEFAULT 'literatură universală',
	stare categorie_secundara DEFAULT 'bună',
	pret numeric(5,2),
	numar_pagini INT,
	copertare categorie_tertiara DEFAULT 'paperback',
	editura VARCHAR(100) NOT NULL,
	autori VARCHAR[],
	format_digital BOOLEAN NOT NULL DEFAULT TRUE,
	isbn VARCHAR(17),
	an_aparitie INT,
	data_intrare TIMESTAMP DEFAULT current_timestamp
);

INSERT into produse (nume, descriere, imagine, gen, stare, pret, numar_pagini, copertare, editura, autori, format_digital, isbn, an_aparitie, data_intrare) VALUES

('Generoasele cercuri', 'Colecție de povestiri SF scrise de matematicianul și academicianul Gheorghe Păun, cunoscut publicului larg și pentru lucrările de popularizare a matematicii.', 'pixabay_carte_001.jpg', 'sci-fi', 'bună', 8.75, 163, 'paperback', 'Albatros', '{"Gheorghe Păun"}', FALSE, '973-24-0067-6', 1989, current_timestamp),

('Introducere în programarea orientată-obiect', 'Concepte fundamentale din perspectiva ingineriei software.', 'pixabay_carte_002.jpg', 'știință', 'bună', 7.92, 280, 'paperback', 'Polirom', '{"Mircea Cezar Preda", "Ana-Maria Mirea", "Dorina Lavinia Preda", "Constantin Teodorescu-Mihai"}', FALSE, '978-973-46-1629-9', 2010, current_timestamp),

('Dune', 'Primul volum al operei pe care contemporanii o cunosc, în general, prin intermediul superproducției cinematografice omonime. Epopeea lui Paul Atreides către putere și către cunoașterea sinelui are multe elemente comune cu operele non-sci-fi din perioada lui Dumas-tatăl.', 'pixabay_carte_003.jpg', 'sci-fi', 'bună', 100, 318, 'paperback', 'Nemira', '{"Frank Herbert"}', FALSE, '973-9144-01-2', 1992, current_timestamp),

('Informatică. Fundamentele programării', 'Culegere de probleme pentru clasa a IX. Ediție revăzută și adăugită.', 'pixabay_carte_004.jpg', 'știință', 
'bună', 19.90, 224, 'paperback', 'L&S Soft', '{"Dana Lica", "Mircea Pașoi"}', FALSE, '973-86022-9-7', 2006, current_timestamp),

('Bacalaureat 2019. Matematică', 'M_Științele Naturii. M_Tehnologic. Teme recapitulative. 40 de teste după modelul M.E.N.', 'pixabay_carte_005.jpg', 'didactică', 'bună', 28, 280, 'paperback', 'Paralela 45', '{"Mihai Monea", "Steluța Monea", "Ioan Șerdean", "Adrian Zanoschi"}', FALSE, '978-973-47-2793-3', 2018, current_timestamp),

('Here is the news', 'Limba engleză pentru jurnaliști. Volumul 2.', 'pixabay_carte_006.jpg', 'didactică', 'bună', 42, 288, 'paperback', 'ALL', '{"Barbara Otto", "Marcin Otto"}', FALSE, '973-9431-86-0', 2001, current_timestamp),

('Programare în C/C++ pentru liceu, volumul 2', 'Tehnici de programare', 'pixabay_carte_007.jpg', 'didactică', 'bună', 37.95, 286, 'paperback', 'Polirom', '{"Emanuela Cerchez", "Marinel Șerban"}', FALSE, '973-46-0092-3', 2005, current_timestamp),

('Omul din castelul înalt', 'Unul dintre cele mai apreciate romane ale autorului american Philip K. Dick. Cadrul acțiunii este creat de o istorie alternativă, în care Germania a câștigat Al Doilea Război Mondial.', 'pixabay_carte_008.jpg', 'sci-fi', 'bună', 45, 254, 'paperback', 'Nemira', '{"Philip K. Dick"}', FALSE, '973-569-090-x', 1995, current_timestamp),

('Sarabanda răposaților', 'Un roman polițist al prolificului autor francez San-Antonio (Frederick Dard) în care eroul omonim reușește să ducă până la capăt încă o misiune aparent imposibilă.', 'pixabay_carte_009.jpg', 'polițistă', 'bună', 12, 165, 'paperback', 'Forum', '{"San-Antonio"}', FALSE, '973-584-109-6', 1999, current_timestamp),

('Crime de mântuială', 'Colecție de povestiri polițiste a romancierului american Raymond Chandler.', 'pixabay_carte_010.jpg', 'polițistă', 'nouă', 28.80, 349, 'paperback', 'Nemira', '{"Raymond Chandler"}', FALSE, '968-606-579-909-7', 2014, current_timestamp),

('Vremea mânzului sec', 'Romanul de debut al scriitorului român contemporan Cristian Tudor Popescu.', 'pixabay_carte_011.jpg', 'literatură universală', 'bună', 10, 177, 'paperback', 'Polirom', '{"Cristian Tudor Popescu"}', FALSE, '973-683-129-9', 1998, current_timestamp),

('Un titlu stupid, în lipsa inspirației', 'Carte fictivă. Nu a fost încă scrisă și nu există garanții că va vedea vreodată lumina tiparului.', 'pixabay_carte_012.jpg', 'literatură universală', 'nouă', 123, 249, 'hardcover', 'Editura obscură', '{"John Doe"}', TRUE, NULL, 2003, current_timestamp),

('Un fragment de neant în vidul existențial', 'Volum epic. Cuprinderea sa este egalată doar de inconsistența sa.', 'pixabay_carte_013.jpg', 'literatură universală', 'bună', 76.43, 897, 'hardcover', 'Editura inexpugnabilă', '{"Jason Doe"}', TRUE, NULL, 2013, current_timestamp),

('Nimeni nu vrea să știe de nimeni', 'Roman postum, pus cap la cap de anturajul autorului pe baza notițelor descoperite absolut întâmplător, cu ocazia unei explozii la racordul de gaze.', 'pixabay_carte_generica.jpg', 'polițistă', 'nouă', 2.50, 167, 'paperback', 'Editura impermeabilă', '{"Jerome Doe"}', FALSE, NULL, 2024, current_timestamp),

('Dacă citești asta, ceva nu e în regulă', 'Operă inestimabilă cu baterii incluse. Impactul său asupra lumii contemporane face obiectul unor studii interdisciplinare.', 'pixabay_carte_generica.jpg', 'literatură universală', 'nouă', 0.99, 1234, 'hardcover', 'Editura impenetrabilă', '{"Jennifer Doe"}', TRUE, NULL, 2023, current_timestamp);

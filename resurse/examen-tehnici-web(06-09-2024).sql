DROP TABLE IF EXISTS cutii_ambalaj;
DROP TYPE IF EXISTS categ_culoare;

CREATE TYPE categ_culoare AS ENUM ('rosu', 'multicolor', 'galben', 'verde');

CREATE TABLE IF NOT EXISTS cutii_ambalaj (
	id serial PRIMARY KEY,
    pret_unitar NUMERIC(8,3) NOT NULL CHECK (pret_unitar>=0),
    culoare categ_culoare,
    dimensiuni VARCHAR(25),
    materiale VARCHAR [],
	data_adaugare TIMESTAMP DEFAULT current_timestamp
);


INSERT into cutii_ambalaj (pret_unitar, culoare, dimensiuni, materiale) VALUES
( 7.523, 'rosu', 'mediu', '{"plastic 30%","carton 50%","hartie 10%","altele 10%"}'),
( 4 , 'multicolor', 'mare', '{"carton 100%"}'),
(1.112 , 'galben','5cm,4cm,5cm', '{"plastic 90%","altele 10%"}'),
(7.4 , 'verde', '40cm,40cm,50cm', '{"plastic 30%","metal 40%", "sticla 30%"}'),
(3.4 , 'multicolor','5cm,8cm,4cm', '{"sticla 100%"}'),
(17.4 , 'multicolor', '14cm,20cm,24cm', '{"sticla 40%","lemn 30%","altele 30%"}'),
(12.32 , 'rosu', '14cm,20cm,24cm', '{"sticla 40%","lemn 30%","altele 30%"}'),
(11.52 , 'multicolor', 'mic', '{"plastic 40%","lemn 60%"}'),
(9.17 , 'rosu', '10cm,10cm,14cm', '{"carton 50%","lemn 30%","plastic 20%"}'),
(15 , 'verde', 'mediu', '{"carton 50%","plastic 30%","lemn 20%"}'),
(9.17 , 'galben', 'mare', '{"carton 50%","plastic 50%"}'),
(10.2 , 'rosu', 'mare', '{"carton 40%","lemn 20%","hartie 10%","altele 30%"}'),
(2.41 , 'verde', 'mic', '{"carton 10%","plastic 80%","lemn 10%"}'),
(8.37 , 'galben','8cm,40cm,50cm', '{"plastic 20%", "metal 40%","lemn 10%","altele 30%"}'),
(4 , 'rosu', 'mediu', '{"plastic 50%","carton 10%","hartie 10%","altele 30%"}'),
(7.3 , 'multicolor', 'mic', '{"lemn 100%"}'),
(14.23 ,'verde', 'mediu', '{"carton 50%","metal 30%","lemn 20%"}'),
(18.4 , 'galben','55cm,48cm,85cm', '{"lemn 20%","plastic 80%"}'),
(2.4 , 'rosu', '2cm,2cm,4cm', '{"metal 30%","sticla 40%","lemn 30%"}'),
(7.2 , 'rosu', 'mare','{"carton 100%"}');

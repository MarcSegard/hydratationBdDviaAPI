create or replace database projet_perso;
use projet_perso;

-- création des tables concernant l'utilisateur/ client
create or replace table role (id_role int auto_increment primary key, nom_role varchar(10));
insert into role (nom_role) values ("admin"),("moderator"), ("owner"), ("client");
create or replace table genre (id_genre int auto_increment primary key, nom_genre varchar(10));
create or replace table client (id_client int auto_increment primary key,
nom_client varchar(100),
prenom_client varchar(100),
pseudo_client varchar(20),
email_client varchar (50),
password_client text,
id_telephone_client int,
fk_genre int,
constraint fk_client_genre foreign key (fk_genre) references genre(id_genre),
fk_role int,
constraint fk_client_role foreign key (fk_role) references role(id_role)
);

-- creation des tables relatives à l'adresse
create or replace table pays (id_pays int auto_increment primary key, nom_pays varchar(256));
create or replace table ville (id_ville int auto_increment primary key, nom_ville varchar(256), code_postale varchar(10));

create or replace table adresse (id_adresse int auto_increment primary key,
numero_adresse int(4) not null, 
nom_rue_adresse varchar(256), 
numero_appartement varchar(10),
fk_pays int,
constraint fk_adresse_pays foreign key (fk_pays) references pays(id_pays),
fk_ville int,
constraint fk_adresse_ville foreign key (fk_ville) references ville(id_ville));

-- création de la table association client - adresse, cardinalités 0,N -- 0,N
create or replace table habite_adresse (id_habite_adresse int auto_increment primary key, id_client int, id_adresse int); 
alter table habite_adresse add constraint fk_habite_client foreign key (id_adresse) references adresse(id_adresse);
alter table habite_adresse add constraint fk_habite_adresse foreign key (id_client) references client(id_client);

-- création de la table numero de téléphone
create or replace table numero_telephone (id_numero_telephone int auto_increment primary key, numero_telephone varchar(25), fk_client int,  fk_type_tel int);
create or replace table type_numero_telephone (id_type_numero_telephone int auto_increment primary key, nom_type_telephone varchar (30));

-- création des clés étrangères concernant le numéro de téléphone et le client
alter table numero_telephone add constraint foreign key (fk_client) references client(id_client);
alter table numero_telephone add constraint foreign key (fk_type_tel) references type_numero_telephone(id_type_numero_telephone);

insert into type_numero_telephone (nom_type_telephone) values 
("professionnel"),
("personnel");


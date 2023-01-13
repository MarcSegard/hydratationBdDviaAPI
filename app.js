import { createConnection } from "mysql2";
import axios from "axios";

const regions_API_encoded = [
  "%C3%8Ele-de-France",
  "Grand+Est",
  "Nouvelle-Aquitaine",
  "Occitanie",
  "Auvergne-Rh%C3%B4ne-Alpes",
  "Bourgogne-Franche-Comt%C3%A9",
  "Normandie",
  "Centre-Val+de+Loire",
  "Pays+de+la+Loire",
  "Bretagne",
  "Provence-Alpes-C%C3%B4te+d%27Azur",
  "Corse",
  "Collectivit%C3%A9s+d%27outre-mer",
  "Guadeloupe",
  "Martinique",
  "Mayotte",
  "Guyane",
  "La+R%C3%A9union",
  "Hauts-de-France",
];

const db = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "projet_perso",
});
/************************************************************  Exemple de connection ****************************
// db.connect(function (err) {
//   if (err) throw err;
//   console.log("Connecté à la base de données MySQL!");
//   db.query(
//     'select enom as "Nom employé", dnom as "Nom département", dateemb as "Date d\'embauche" from employes \
//     inner join departements on employes.dno=departements.dno where dateemb in \
//     (select dateemb from employes  inner join departements on employes.dno=departements.dno where dnom="Commercial" \
//     or dnom="Développement" group by employes.dateemb having count(*) > 1) and dnom!="Développement"',
//     function (err, result) {
//       if (err) throw err;
//       console.log(result);
//     }
//   );
// });
*/

regions_API_encoded.forEach((region) => {
  axios
    .get(
      `https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-referentiel-geographique&q=&rows=10000&facet=regrgp_nom&facet=reg_nom&facet=reg_nom_old&facet=aca_nom&facet=dep_nom&facet=com_code&facet=uucr_nom&refine.reg_nom=${region}`
    )
    .then((response) => {
      db.connect(function (err) {
        if (err) throw err;
        response["data"]["records"].forEach((element) => {
          db.query(
            `insert into ville (nom_ville, code_postale) values ("${element["fields"]["com_nom"]}", "${element["fields"]["com_code"]}");`,
            function (err, result) {
              if (err) throw err;
              console.log(result);
            }
          );
          console.log(
            `Nom de la commune : ${element["fields"]["com_nom"]}, \tcode postale de la commune ${element["fields"]["com_code"]}`
          );
          //console.log(element["fields"]);
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

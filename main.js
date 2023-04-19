const XLSX = require('xlsx');
const rdf = require('rdflib');

const workbook = XLSX.readFile('file.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet);

const ESSEC = rdf.sym('https://www.essec.edu/fr/');
const FOAF = rdf.Namespace('http://xmlns.com/foaf/0.1/');
const VCARD = rdf.Namespace('http://www.w3.org/2001/vcard-rdf/3.0#');
const GEO = rdf.Namespace('http://www.w3.org/2003/01/geo/wgs84_pos#');
const graph = rdf.graph();

rows.forEach(row => {
  graph.add(ESSEC, FOAF('name'), rdf.literal(row['uo_lib']));
  graph.add(ESSEC, FOAF('nick'), rdf.literal(row['sigle']));
  graph.add(ESSEC, FOAF('type'), FOAF(row['type_d_etablissement']));
  graph.add(ESSEC, FOAF('homepage'), rdf.sym(row['url']));
  graph.add(ESSEC, FOAF('isPrimaryTopicOf'), rdf.sym(row['element_wikidata']));
  graph.add(ESSEC, FOAF('phone'), rdf.literal(row['numero_telephone_uai']));
  graph.add(ESSEC, FOAF('status'), rdf.literal(row['statut_juridique_long']));
  graph.add(ESSEC, FOAF('membershipClass'), rdf.literal(row['inscrits_2017']));

  const address = rdf.blankNode();
  graph.add(ESSEC, VCARD('adr'), address);
  graph.add(address, VCARD('locality'), rdf.literal(row['com_nom']));
  graph.add(address, VCARD('region'), rdf.literal(['reg_nom']));
  graph.add(address, VCARD('postal-code'), rdf.literal(['com_code']));
  graph.add(address, VCARD('street-address'), rdf.literal(['adresse_uai']));
  graph.add(address, VCARD('label'), rdf.literal(['uo_lib'], " ",['adresse_uai']," ",['com_code'], " ", row['com_nom']," ",['aca_nom'],['reg_nom']));

  graph.add(ESSEC, FOAF('uniqueID'), rdf.literal(['uai']));
  graph.add(ESSEC, FOAF('siret'), rdf.literal(['siret']));
  graph.add(ESSEC, FOAF('creation'), rdf.literal(['date_creation']));
  graph.add(ESSEC, FOAF('sector'), rdf.literal(['secteur_d_etablissement']));
 
});




const XLSX = require('xlsx');
const rdf = require('rdf');
const N3 = require('n3');

// Charge le fichier Excel
const workbook = XLSX.readFile('votre_fichier.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

// Créer un graphe RDF
const graph = new rdf.Graph();

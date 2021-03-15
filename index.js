//Appena l'utente clicca sul pulsante, il gestoreAnni mostra il resto della pagina e viene subito riempito lo span box Scommessa, che dopo farà la "cronaca" della partita.
//il gestoreAnni ha anche un contaclick. Quando il contaclick è >= 1, interagire con il pulsante porta a diversi "easter egg", fra cui l'acquisizione di dadi truccati!
//Se l'utente è molto insistente e continua a cliccare, gli vengono tolti i dadi truccati, quasi tutti i soldi e il boolean "insistente" viene settato a true.

function gestoreAnni() {
	try{		
		if (giocoFinito == false) {
			if (click < 1) {
				scriviMessaggio(nodoMessaggioScommessa, "Fate il vostro gioco!");	
				if (nodoStopAnni.style.display === "none") {
					nodoStopAnni.style.display = "block";
				} else {
					nodoStopAnni.style.display = "none";
				};
			} if (click == 4) {
				scriviMessaggio(nodoMessaggioAnni, "Ho capito, hai almeno 18 anni.")
			} if (click == 6) {
				scriviMessaggio(nodoMessaggioAnni, "HO CAPITO! Basta cliccare!");
			} if (click == 8) {
				scriviMessaggio(nodoMessaggioAnni, "B A S T A!");
			} if (click == 10) {
				scriviMessaggio(nodoMessaggioAnni, "Smetto di risponderti.");
			} if (click == 14) {
				scriviMessaggio(nodoMessaggioAnni, "Non ti arrendi mai, eh?");
			} if (click == 20) {
				truccato = true;
				diFila = false;
				scriviMessaggio(nodoMessaggioAnni, "Ok, eccoti dei dadi truccati. Ora lasciami in pace.");
			} if (click == 22) {
				scriviMessaggio(nodoMessaggioAnni, "Usa quei dadi, ma VATTENE!");	
			} if (click == 25) {
				scriviMessaggio(nodoMessaggioAnni, "Cos'altro vuoi da me?");	
			} if (click == 35) {
				scriviMessaggio(nodoMessaggioAnni, "Se clicchi ancora finisce male.");	
			} if (click == 36) {
				scriviMessaggio(nodoMessaggioAnni, "Mi riprendo i miei dadi.");
			} if ((click == 37)  && (GSoldi > 1)) {
				scriviMessaggio(nodoMessaggioAnni, "E gran parte dei tuoi soldi.");
			} if (click == 38) {
				truccato = false;
				insistente = true;
				if (GSoldi > 100) {
					GSoldi = 10;
				} else if ((GSoldi < 100) && (GSoldi > 1)) {
					GSoldi = 1
				};
				nodoSoldiG.value = GSoldi + "€";
				scriviMessaggio(nodoMessaggioAnni, "Ti avevo avvisato. Addio.");
			};		
			click++;
		};
	} catch ( e ){
		alert ("gestoreAnni" + e);
	};
};

//Il gestoreLancio si occupa del lancio dei dadi e dei risultati, tenendo conto di diverse casistiche: l'utente può avere dadi truccati, può ottenere il "Bonus Dadi", può non avere abbastanza soldi per scommettere, può finire in bancarotta ecc.
//A ogni lancio lo span box Scommessa viene aggiornato con la "cronaca" della partita. È anche usato per messaggi di errore, se l'utente non scommette un valore valido.
//Lo spanbox Anni viene aggiornato se l'utente perde o vince con il boolean "insistente" true, continuando il "dialogo" del gestoreAnni.
//Infine la variabile giocoFinito blocca il gioco se == true.

function gestoreLancio(){
	try{
		if (giocoFinito == false) {
			scommessa = +nodoScommessa.value;
			if ((Number.isInteger(scommessa) == false)) {
				scriviMessaggio(nodoMessaggioScommessa, "Inserisci un numero.");
			} else if (scommessa > GSoldi) {
				scriviMessaggio(nodoMessaggioScommessa, "Non hai abbastanza soldi!");
			} else if (scommessa < 1) {
				scriviMessaggio(nodoMessaggioScommessa, "Valore non valido.");
			} else {
				if (truccato == false) {
					GDado1 = random();
					GDado2 = random();
				} else {
					GDado1 = 6;
					GDado2 = 6;
				};
		
				nodoDado1G.value = GDado1;
				nodoDado2G.value = GDado2;
				GTot = GDado1 + GDado2;
				nodoTotG.value = GTot;

				ADado1 = random();
				ADado2 = random();
				nodoDado1A.value = ADado1;
				nodoDado2A.value = ADado2;
				ATot = ADado1 + ADado2;
				nodoTotA.value = ATot;
			
				if (GTot > ATot) {
					GSoldi += scommessa*2;
					ASoldi -= scommessa*2;
					vinte++;
					diFila++;
					if (GTot == 12) {
						if (diFila > 5 && truccato == true) {
								if (diFila > 10) {
									giocoFinito = true;
									GSoldi = 0;
									scriviMessaggio(nodoMessaggioScommessa, "Sei un baro. Vattene!");
									scriviMessaggio(nodoMessaggioAnni, "Hai esagerato...");
								} else {	
									scriviMessaggio(nodoMessaggioScommessa, "Ancora? Non starai barando?");
								};
						} else {
							scriviMessaggio(nodoMessaggioScommessa, "12! Tiro perfetto!");
						};
					} else if ((GDado1 > ADado1) && (GDado2 > ADado2)) {
						GSoldi += Math.floor(scommessa / 4)
						scriviMessaggio(nodoMessaggioScommessa, "Bonus dadi per te");
					} else if (diFila > 1) {
						scriviMessaggio(nodoMessaggioScommessa, diFila + " vittorie di fila!");					
					} else {
						scriviMessaggio(nodoMessaggioScommessa, "Vinte: " + vinte + " Perse: " + perse);
					};					
				} else if (ATot > GTot) {
					GSoldi -= scommessa;
					ASoldi += scommessa;
					perse++;
					diFila = 0;
					if ((ADado1 > GDado1) && (ADado2 > GDado2)) {
						ASoldi += Math.floor(scommessa / 4)
						scriviMessaggio(nodoMessaggioScommessa, "Bonus dadi per Dadone");
					} else {
						scriviMessaggio(nodoMessaggioScommessa, "Vinte: " + vinte + " Perse: " + perse);
					};
				} else if (ATot == GTot && GTot != 12) {
					diFila = 0;
					scriviMessaggio(nodoMessaggioScommessa, "Parità!");
				};
				
				if (GSoldi == 0 && truccato == false) {
					giocoFinito = true;
					scriviMessaggio(nodoMessaggioScommessa, "Sei in bancarotta!");
					if (insistente == true) {
						scriviMessaggio(nodoMessaggioAnni, "Hai avuto quel che ti meritavi!");
					};
				} else if (ASoldi < 1) {
					giocoFinito = true;
					scriviMessaggio(nodoMessaggioScommessa, "Sei il nuovo Campione!");
					if (insistente == true) {
						scriviMessaggio(nodoMessaggioAnni, "Incredibile! Sei fastidioso, ma un vero Campione!");
					} else if (truccato == true) {
						scriviMessaggio(nodoMessaggioAnni, "Be', facile con quei dadi...");
					};
				};
				nodoSoldiG.value = GSoldi + "€";
				nodoSoldiA.value = ASoldi + "€";
			};
		} else {
			scriviMessaggio(nodoMessaggioScommessa, "Il gioco è finito!");	
		};
	} catch ( e ){
		alert ("gestoreLancio" + e);
	};
};

//Il gestoreLancio si appoggia a questa funzione per calcolare i numeri casuali dei dadi.
function random () {
	try {
		rn = Math.floor((Math.random() * 6) + 1);
		return rn;
	} catch ( e ) {
		alert ("random" + e);
	};
}

//Funzione scriviMessaggio, presa dalla dispensa.
/**/function scriviMessaggio (nodo, messaggio) {
/**/	var nodoTesto = document.createTextNode(messaggio);
/**/	nodo.replaceChild(nodoTesto, nodo.firstChild);
/**/};
	
var nodoSoldiG;
var nodoScommessa;
var nodoDado1G;
var nodoDado2G;
var nodoTotG;	
var nodoSoldiA;
var nodoDado1A;
var nodoDado2A;
var nodoTotA;
var nodoStopAnni;

var nodoMessaggioAnni;
var nodoMessaggioScommessa;

var scommessa;
var GDado1;
var GDado2;
var GTot;
var GSoldi;
var ADado1;
var ADado2;
var ATot;
var ASoldi;

var click;
var vinte;
var perse;
var truccato;
var diFila;
var giocoFinito;

function gestoreLoad (){
	try{
		nodoSoldiG="";
		nodoScommessa="";
		nodoLancia="";
		nodoDado1G="";
		nodoDado2G="";
		nodoTotG="";
		nodoDado1A="";
		nodoDado2A="";
		nodoTotA="";
		nodoSoldiA="";
		nodoAnni="";
		
		nodoAnni = document.getElementById("Anni");
		nodoLancia = document.getElementById("Lancia");
		nodoDado1G = document.getElementById("Dado1G");
		nodoDado2G = document.getElementById("Dado2G");
		nodoTotG = document.getElementById("TotG");
		nodoSoldiG = document.getElementById("SoldiG");
		nodoSoldiA = document.getElementById("SoldiA");
		nodoDado1A = document.getElementById("Dado1A");
		nodoDado2A = document.getElementById("Dado2A");
		nodoTotA = document.getElementById("TotA");
		nodoScommessa = document.getElementById("scommessa");
		nodoStopAnni = document.getElementById("StopAnni");	

		nodoMessaggioAnni = document.getElementById("MessaggioAnni");	
		var nodoTesto1 = document.createTextNode("");
		nodoMessaggioAnni.appendChild(nodoTesto1);	

		nodoMessaggioScommessa = document.getElementById("MessaggioScommessa");	
		var nodoTesto2 = document.createTextNode("");
		nodoMessaggioScommessa.appendChild(nodoTesto2);			
		
		nodoLancia.onclick = gestoreLancio;
		nodoAnni.onclick = gestoreAnni;

		vinte = 0;
		perse = 0;
		click = 0;	
		diFila = 0;
		ASoldi = 15000;	
		GSoldi = 10000;		
		truccato = false;
		insistente = false;
		giocoFinito = false;
		nodoStopAnni.style.display = 'none';
		
	} catch ( e ){
		alert ("gestoreLoad" + e);
	};
};

window.onload = gestoreLoad;
var itemModify = false; // Empeche le deplacement des Items lors de la modification.
var debugMouse = false; // Etat du debug de la souris
var moreSettings = false; // Affiche plus d'options dans les reglages

window.onload = function() {
	loadItem("task", 'taskTableCell');
	loadItem("note", 'noteTableCell');
	detectSubmit();
	loadPreferences();
	loadTest();
}

// Quand on clique sur le bouton de la date :
function buttonDateClick() {
	
	// Inversion de la valeur + affichage
	if (localStorage.getItem("showDate") == 0)	localStorage.setItem("showDate", 1);
	else localStorage.setItem("showDate", 0);		
	showDate(localStorage.getItem("showDate"));
}

// Affiche la date dans la barre de menu
function showDate(Active) {
	if (Active == 1)
		{
			var today = new Date();
			var day = today.getDate();
			var month = today.getMonth() + 1;
			var year = today.getFullYear();
			var today = day + ' / ' + month + ' / ' + year;
			document.getElementById("btnDateClicked").innerHTML = today;
		}
	else document.getElementById("btnDateClicked").innerHTML = "";
}

// Qnand on clique sur le bouton du mode sombre :
function buttonDarkModeClick() {
	
	// Inversion de la valeur + affichage
	if (localStorage.getItem("darkMode") == 0) localStorage.setItem("darkMode", 1);
	else localStorage.setItem("darkMode", 0);
	darkMode(localStorage.getItem("darkMode"));
}

// Mode Sombre
// Au lieu de modifier ici chaque elements, ajouter un attribut vers un css
//##########################################################################
function darkMode(Active) {
	
	document.body.style.webkitTransition = '.4s';
	document.body.style.transition = '.4s';	
	
	if (Active == 1)
		{
			document.body.style.backgroundColor = "rgba(9,9,9,0.85)";
			document.querySelectorAll(".topnav").forEach(element =>
			element.style.backgroundColor = "#FFF" );
			
			document.querySelectorAll(".topnav").forEach(element =>
			element.style.backgroundColor = "#FFF" );
			var a ;
		}
	else
		{
			document.body.style.backgroundColor = "rgba(255,255,255,1)";
			document.querySelectorAll(".topnav").forEach(element =>
			element.removeAttribute("style"));
		}
		
}
//##########################################################################

// Chargement des preferences défini dans les reglages :
function loadPreferences() {
	
	// Afficher la date :
	if (localStorage.getItem("showDate") === null )	localStorage.setItem("showDate", 0);
	showDate(localStorage.getItem("showDate"));
		
	// Mode sombre :
	if (localStorage.getItem("darkMode") === null )	localStorage.setItem("darkMode", 0);
	darkMode(localStorage.getItem("darkMode"));
	
	// Chargement des raccourci
	if (localStorage.getItem("shortcutCounter") !== null )
		{
			// On crée alors les raccourci :
			var numberOfShortcut = Number(localStorage.getItem("shortcutCounter"));
			
			// Tableau des raccourci
			var shortcutTab = document.createElement("ul");
			shortcutTab.setAttribute("id",'shortcutTab');
			shortcutTab.classList.add("tableau-raccourci");
			document.getElementById("topBar").appendChild(shortcutTab);
			
			for (var i = 1; i < numberOfShortcut+1; i++) 
				{
					var shortcut = document.createElement("li");
					shortcut.setAttribute("id",'shortcut'+i);
					shortcut.classList.add("shortcut-topnav");
					shortcut.innerHTML = localStorage.getItem("shortcutT"+i);
					shortcut.href = localStorage.getItem("shortcutL"+i);
					document.getElementById("shortcutTab").appendChild(shortcut);
				}
		}
	// Désactive le menu deroulant du clique droit sur la barre de navigation	
	document.getElementById("topBar").addEventListener("contextmenu", e => e.preventDefault());
}

function reglages() {
	
	// Si le neud n'existe pas, on le crée :
	reglageNode = document.getElementById("reglages");
	if (!reglageNode) {
		
		// Noeud principal :
		var reglageNode = document.createElement("div");
		reglageNode.classList.add("reglagesMenu");
		reglageNode.setAttribute("id", "reglages");
		
		// Ajout d'un selecteur de couleur pour les taches : 
		var colorTask = document.createElement("a");
		colorTask.classList.add("reglage-content");
		colorTask.innerHTML = "Couleur des tâches : ";
		var input = document.createElement("input");
		input.setAttribute("type", "color");
		input.value = "#3BF7A2"; // Couleur par default taches ancien : #00FF7F
		input.classList.add("colorThemeSelector");
		input.setAttribute("id", "colorThemeSelector1");
		colorTask.appendChild(input);
		
		// Ajout d'un selecteur de couleur pour les notes : 
		var colorNote = document.createElement("a");
		colorNote.classList.add("reglage-content");
		colorNote.innerHTML = "Couleur des notes : ";
		var input = document.createElement("input");
		input.setAttribute("type", "color");
		input.value = "#4BE0FA"; // Couleur par default notes ancien : #23FFC4
		input.classList.add("colorThemeSelector");
		input.setAttribute("id", "colorThemeSelector2");
		colorNote.appendChild(input);
		
		// Afficher la date dans la top-bar
		var dateActive = document.createElement("a");
		dateActive.classList.add("reglage-content");
		dateActive.innerHTML = "Afficher la date :";
		var switcher = document.createElement("label");
		switcher.classList.add("switch");
		var checkInput = document.createElement("input");
		checkInput.setAttribute("type", "checkbox");
		if (localStorage.getItem("showDate") == 1) checkInput.checked = true;
		checkInput.setAttribute("onclick", 'buttonDateClick(this)');
		var slideButton = document.createElement("div");
		slideButton.classList.add("slideButton");
		switcher.appendChild(checkInput);
		switcher.appendChild(slideButton);
		dateActive.appendChild(switcher);
		
		if (moreSettings) // Options supplémentaires (commande requise)
		{
			// DarkMode
			var darkModeActive = document.createElement("a");
			darkModeActive.classList.add("reglage-content");
			darkModeActive.innerHTML = "DarkMode";
			var switcher = document.createElement("label");
			switcher.classList.add("switch");
			var checkInput = document.createElement("input");
			checkInput.setAttribute("type", "checkbox");
			if (localStorage.getItem("darkMode") == 1) checkInput.checked = true;
			checkInput.setAttribute("onclick", 'buttonDarkModeClick(this)');
			var slideButton = document.createElement("div");
			slideButton.classList.add("slideButton");
			switcher.appendChild(checkInput);
			switcher.appendChild(slideButton);
			darkModeActive.appendChild(switcher);
			
			// Ajouter un raccourci dans la barre de navigation
			// Bloquer la fonction si y'en a trop
			if (localStorage.getItem("shortcutCounter") === null )
				{
					// On crée alors une variable contenant le nombre d'item du meme type 0 :
					localStorage.setItem("shortcutCounter", 0);
				}
			
			var shortcutCounter = localStorage.getItem("shortcutCounter");
			if (shortcutCounter < 5)
			{
				var addShortcut = document.createElement("a");
				addShortcut.classList.add("reglage-content");
				addShortcut.innerHTML = "Raccourci de navigation : ";
				var addShortcutBtn = document.createElement("a");
				addShortcutBtn.innerHTML = "Ajouter";
				addShortcutBtn.classList.add("button");
				addShortcutBtn.setAttribute("onclick", 'addShortcutBtnClick(this)');
				addShortcut.appendChild(addShortcutBtn);
			}
			
		}
		
		//#########################################
		var reglageTitle = document.createElement("a");
		reglageTitle.innerHTML = "Reglages";
		reglageNode.appendChild(reglageTitle);
		//#########################################
		
		// Création des bouttons "OK" et "Annuler" : 
		var endButton = document.createElement("div");
		endButton.classList.add("reglages-button");
		
		var dropbtnOK = document.createElement("a");
		dropbtnOK.classList.add("button");
		dropbtnOK.innerHTML = "OK";
		dropbtnOK.setAttribute("onclick", 'buttonOKSettingsClick(this)');
		endButton.appendChild(dropbtnOK);
	
		var dropbtnAnnuler = document.createElement("a");
		dropbtnAnnuler.classList.add("button");
		dropbtnAnnuler.innerHTML = "Annuler";
		dropbtnAnnuler.setAttribute("onclick", 'buttonAnnulerSettingsClick(this)');
		endButton.appendChild(dropbtnAnnuler);
		
		// On ajoute le contenue au noeud :
		reglageNode.appendChild(colorTask);
		reglageNode.appendChild(colorNote);
		reglageNode.appendChild(dateActive);
		
		if (moreSettings)
			{
				reglageNode.appendChild(darkModeActive);
				// Ajouter des raccourci dans la barre de navigation
				if (shortcutCounter < 5) reglageNode.appendChild(addShortcut);
			}
		
		reglageNode.appendChild(endButton);
		
		// Griser l'arriere plan + ajout des reglages :
		greyScreen();
		document.body.appendChild(reglageNode);
		
		//	DarkMode
		//  Orange Web #FCA311
		//	document.body.style.backgroundColor = "rgba(10,10,10,0.8)";
		//	item rgb(115,253,2); item2 rgb(36,215,253);
	}
}

function greyScreen()
{
	var screen = document.createElement("div");
	screen.setAttribute("id", "greyScreen");
	screen.classList.add("greyScreen");
	document.body.appendChild(screen);
}

function removeGreyScreen()
{
	rm = document.getElementById("greyScreen");
	rm.parentElement.removeChild(rm);
}

function addShortcutBtnClick(thisNode)
{
	// Noeud principal :
	var shortcutNode = document.createElement("div");
	shortcutNode.classList.add("reglagesMenu");
	shortcutNode.setAttribute("id", "shortcut");
	shortcutNode.innerHTML = "Ajout d'un raccourci";
		
	// Demander le nom du raccourci et le lien
	var shortcutName = document.createElement("a");
	shortcutName.classList.add("reglage-content");
	shortcutName.style.marginTop = "2em";
	shortcutName.innerHTML = "Nom du raccourci :";
	var shortcutNameText = document.createElement("input");
	shortcutNameText.classList.add("input");
	shortcutNameText.setAttribute("id", "shortcutName");
	var shortcutLink = document.createElement("a");
	shortcutLink.classList.add("reglage-content");
	shortcutLink.innerHTML = "Lien :";
	var shortcutLinkText = document.createElement("input");
	shortcutLinkText.setAttribute("id", "shortcutLink");

	// Création des bouttons "OK" et "Annuler" : 
	var endButton = document.createElement("div");
	endButton.classList.add("reglages-button");
	
	var dropbtnOK = document.createElement("a");
	dropbtnOK.classList.add("button");
	dropbtnOK.innerHTML = "OK";
	dropbtnOK.setAttribute("onclick", 'buttonOKShortcutClick(this)');
	endButton.appendChild(dropbtnOK);
	
	var dropbtnAnnuler = document.createElement("a");
	dropbtnAnnuler.classList.add("button");
	dropbtnAnnuler.innerHTML = "Annuler";
	dropbtnAnnuler.setAttribute("onclick", 'buttonAnnulerShortcutClick(this)');
	endButton.appendChild(dropbtnAnnuler);
		
	shortcutName.appendChild(shortcutNameText);
	shortcutLink.appendChild(shortcutLinkText);
	shortcutNode.appendChild(shortcutName);
	shortcutNode.appendChild(shortcutLink);
	shortcutNode.appendChild(endButton);
	document.body.appendChild(shortcutNode);	
}

function buttonOKSettingsClick(thisNode)
{
	// Recuperation des paramètres
	var tColor = document.getElementById("colorThemeSelector1").value;
	var nColor = document.getElementById("colorThemeSelector2").value;
	
	// Pour toutes les taches :
	var counterName = localItemType('task').itemTypeCounter;
	var numberOfItem = Number(localStorage.getItem(counterName));
	
	for (var i = 0; i < numberOfItem+1; i++) 
		{
			document.getElementById("task"+i).style.backgroundColor = tColor;
		}
	
	localStorage.setItem("tColor", tColor);
	
	// Pour toutes les notes :
	var counterName = localItemType('note').itemTypeCounter;
	var numberOfItem = Number(localStorage.getItem(counterName));
	
	for (var i = 0; i < numberOfItem+1; i++) 
		{
			document.getElementById("note"+i).style.backgroundColor = nColor;
		}
	
	localStorage.setItem("nColor", nColor);
	
	// Une fois fini, on supprime le noeud:
	buttonAnnulerSettingsClick(thisNode);
}

function buttonOKShortcutClick(thisNode)
{
	// Recuperation des paramètres
	var shortcutNameText = document.getElementById("shortcutName").value;
	var shortcutLinkText = document.getElementById("shortcutLink").value;
	
	if (shortcutNameText.length > 15)
	{
		alert("Erreur trop de characteres (<= 15) ");
		exit();
	}
	
	// On l'incrémente le compteur de 1 :
	localStorage.setItem("shortcutCounter", Number(localStorage.getItem("shortcutCounter")) +1);
	
	var nameOfStorageShortcutText = "shortcutT" +localStorage.getItem("shortcutCounter");
	var nameOfStorageShortcutLink = "shortcutL" +localStorage.getItem("shortcutCounter");
	localStorage.setItem(nameOfStorageShortcutText, shortcutNameText);
	localStorage.setItem(nameOfStorageShortcutLink, shortcutLinkText);
	
	// Rechargement de la partie preference + sortie des reglages.
	loadPreferences();
	buttonAnnulerShortcutClick(thisNode);
	buttonAnnulerSettingsClick(thisNode);
}

function buttonAnnulerSettingsClick(thisNode)
{
	/*** Cette fonction annule les modifications apportées au réglages ***/
	// On supprime le noeud reglages :
	var rm = document.getElementById("reglages");
	rm.parentElement.removeChild(rm);
	// On retire le greyScreen :
	removeGreyScreen();
}

function buttonAnnulerShortcutClick(thisNode)
{
	/*** Cette fonction annule l'ajout d'un raccourci ***/
	// On supprime le noeud shortcut :
	var rm = document.getElementById("shortcut");
	rm.parentElement.removeChild(rm);
}


function testbar() {
	
	var value = document.getElementById("testbar").value;
	document.getElementById("testbar").value ="";
	if (value == "debugMouse") debugMouse = true
	else if (value == "moreSettings") moreSettings = true;
	else if (value == "overflow:hidden")
	{
		document.documentElement.style.overflow = 'hidden';
	}
	else if (value == "-i") 
	{
		alert("Informations:\ndebugMouse -> Affiche le numéro du bouton de la souris dans la barre de navigation\noverflow:hidden -> Enlève l'overflow de la page(Rend la page K.O)\nAttention : se mefier de l'user stylesheet du navigateur !\nPlus de reglages (avancé) : moreSettings");
	}
}

function loadTest(){
	
	var entertest = document.getElementById("testbar");
	
	if (entertest) entertest.addEventListener('keyup', ({key}) => {
    if (key === "Enter") testbar(); })

}

// Lorsque on effectue un appuis souris, detecte si un move est demandé :
document.onmousedown = function(event)
{
	if (event.which == 3) // On detecte le bouton droit de la souris
		{
			moveMouseGesture(event);
		}
	
}




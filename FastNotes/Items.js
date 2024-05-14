// Sert à valider en appuyant sur la touche entrée :
function detectSubmit(){
	var input = document.getElementById("taskName");
	input.addEventListener("keyup", saveTaskKey = function(event) {
	if (event.keyCode === 13){
		event.preventDefault();
		document.getElementById("taskSubmit").click();
		}
	});

	var input = document.getElementById("noteName");
	input.addEventListener("keyup", saveNoteKey = function(event) {
	if (event.keyCode === 13){
		event.preventDefault();
		document.getElementById("noteSubmit").click();
		}
	});
}

// Au chargement de la page on charge les items (cases) et on les affichent dans les tableau correspondant :
function loadItem(item, tableCell)
{
	/*** Cette fonction est générique pour n'importe quel type d'item ***/
	// On cherche combien il y a d'item de ce type :
	var counterName = localItemType(item).itemTypeCounter;
	var numberOfItem = Number(localStorage.getItem(counterName));
	
	// Test si aucun item de ce type n'a deja ete crée :
	if (localStorage.getItem(counterName) === null )
	{
		// On sort de la fonction :
		return;
	}
	
	for (var i = 0; i < numberOfItem+1; i++) 
		{
			// Pour chaque item, on crée un <li>
			var node = document.createElement("li");
			// On ajoute au <li> la classe cellule-tableau-liste puis un id :
			node.classList.add("cellule-tableau-liste");
			node.classList.add(localItemType(item).celluleClass);
			var itemID =  item + i;
			node.setAttribute("id", itemID);
			node.style.backgroundColor = localStorage.getItem(localItemType(item).color);
			
			// On crée le dropdiv
			var dropdiv = document.createElement("div");
			// On lui ajoute la classe dropdown :
			dropdiv.classList.add("dropdown");
			
			// On crée un <a>
			var dropbtn = document.createElement("a");
			// On lui donne la classe dropbtn et l'id content :
			dropbtn.classList.add("dropbtn");
			dropbtn.setAttribute("id", "content" +itemID);
			
			// Recuperer le localStorage de la valeur pour chaque item
			var nameOfStorageItem = localItemType(itemID).localTypeNumber +i;
			var itemName = localStorage.getItem(nameOfStorageItem);
			// On ajoute le texte au dropbtn :
			// Ctrl html :
			if (/<[a-z/][\s\S]*>/i.test(itemName)){
					dropbtn.innerHTML = "ERREUR ! Zone Hypertexte détecté.";
				}
			else {
					dropbtn.innerHTML = itemName;
				}
			
			// On ajoute le dropbtn au dropdiv :
			dropdiv.appendChild(dropbtn);
			
			// On crée le dropdownContent avec une classe et un id :
			var dropdownContent = document.createElement("div");
			dropdownContent.classList.add("dropdown-content");
			dropdownContent.setAttribute("id", "dropDown" +itemID);
			
			//On crée les boutons "Fait" et "Modifier" :
			var faitdropContent = document.createElement("a");
			var modifierdropContent = document.createElement("a");
			modifierdropContent.setAttribute("onclick", 'buttonModifyClick(this)');
			faitdropContent.setAttribute("onclick", 'buttonFaitClick(this)');
			faitdropContent.textContent = "Fait";
			modifierdropContent.textContent = "Modifier";
			// On ajoute les "Fait" et "Modifier" au dropdownContent :
			dropdownContent.appendChild(faitdropContent);
			dropdownContent.appendChild(modifierdropContent);
			// On ajoute le dropdownContent au dropdiv :
			dropdiv.appendChild(dropdownContent);
			// On ajoute le dropdiv au node
			node.appendChild(dropdiv);
			// On ajoute le <li> à la fin du tableCell
			document.getElementById(tableCell).appendChild(node);
		}

}

// Quand on clique sur le bouton ajouter une tache :
function buttonTaskClick()
{
	// On masque le bouton "Ajouter une tâche" et on fais apparaitre la formulaire :
	document.getElementById("btnTaskText").style.display = 'none';
	document.getElementById("taskText").style.display = 'block';
}

// Quand on clique sur le bouton ajouter une note :
function buttonNoteClick()
{
	// On masque le bouton "Ajouter une tâche" et on fais apparaitre la formulaire :
	document.getElementById("btnNoteText").style.display = 'none';
	document.getElementById("noteText").style.display = 'block';
}

// Ajout d'un nouvelle item :
function submitNewItem(ItemTypeSubmit)
{
	/*** Cette fonction est générique pour n'importe quel type d'item ***/
	// Déterminer le type d'item :
	var itemType = localItemType(ItemTypeSubmit).localTypeNumber;
	var counterName = localItemType(ItemTypeSubmit).itemTypeCounter;
	document.getElementById("btnDateClicked").innerHTML = ItemTypeSubmit;
	// Si le type est inconnu on sort de la fonction :
	if (itemType == null)
	{
		alert("Type inconnu !");
		return;
	}
	
	// Permet de récupérer le nom de l'item entrée par l'utilisateur :
	var itemName = document.getElementById(localItemType(ItemTypeSubmit).itemName).value;	
	
	// Si l'utilisateur n'a pas entrée de texte, on sort de la fonction :
	if ( itemName == "" )
	{
		alert("Champ vide !");
		return;
	}
	
	// Test si aucun item de ce type n'a deja ete crée :
	if (localStorage.getItem(counterName) === null )
	{
		// On crée alors une variable contenant le nombre d'item du meme type 0 :
		localStorage.setItem(counterName, 0);
		localStorage.setItem(ItemTypeSubmit+"Color", "SpringGreen");	// Couleur par défaut
	}
	else 
	{
		// Si le compteur existe, on l'incrémente de 1 :
		localStorage.setItem(counterName, Number(localStorage.getItem(counterName)) +1);
	}
	// On ajoute l'item dans la mémoire :
	var nameOfStorageItem = itemType +localStorage.getItem(counterName);
	localStorage.setItem(nameOfStorageItem, itemName);
	
	alert("Sauvegarde OK");
	document.location.reload(true);
}


// Modifier des item :
function buttonModifyClick(thisNode) {
	
	// Ajout d'un fond gris
	greyScreen();
	
	/*** Cette fonction est générique pour n'importe quel type d'item ***/
	// On récupere les infos de l'item :
	var itemID = thisNode.parentNode.parentNode.parentNode.id;
	
	// On masque le texte
	var itemText = document.getElementById("content" +itemID).innerHTML;
	document.getElementById("content" +itemID).innerHTML = '';
	
	// On ajoute un champ d'entrée :
	var inputTask = document.createElement("textarea");
	inputTask.innerHTML = itemText;
	inputTask.id = "inputID" +itemID;
	inputTask.style.backgroundColor = localStorage.getItem(localItemType(itemID).color);
	inputTask.style.outline = "none";
	// Metre l'item au millieur de l'écran
	document.getElementById(itemID).classList.add("cellule-modify-centered");
	inputTask.style.height = "88%";
	
	// On masque les boutons Fait et Modifier :
	document.getElementById("dropDown" +itemID).style.display = "none";
	
	// On crée un div
	var inputBtn = document.createElement("div");
	inputBtn.classList.add("dropdown-content");
	inputBtn.setAttribute("id", "dropdownEdit" +itemID);
	
	// Boutons OK et Annuler
	var dropbtnOK = document.createElement("a");
	dropbtnOK.innerHTML = "OK";
	dropbtnOK.setAttribute("onclick", 'buttonOKClick(this)');
	inputBtn.appendChild(dropbtnOK);
	
	var dropbtnAnnuler = document.createElement("a");
	dropbtnAnnuler.innerHTML = "Annuler";
	dropbtnAnnuler.setAttribute("onclick", 'buttonAnnulerClick(this)');
	inputBtn.appendChild(dropbtnAnnuler);
	
	// On ajoute l'input à l'item correspondant :
	document.getElementById("content" +itemID).appendChild(inputTask);
	document.getElementById("content" +itemID).appendChild(inputBtn);
	
	document.getElementById(itemID).style.backgroundColor = localStorage.getItem(localItemType(itemID).color);
	itemModify = true;
}

// Lors du clique sur le bouton "Annuler" :
function buttonAnnulerClick(thisNode)
{
	// Enleve le fond gris
	removeGreyScreen();
	
	/*** Cette fonction est générique pour n'importe quel type d'item ***/
	// On récupere l'itemID sous forme de nombre;
	var itemID = thisNode.parentNode.parentNode.parentNode.parentNode.id;
	var itemType = localItemType(itemID).localTypeNumber;
	
	
	if (itemType == null)
	{
		alert ("Type inconnu !");
		return;
	}
	itemModify = false;
	
	document.getElementById(itemID).classList.remove("cellule-modify-centered");
	
	// On reconstruit l'item : 
	var texte = localStorage.getItem(itemType +itemNumber(itemID));
	document.getElementById("content" +itemID).innerHTML = texte;
	
	// Detecte si le texte contiens des balises html
	if (/<[a-z/][\s\S]*>/i.test(texte))
		{
			document.getElementById("content" +itemID).innerHTML = "ERREUR ! Zone Hypertexte détecté.";
		}

	document.getElementById("dropDown" +itemID).removeAttribute("style");	
	document.getElementById(itemID).style.backgroundColor = localStorage.getItem(localItemType(itemID).color);
}

// Recupère le numero d'un item
function itemNumber(itemID)
{
	if (localItemType(itemID) != "null" )return itemID.substr(localItemType(itemID).celluleClass.length);
}

// Lors du clique sur le bouton "OK" :
function buttonOKClick(thisNode)
{
	/*** Cette fonction est générique pour n'importe quel type d'item ***/
	// Récupération des infos sur l'item :
	var itemID = thisNode.parentNode.parentNode.parentNode.parentNode.id;
	var itemType = localItemType(itemID).localTypeNumber;
	itemModify = false;
	
	if (itemType == null)
	{
		alert ("Type inconnu !");
		return;
	}
	
	var texte = document.getElementById("inputID" +itemID).value;
	// Verification du champ de texte :
	if ( texte == "" )
	{
		// S'il est vide :
		alert("Champ vide !");
		// On annule l'opération en envoyant le noeud en paramètre :
		buttonAnnulerClick(thisNode);
		return;
	}
	localStorage.setItem(itemType +itemNumber(itemID), texte);
	document.location.reload(true);
}


function buttonFaitClick(thisNode) {
	
	/*** Cette fonction est générique pour n'importe quel type d'item ***/
	// Infos sur l'item à effacer :
	var itemID = thisNode.parentNode.parentNode.parentNode.id;
	var itemType = localItemType(itemID).localTypeNumber;
	var counterName = localItemType(itemID).itemTypeCounter;
	
	// Determiner le compteur correspondant au type d'item :
	var itemCounter = Number(localStorage.getItem(counterName));
	
	// Verification du type d'item :
	if (itemType == null)
	{
		alert ("Type inconnu !");
		return;
	}
	
	// Décallage des items suivants :
	var temp = itemNumber(itemID);
	for (var i = Number(temp); i < itemCounter; i++)
	{
		var texte = localStorage.getItem(itemType +(Number(i) +1));
		localStorage.setItem(itemType +i, texte);
	}
	// Suppression du dernier item :
	localStorage.removeItem(itemType +itemCounter);
	
	// Decrementation du compteur correspondant :
	localStorage.setItem(counterName, Number(itemCounter) -1);
	// Rechargement de la page
	document.location.reload(true);
}

// Permet de déterminer le type d'item :
function localItemType(itemID)
{
	if (itemID.indexOf("shortcut") >= 0)
	{
		return {
		localTypeNumber: "localTaskNumber",
		itemName: "taskName",
		itemTypeCounter: "taskCounter",
		submitNewBtn: "taskText",
		celluleClass: "shortcut",
		cellType: "shortcut",
		color: "sColor",
		};
	}
	else if (itemID.indexOf("task") >= 0)
	{
		return {
        localTypeNumber: "localTaskNumber",
        itemName: "taskName",
		itemTypeCounter: "taskCounter",
		submitNewBtn: "taskText",
		celluleClass: "task",
		cellType: "taskTableCell",
		color: "tColor",
		};
	}
	else if (itemID.indexOf("note") >= 0)
	{
		return {
        localTypeNumber: "localNoteNumber",
        itemName: "noteName",
		itemTypeCounter: "noteCounter",
		submitNewBtn: "noteText",
		celluleClass: "note",
		cellType: "noteTableCell",
		color: "nColor",
		};
	}
	else
	{
		return "null";
	}
}

// Variables utilisées lors du déplacement d'un item :
var relativePosX = 0;
var relativeposY = 0;
var survolItem;
var selectedItem = null;
var mousePressedTimer;
var blankItem = null;
var swap = false;
var blankOrder;
var warningOrder = 0;
var swapedOrder;
var enableContextMenu;
var grabItem = null;
var blankHeight;


// On demarre la selection de l'item en vue de lancer moveeItem :
function moveMouseGesture(event) {
// Selection de  l'item
			if (!itemModify)
				{
					grabItem = getIDTask(event.target);
										document.getElementById("btnDateClicked").innerHTML = grabItem;
					// Cherche si c'est un item, résoud le problème avec le texte et clique droit
					if (localItemType(grabItem) == "null") return 0;

					// Prend en compte uniquement les items par les boutons d'ajout
					if (grabItem == localItemType(grabItem).submitNewBtn) grabItem = null;
					else if (grabItem)// || grabItem[0] == 's')
						{	
							// Changer la souris en grab
							document.getElementById(grabItem).style.cursor = "grab";
					
							// Active le contextmenu
							enableContextMenu = true; // le contextmenu est activé
							
							// On attend 800ms avant de lancer moveItem() si on est sur un item :
							if (survolItem != "")
								{
									mousePressedTimer = setTimeout(function(){moveItem(event);}, 300);
								}
					}
				}	
}

// Desactive / Active le contextmenu lors du clique droit sur les tableaux d'items
function rClickContextMenu(event){

    if (!enableContextMenu){
		event.preventDefault();
	}
}
 
// Verifie si on déplace un item
function moveItem(event){
	
	// On teste si on est sur un item
	var moveTask = getIDTask(event.target);
	var itemType = localItemType(moveTask).localTypeNumber;
	//document.getElementById("btnDateClicked").innerHTML = itemType;
		
	// Verification du type d'item :
	if (itemType == null)
	{
		alert ("Type inconnu !");
		return;
	}
	
	// Changer le curseur de la souris + desactivation du contextmenu pour les items
	document.getElementById(grabItem).style.cursor = "grabbing";
		
	// Si Item
	if (localItemType(grabItem).cellType != null && localItemType(grabItem).cellType != "shortcut"){
		// On change le curseur pour toute la liste des Items de meme type
		document.getElementById(localItemType(grabItem).cellType).style.cursor = "grabbing";
		enableContextMenu = false; // Le contextmenu est desactivé
		document.querySelectorAll(".tableau-liste").forEach(element =>
		element.addEventListener('contextmenu', rClickContextMenu ));
		// On annule la selection d'un item :
		selectedItem = null;
	}	
	
	// Recupération de la hauteur de l'item actuel
	// blankHeight = document.getElementById(selectedItem).clientHeight;
	blankHeight = document.getElementById(moveTask).clientHeight;
	if (debugMouse) document.getElementById("btnDateClicked").innerHTML = blankHeight;
	
	// Si c'est un item, on trouve sa position :
	if (itemNumber(moveTask) >= '0' && itemNumber(moveTask) <= '9')
	{	
		var rect = document.getElementById(moveTask).getBoundingClientRect();
		relativePosX =  parseFloat(event.clientX - rect.left ).toFixed(0);
		relativePosY =  parseFloat(event.clientY + document.body.scrollTop - rect.top).toFixed(0);
		selectedItem = moveTask;
	}
	
}

// Connaitre l'id de la tache :
function getIDTask(target)
{
	if (target.id == "")
	{
		itemID = target.parentNode.id;
	}
	else if (target.parentNode.id == ""){
		itemID = target.parentNode.parentNode.id;
	}
	else if (target.parentNode.parentNode.id == ""){
		itemID = target.id;
	}
	else {
		return null;	
	}
	return itemID;
}

// Au déplacement de la souris :
document.onmousemove = function(event) {
	// Survol des items derriere :
	// Infos utilisées pour deplacer les items plus tard //
	survolItem = getIDTask(event.target);
	
	// Si un item est selectionné :
	if (selectedItem != null)
	{
		//Test shortcut
		//if (localItemType(selectedItem).cellType == "shortcut") document.getElementById("btnDateClicked").innerHTML = "shortcut";
			
		// Permet de pointer l'élement qui se trouve derriere :
		document.getElementById(selectedItem).style.pointerEvents = "none";
		// On désactive les evennements de la souris :
		window.addEventListener('mouseup', onDragEnd);
		window.addEventListener('selectstart', disableSelect);
		document.getElementById(selectedItem).style.zIndex = "99";
		document.getElementById(selectedItem).style.transitionDuration = "0s";
	
		// On le déplace en suivant la souris :
		var x = event.pageX - relativePosX;
		var y = event.pageY + document.body.scrollTop - relativePosY;
		document.getElementById(selectedItem).style.top = y+'px';
		document.getElementById(selectedItem).style.left = x+'px';
		document.getElementById(selectedItem).style.position = "absolute";
		
		// On crée un case vide a l'emplacement survolé et on defini si la condition de swap est respecté :
		deplacementItem(selectedItem,survolItem);
	}

}


// Permet d'empecher la selection de texte quand la souris bouge :
function disableSelect(event) {
    event.preventDefault();
}
// Réactive la sélection de texte :
function onDragEnd() {
    window.removeEventListener('mouseup', onDragEnd);
    window.removeEventListener('selectstart', disableSelect);
}


// Relachement de la souris : 
document.onmouseup = function(event)
{	
	// Met fin au "moveItem()" :
	clearTimeout(mousePressedTimer);
	//Release de l'item selectionné :
	//document.getElementById("btnDateClicked").innerHTML = grabItem;
	if (grabItem == "taskSubmit") return 0;
	if (grabItem)
	{
		document.getElementById(grabItem).removeAttribute("style");
		document.getElementById(grabItem).style.backgroundColor = localStorage.getItem(localItemType(grabItem).color);
		grabItem = null;
	}
	//On réactive le dropdown et le fond :
	if (selectedItem != null)
	{
		// On retire la main
		document.getElementById(localItemType(getIDTask(event.target)).cellType).removeAttribute("style");
		
		// On remet l'item de la bonne couleur
		document.getElementById(selectedItem).removeAttribute("style");
		document.getElementById(selectedItem).style.backgroundColor = localStorage.getItem(localItemType(selectedItem).color);
	}
	
	// On retire l'espace vide s'il y en a un.
	if (blankItem != null)
	{
		var removeOldSpace = document.getElementsByClassName("blankSpace");
		for(var i=0; i<removeOldSpace.length; i++){
		removeOldSpace[i].parentNode.removeChild(removeOldSpace[i]);
		}
		blankItem = null;
	}		
	
	// Déplacement des items
	if (swap)
	{
		swapItem(selectedItem, swapedOrder);
		swap = false;
	}
		
	selectedItem = null;
	
}

// Cette fonction est executée à chaque fois que la souris bouge l'orsqu'un item est selectionné :
function deplacementItem(selectedItem, destinationItem)
{
	// blankItem stocke l'espace vide
	if (blankItem == null)
	{	
		blankItem = destinationItem;
	}
	
		// Si la destination n'est pas valide, alors on annule le swap :
		if (destinationItem == "" || destinationItem == null)
		{
			swap = false;
		}
		if (destinationItem != "" && destinationItem != null && destinationItem != "taskTableCell" && destinationItem != "noteTableCell")
		{
			// C'est génial ! (sert a empecher que la case inseré soit toujours apres la case selectionné)
			if (itemNumber(destinationItem) < warningOrder)
			{
				//On se place avant !
				blankOrder = 0;
			}
			else {
				//Pas besoin !
				blankOrder = 1;
			}
			
			//verifier les types de listes
			var selectedItemType = localItemType(selectedItem).cellType;
			var destinationItemType = localItemType(destinationItem).cellType;
			
			if (selectedItemType == destinationItemType)
			{ 		
					//test = destinationItem.substr(1);
					test = itemNumber(destinationItem);
					//document.getElementById("btnDateClicked").innerHTML = "OK";
					
					//Efface l'ancienne case vide
					var removeOldSpace = document.getElementsByClassName("blankSpace");
					for(var i=0; i<removeOldSpace.length; i++){
					removeOldSpace[i].parentNode.removeChild(removeOldSpace[i]);
					}
					// On en crée une nouvelle
					if (destinationItemType != "shortcut")
					{	
						var blankSpace = document.createElement("li");
						blankSpace.classList.add("cellule-tableau-liste");
					}else
					{
						var blankSpace = document.createElement("li");
						blankSpace.classList.add("shortcut-topnav");
					}
					blankSpace.classList.add(localItemType(selectedItem).celluleClass);
					blankSpace.classList.add("blankSpace"); // Classe Specifique
					
					// On lui donne quelques attributs.
					if (blankHeight < 50) blankHeight = 50;
					
					blankSpace.style.height = blankHeight+'px';
					
					var list = localItemType(selectedItem).cellType;
					list = document.getElementById(list);
					// La position de la case vide est definie en fonction de sa position precedante (elle occupe 1 d'espace si située avant et 0 si située apres dans la liste)
					list.insertBefore(blankSpace, list.children[Number(test)+blankOrder]);
					warningOrder=Number(test)+blankOrder;
					
					// Si release de la souris alors on swap les cases :
					swap = true;
					swapedOrder = warningOrder;
			}
			
		}
}

//Fonction de swap
function swapItem(selectedItem, destinationItem)
{
	// On selectionne la liste et on déplace l'Item.
	var list = localItemType(selectedItem).cellType; // Selection de la bonne liste en fonction de l'item selectionné
	list = document.getElementById(list);	// Stockage de la liste complete
	var selectedItem = document.getElementById(selectedItem);
	list.insertBefore(selectedItem, list.children[swapedOrder]);
	
	// Il faut réorganiser les ID des Items (Utilise le chaine de caractere note ou task)
	var itemType = localItemType(selectedItem.id).celluleClass;
	
	// Pour chaques Items, on redonne le bon id
	for (var i = 0; i < list.childElementCount; i++)
	{
		list.children[i].id = itemType +i;
		list.children[i].children[0].children[0].id = "content" +itemType +i;
		list.children[i].children[0].children[1].id = "dropDown" +itemType +i;
		var itemText = document.getElementById("content" +itemType +i).innerHTML;
		var storageItemType = localItemType(itemType).localTypeNumber;
		
		// Enregistre les Items dans le localStorage.
		localStorage.setItem(storageItemType +i, itemText);
	}
}

// Simuler un clique sur le bouton modifier d'une tache :
// document.getElementById("dropDownt8").childNodes[1].click();
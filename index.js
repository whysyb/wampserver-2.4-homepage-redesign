//global variables

var showButton = document.querySelector('.show-button');
var showButtonP = showButton.querySelector('p');
var ext = document.querySelector('.ext-loaded');
var loadedExt = ext.querySelectorAll('li');
var loadedN = document.querySelector('.loaded-n');
var projects = document.querySelectorAll('.projects li');
var projectButton = document.querySelectorAll('.projects li a');
var projectSubfolder = document.querySelectorAll('.folder-content');

// global functions
var langageLink = document.querySelector('.language-link');
if(langageLink.innerText == 'Version Française'){
	showButtonP.innerText = 'Show';
}else if(langageLink.innerText == 'English Version'){
	showButtonP.innerText = 'Afficher';
}

var showContent = function(){
	console.log(langageLink.innerText);
	if(ext.classList.contains('closed')){
		ext.classList.remove('closed');
		if(langageLink.innerText == 'Version Française'){
			showButtonP.innerText = 'Hide';
		}else if(langageLink.innerText == 'English Version'){
			showButtonP.innerText = 'Masquer';
		}
	}else{
		ext.classList.add('closed');
		if(langageLink.innerText == 'Version Française'){
			showButtonP.innerText = 'Show';
		}else if(langageLink.innerText == 'English Version'){
			showButtonP.innerText = 'Afficher';
		}
	}
}

var folder = function(files){
    if(window.XMLHttpRequest) obj = new XMLHttpRequest(); //Pour Firefox, Opera,...

    else if(window.ActiveXObject) obj = new ActiveXObject("Microsoft.XMLHTTP"); //Pour Internet Explorer 

    else return(false);
    

    if (obj.overrideMimeType) obj.overrideMimeType("text/xml"); //Évite un bug de Safari

   
    obj.open("GET", files, false);
    obj.send(null);
   
    if(obj.readyState == 4) return(obj.responseText);
    else return(false);
}

var showFolderContent = function(){

	for(var a = 0; a < projects.length; a++){
		var div = document.createElement('div');
		div.classList.add('folder-content');
		div.classList.add('closed-folder');
		div.classList.add('folder-content-'+a);
		var projectsLinks = projects[a].querySelector('a');
		var projectTitle = projectsLinks.innerText;
		var content = folder(projectTitle+'/');
		projects[a].appendChild(div);
		div.innerHTML = content;
	}	
}

var projectsFolder = function(){
	for(var c = 0; c < projectButton.length; c++){	
		projectButton[c].classList.add('children-closed');
		projectButton[c].onclick = function(e){
			e.preventDefault();
			if(this.classList.contains('children-closed')){
				this.classList.remove('children-closed');
				this.classList.add('children-open');
			}else{
				this.classList.remove('children-open');
				this.classList.add('children-closed');
			}
			var thisChildren = this.nextSibling
			if(thisChildren.classList.contains('closed-folder')){
				thisChildren.classList.remove('closed-folder');
			}else{
				thisChildren.classList.add('closed-folder');
			}
		}
	}
}

var setPath = function(){
	var thisPath = 'path';
	var rootFolder = document.querySelectorAll('.projects li');
	for(var i = 0; i < rootFolder.length; i++){
		if(rootFolder[i].parentNode.classList.contains('projects')){
			rootFolder[i].classList.add('rootFolder');
		}
	}
	var parentFolder = document.querySelectorAll('.rootFolder');
	for(var y = 0; y < parentFolder.length; y++){
		var firstLink = parentFolder[y].querySelector('a');
		thisPath = firstLink.innerText;
		var needPath = parentFolder[y].querySelectorAll('.folder-content ul li a');
		for(var z =0; z < needPath.length; z++){
			var actualPath = needPath[z].getAttribute('href');
				if(actualPath != '/'){
					needPath[z].setAttribute('href', thisPath +'/'+ actualPath);
					var newPath = needPath[z].getAttribute('href');
				}
		}
	}
}


//rendering

loadedN.innerText = '('+loadedExt.length+')';
showButton.addEventListener("click", showContent, true); 
showFolderContent();
var projectSubfolderLink = document.querySelectorAll('.folder-content ul li a');
for(var d = 0; d < projectSubfolderLink.length; d++){
	var mainLink = projectSubfolderLink[d].getAttribute('href');
	if( mainLink == '/'){
		projectSubfolderLink[d].style.display = 'none';		
	}
}
setPath();
projectsFolder();
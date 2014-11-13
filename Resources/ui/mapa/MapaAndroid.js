function MapaAndroid(){
	var separadorImg="";
	var osname = Ti.Platform.osname,
	version = Ti.Platform.version,
	height = Ti.Platform.displayCaps.platformHeight,
	width = Ti.Platform.displayCaps.platformWidth;	
	if (osname === 'iphone' || osname === 'ipad') {
		separadorImg='';
	}
	else if (osname === 'mobileweb'){
		separadorImg='';
	}
	else {
		separadorImg='/';
	}	
	//Se obtienen las noticias del APD, si no las hay, se obtienen de RD
	Ti.API.info('Ruta1:'+Titanium.Filesystem.getResourcesDirectory());
	Ti.API.info('Ruta2:'+Titanium.Filesystem.getApplicationDataDirectory());
	
			
	var self = Titanium.UI.createWindow({
		theme: "Theme.NoActionBar",
		backgroundColor :'white',
		exitOnClose: false,
		modal: true,
		layout :'composite',
		navBarHidden: true
	});
	var pWidth = Ti.Platform.displayCaps.platformWidth;
    var pHeight = Ti.Platform.displayCaps.platformHeight;
	
	var btnInicio= Titanium.UI.createButton({		
		backgroundImage:separadorImg+'ui/img/android/header.png',
		top:'0px',
		left:'0',
		height:'110px',
		width:pWidth+"px"				
	});
	btnInicio.addEventListener( 'click', function() {
    	self.close();	
	});
	
	
	var tituloCentrado = Titanium.UI.createView({	
		backgroundImage: separadorImg+'ui/img/android/barra-menu.jpg',
		top: '0px',
		height: '15%',
		widht: pWidth+"px",
		zIndex: 9999,
		layout:'composite'		
	});
	
	var tituloCentradoInterna = Titanium.UI.createView({		
		backgroundColor: 'transparent',
		height: '90px',
		widht: '80%',
		zIndex: 9999		
	});
	
	var camion = Titanium.UI.createImageView({		
		image: 	separadorImg+'ui/img/android/camion.png',		
		left: '10%',		
		width: '12%',		
		height: '62%',		
		zIndex: 9999
	});
	
	
	var titulo = Titanium.UI.createImageView({
	    image: 	separadorImg+'ui/img/android/titulo.png',
	    left: '24%',
	    width: '65%',
		height: '60%',
	    zIndex: 9999
	});
	
	tituloCentradoInterna.add(camion);
	tituloCentradoInterna.add(titulo);	
	tituloCentrado.add(tituloCentradoInterna);
	
	self.add(tituloCentrado);

    var radarBaner = Titanium.UI.createImageView({		
		image: 	separadorImg+'ui/img/android/radar-banner.png',	
		top: '20%',
		left: '0%',
		width: '25%',
		height: '10%',
		zIndex: 9999			
	});

    self.add(radarBaner);

	function randomInt(max){
	  return Math.floor(Math.random() * max) + 1;
	}

	var IMG_BASE = 'https://github.com/appcelerator/titanium_mobile/raw/master/demos/KitchenSink/Resources/images/';
	var defaultFontSize = Ti.Platform.name === 'android' ? 16 : 14;

	var btn1= Titanium.UI.createButton({		
		backgroundColor:'#0F5E8B',
		color:'white',
		title:'TrucksApp',
		textAlign:'center',
		top:0,
		left:0,
		height:'12%',
		width:pWidth,
		tintColor:'white'		
	});
	
	var Map = require('ti.map');
	var numTrucksToRead=0;
	var fileNumTrucksLocal = Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),"numtrucks.json");	
	
	if (fileNumTrucksLocal.exists()){
			fileTmp = JSON.parse(fileNumTrucksLocal.read().text);
			numTrucksToRead=fileTmp.trucks;
			Ti.API.info('Se lee el Num de Trucks desde APD' + numTrucksToRead);
	}else{
			fileNumTrucksLocal = Titanium.Filesystem.getFile(Titanium.Filesystem.getResourcesDirectory(),"numtrucks.json");	
			fileTmp = JSON.parse(fileNumTrucksLocal.read().text);
			numTrucksToRead=fileTmp.trucks;
			Ti.API.info('Se lee el Num Trucks desde RD' + numTrucksToRead);	
	}
	var trucks = new Array(numTrucksToRead);	
	//for (i=0;i<numTrucksToRead;i++){
		for (i=0;i<20;i++){
		Ti.API.info("Buscando Archivo:"+(i+1)+'.json');
		var file = Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),(i+1)+'.json');
		var data = [];
		var folderImg="";
		if (file.exists()){
			folderImg=Titanium.Filesystem.getApplicationDataDirectory();
			data = JSON.parse(file.read().text);
			Ti.API.info('Se obtienen datos de AD' + data);
		
			
		trucks[i] = Map.createAnnotation({
		    latitude: data.datos.latitud,
		    longitude: data.datos.longitude, 
		    title: data.datos.nombre,
		    subtitle: 'Truck',
		    pincolor: Map.ANNOTATION_RED,
		    image: folderImg+data.datos.idTruck+"s.png",		    
		    myid:data.datos.idTruck // Custom property to uniquely identify this annotation.
		});
	}
	else{
				Ti.API.info('No se pudieron obtener los datos');
			}

	}
var win = Ti.UI.createWindow({backgroundColor: 'white'});

var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win
});

var truck1 = Map.createAnnotation({
    latitude: 19.444706,
    longitude: -99.167377, 
    title:"Truck1",
    subtitle: 'Comida Etíope',
    pincolor: Map.ANNOTATION_RED,
    image: separadorImg+'ui/img/android/elbuen-logo-90.png',
    myid:1 // Custom property to uniquely identify this annotation.
});

var truck2 = Map.createAnnotation({
    latitude: 19.441782,
    longitude: -99.161106, 
    title:"Truck2",
    subtitle: 'Comida Árabe',
    pincolor: Map.ANNOTATION_RED,
    image: separadorImg+'ui/img/android/genco-logo-90.png',
    myid:1 // Custom property to uniquely identify this annotation.
});

var truck3 = Map.createAnnotation({
    latitude: 19.447295,
    longitude: -99.179646, 
    title:"Truck3",
    subtitle: 'Comida Corrida',
    pincolor: Map.ANNOTATION_RED,
    image: separadorImg+'ui/img/android/mezquite-logo-90.png',
    myid:1 // Custom property to uniquely identify this annotation.
});


var mapView = Map.createView({
    mapType: Map.NORMAL_TYPE,
    region : {latitude:19.441718, longitude:-99.160461,latitudeDelta:0.05, longitudeDelta:0.05},            
    animate:true,
    regionFit:true,
    userLocation:true,
    height: '100%',
    top: 0,
    left: 0,
    width: '100%',  
    annotations:trucks    
	});
	// Handle click events on any annotations on this map.
	mapView.addEventListener('click', function(evt) {
    	var clicksource = evt.clicksource;
    	Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
    	if (clicksource=='title'){
   		 	//alert(clicksource);		 	
   		 	var perfil = require ('ui/perfil/Perfil');
			new perfil(''+(evt.annotation.myid)).open(); 
        }  
        if (clicksource=='subtitle'){
   		 	//alert(clicksource);		 	
   		 	var perfil = require ('ui/perfil/Perfil');
			new perfil(''+(evt.annotation.myid)).open(); 
        }         
	});

	self.add(mapView);
	
	var footerCentrado = Titanium.UI.createView({
		
		backgroundImage: separadorImg+'ui/img/android/barra-menu.jpg',
		top: '85%',
		height: '15%',
		widht: pWidth+"px",
		zIndex: 9999,
		
	});
	
	
	self.add(footerCentrado);
	
	var horz_buttons = Ti.UI.createView({
    layout: 'horizontal',
    height: Ti.UI.SIZE,
    width: Ti.UI.SIZE
	});
	
	    var gpsRadar = Titanium.UI.createButton({		
		backgroundImage: separadorImg+'ui/img/android/gps-radar.png',
	    width: '14%',
		zIndex: 9999,
	});
		gpsRadar.addEventListener('click',function (e){
		 Ti.API.info('Click en el botòn Index');	
		var index = require ('ui/common/Index');	
				new index().open(); 
	});
	
	    var truckRadar = Titanium.UI.createButton({		
		backgroundImage: separadorImg+'ui/img/android/truck-radar.png',
		width: '14%',
		zIndex: 9999,
	});
		truckRadar.addEventListener('click',function (e){
		 Ti.API.info('Click en el botòn Index');	
		var favoritos = require ('ui/favoritos/FavoritosAndroid');	
				new favoritos().open();
	});
	
	    var promoRadar = Titanium.UI.createButton({		
		backgroundImage: separadorImg+'ui/img/android/promo-radar.png',
		width: '14%',
		zIndex: 9999,
	});
	    var estrellaRadar = Titanium.UI.createButton({		
		backgroundImage: separadorImg+'ui/img/android/estrella-radar.png',
		width: '14%',
		zIndex: 9999,
	});
	
	    var eventosRadar = Titanium.UI.createButton({		
		backgroundImage: separadorImg+'ui/img/android/eventos-radar.png',
		width: '14%',
		zIndex: 9999,
	});
		eventosRadar.addEventListener('click',function (e){
		 Ti.API.info('Click en el botòn Index');	
		var eventos = require ('ui/eventos/EventosAndroid');	
				new eventos().open(); 
	});
	
	    var antojoRadar = Titanium.UI.createButton({		
		backgroundImage: separadorImg+'ui/img/android/antojo-radar.png',
		width: '14%',
		zIndex: 9999,
	});

	    var magazineRadar = Titanium.UI.createButton({		
		backgroundImage: separadorImg+'ui/img/android/magazine-radar.png',
		width: '14%',
		zIndex: 9999,
	});
	
	horz_buttons.add(gpsRadar);
	horz_buttons.add(truckRadar);
	horz_buttons.add(promoRadar);  
	horz_buttons.add(estrellaRadar); 
	horz_buttons.add(eventosRadar); 
	horz_buttons.add(antojoRadar); 
	horz_buttons.add(magazineRadar);  
	
	footerCentrado.add(horz_buttons);
	
	return self;
}
module.exports = MapaAndroid;
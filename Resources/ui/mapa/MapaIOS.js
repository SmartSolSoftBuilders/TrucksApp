function MapaIOS(){
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
		backgroundColor :'white',
		exitOnClose: false,
		modal: true,
		layout :'composite',
		navBarHidden: true
	});
	var pWidth = Ti.Platform.displayCaps.platformWidth;
    var pHeight = Ti.Platform.displayCaps.platformHeight;
	
	var btnInicio= Titanium.UI.createButton({		
		/*backgroundColor:'#0F5E8B',
		title:'TrucksApp - Favoritos',
		textAlign:'center',
		top:0,
		left:0,
		height:'12%',
		width:pWidth,
		tintColor:'white'		
		*/
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
	tituloCentrado.addEventListener( 'click', function() {
    	self.close();	
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
	
	
	
	/*self.add(btnInicio);*/
	
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
  
  
  	
	

	
	// generate random number, used to make each row appear distinct for this example
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
	
	
	
	
	
	/*self.add(btn1);*/
var Map = require('ti.map');
	var numTrucksToRead=0;
	var fileNumTrucksLocal = Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),"numtrucks.json");	
	fileNumTrucksLocal.setRemoteBackup=false;
	if (fileNumTrucksLocal.exists()){
			fileTmp = JSON.parse(fileNumTrucksLocal.read().text);
			numTrucksToRead=fileTmp.trucks;
			Ti.API.info('Se lee el Num de Trucks desde APD' + numTrucksToRead);
	}else{
			fileNumTrucksLocal = Titanium.Filesystem.getFile(Titanium.Filesystem.getResourcesDirectory(),"numtrucks.json");	
			fileNumTrucksLocal.setRemoteBackup=false;
			fileTmp = JSON.parse(fileNumTrucksLocal.read().text);
			numTrucksToRead=fileTmp.trucks;
			Ti.API.info('Se lee el Num Trucks desde RD' + numTrucksToRead);	
	}
	var trucks = new Array(numTrucksToRead);	
	//for (i=0;i<numTrucksToRead;i++){
		var j=0;
		for (i=0;i<20;i++){
		Ti.API.info("Buscando Archivo:"+(i+1)+'.json');
		var file = Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),(i+1)+'.json');
		file.setRemoteBackup=false;
		var data = [];
		var folderImg="";
		if (file.exists()){
			folderImg=Titanium.Filesystem.getApplicationDataDirectory()+"../Library/Caches/";
			data = JSON.parse(file.read().text);
			Ti.API.info('Se obtienen datos de AD' + data);
		
			trucks[j++] = Map.createAnnotation({
			     latitude: data.datos.latitud,
		   		 longitude: data.datos.longitude, 
			     centerOffset: {x: 80, y: 25},
			    image: folderImg+data.datos.idTruck+"s.png",
			  title: data.datos.nombre,
		    subtitle: 'Truck',
		    myid:data.datos.idTruck ,
			    // For eventing, use the Map View's click event
			    // and monitor the clicksource property for 'rightButton'.    
			    rightButton: Ti.UI.iPhone.SystemButton.CONTACT_ADD
			});
					
		/*trucks[i] = Map.createAnnotation({
		    latitude: data.datos.latitud,
		    longitude: data.datos.longitude, 
		    title: data.datos.nombre,
		    subtitle: 'Truck',
		    pincolor: Map.ANNOTATION_RED,
		    image: folderImg+data.datos.idTruck+"s.png",		    
		    myid:data.datos.idTruck // Custom property to uniquely identify this annotation.
		});*/

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

	//var currentLat=0.9;
//	var currentLon=0.0;
	

//if (trucks-1)	
    	Ti.API.info("Trucks:"+currentLat);
    	    	Ti.API.info("Trucks:"+currentLon);
    	Ti.API.info("Trucks:"+trucks.length);
    	

var mapView = Map.createView({
    mapType: Map.NORMAL_TYPE,
    region : {latitude:currentLat, longitude:currentLon,latitudeDelta:0.05, longitudeDelta:0.05},            
 	animate:true,
    regionFit:true,
    userLocation:true,
    height: '100%',
    top: 0,
    left: 0,
    width: '100%',  
    annotations: trucks
});

	// Handle click events on any annotations on this map.
	mapView.addEventListener('click', function(evt) {
    	var clicksource = evt.clicksource;
    	Ti.API.info(clicksource+"Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
    	if (clicksource=='rightButton'){
   		 	//alert(clicksource);		 	
   		 	var perfil = require ('ui/perfil/PerfilIos');
			new perfil(''+(evt.annotation.myid)).open(); 
        }  
        if (clicksource=='subtitle'){
   		 	//alert(clicksource);		 	
   		 	var perfil = require ('ui/perfil/PerfilIos');
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
		layout:'composite'
		
	});
	
	
	self.add(footerCentrado);
	
	
	
	
		var gpsRadar = Titanium.UI.createImageView({
		
		image: 	separadorImg+'ui/img/android/gps-radar.png',
		
		top: '88%',
		
		left: '3%',
		
		width: '10%',
		
		height: '7%',
		
		zIndex: 9999
		
	
	});
	

		
		var truckRadar = Titanium.UI.createImageView({
		
		image: 	separadorImg+'ui/img/android/truck-radar.png',
		
		top: '88%',
		
		left: '17%',
		
		width: '10%',
		
		height: '7%',
		
		zIndex: 9999
		
	
	});
	
	
		var promoRadar = Titanium.UI.createImageView({
		
		image: 	separadorImg+'ui/img/android/promo-radar.png',
		
		top: '88%',
		
		left: '31%',
		
		width: '10%',
		
		height: '7%',
		
		zIndex: 9999
		
	
	});
	
	
		var estrellaRadar = Titanium.UI.createImageView({
		
		image: 	separadorImg+'ui/img/android/estrella-radar.png',
		
		top: '88%',
		
		left: '45%',
		
		width: '10%',
		
		height: '7%',
		
		zIndex: 9999
		
	
	});
	
	
		var eventosRadar = Titanium.UI.createImageView({
		
		image: 	separadorImg+'ui/img/android/eventos-radar.png',
		
		top: '88%',
		
		left: '59%',
		
		width: '10%',
		
		height: '7%',
		
		zIndex: 9999
		
	
	});
	
	
		var antojoRadar = Titanium.UI.createImageView({
		
		image: 	separadorImg+'ui/img/android/antojo-radar.png',
		
		top: '88%',
		
		left: '73%',
		
		width: '10%',
		
		height: '7%',
		
		zIndex: 9999
		
	
	});
	
	
	
		var magazineRadar = Titanium.UI.createImageView({
		
		image: 	separadorImg+'ui/img/android/magazine-radar.png',
		
		top: '88%',
		
		left: '87%',
		
		width: '10%',
		
		height: '7%',
		
		zIndex: 9999
		
	
	});
	
	self.add(gpsRadar);
	self.add(truckRadar);
	self.add(promoRadar);
	self.add(estrellaRadar);
	self.add(eventosRadar);
	self.add(antojoRadar);
	self.add(magazineRadar);
	
	return self;
}
module.exports = MapaIOS;
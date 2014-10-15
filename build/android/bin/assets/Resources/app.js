// Don't forget to set your appid and requested permissions, else the login button
// won't be effective.
var separadorImg="";
var osname = Ti.Platform.osname;
if (osname === 'iphone' || osname === 'ipad') {
		separadorImg='';
	}
	else if (osname === 'mobileweb'){
		separadorImg='';
	}
	else {
		separadorImg='/';
}	
	
////////////////////////////////////// --- SE OBTIENE LA VERSIÓN DEL PAQUETE DE TRUCKS --- //////////////////////

	function retrieveData(callback){
		versionJSONFiles=1;
	    var httpClient = Titanium.Network.createHTTPClient({
            onload: function() {
                //We'll call this reply instead of JSON
                var reply = JSON.parse(this.responseText);
                callback(reply);         
            },
            onerror : function(e) {
            	//alert("Imposible Actualizar base de datos de Trucks");
				var index = require ('ui/common/Index');	
				new index().open(); 
     		},timeout : 1000 
        });            
 		httpClient.open("GET", "http://s544443713.onlinehome.mx/AppTrucks/app/getUpdates.php");
    	httpClient.send();
	}

	retrieveData(function(returnVar){
		//If we get a null or undefined response, we'll just take an empty array
		var links = returnVar || [];
		var listaTrucks = returnVar.trucks;
		var versionFromServer = returnVar.version;
		var dataVersionLocal = 0;
		//alert(links);
		var fileVersionLocal = Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),"version.json");	
		if (fileVersionLocal.exists()){
			dataVersion = JSON.parse(fileVersionLocal.read().text);
			Ti.API.info('Versión Actual desde APD' + dataVersion.version);
		}else{
			fileVersionLocal = Titanium.Filesystem.getFile(Titanium.Filesystem.getResourcesDirectory(),"version.json");	
			dataVersion = JSON.parse(fileVersionLocal.read().text);
			Ti.API.info('Versión Actual desde RD' + dataVersion.version);	
		}
		Ti.API.info(dataVersion.version+"?<"+versionFromServer);
		/////////////// Si hay actualización se procede a actualizar la bd de Trucks ////////////////////////
		if (dataVersion.version<versionFromServer){
			Ti.API.info("!Hay nuevos datos disponibles! Versión:"+versionFromServer);
			Ti.API.info('Trucks nuevos:' + listaTrucks);
			var fileMainTrucks = Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),'trucks.json');	
			fileMainTrucks.deleteFile();
			fileMainTrucks.write("{\"trucks\":"+JSON.stringify(listaTrucks)+"}");
			
			//////////// Se actualizan las imágenes de la bd de Trucks /////////////////////////////////	
		    var httpClientIndiv = Titanium.Network.createHTTPClient({
				onload: function() {         	
						var f = Ti.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),'imagenesTrucks.zip');
						f.write(this.responseData);    
						if (osname === 'iphone'){
					 var f = Ti.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),'imagenesTrucks.zip');
					 var zipFile = require('de.marcelpociot.zip');
					 zipFile.unzip({
								// TiFile object containing the zip file to open
								file: 		f,
								// Directory to extract the files to
								target: 	Ti.Filesystem.applicationDataDirectory,
								// OverWrite existing files? default: TRUE
								overwrite:	true,
								// Success callback
								success: function(e){
								// Returns unzipped files:
								Ti.API.info('OK UNZIP' + e);	
								},
								// error callback
								error: function(e){
									Ti.API.info('ERROR ZIP' + e);	
								},
								progress:function(e)
									{
									Ti.API.info('OK ZIP' + e);	
								}
							});
	  				 }
					else{
						//alert("android");
						var Compression = require('ti.compression');	
						var result = Compression.unzip(Ti.Filesystem.getApplicationDataDirectory(), 'imagenesTrucks.zip', true);				
						Ti.API.info("Unzip imgs:"+result);      
					}
					
					//Actualizando versión
					var fileVersion = Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),'version.json');					
					fileVersion.write("{\"version\":"+returnVar.version+"}");  	
					Ti.API.info("Se actualizó la bd de Trucks. Se actualizaron las Imágenes!");      
				  },
				  onerror : function(e) {
				  			//alert("Surgió un error al intentar actualizar la base de datos, vuelva a abrir la App");
						//Ti.API.info("Surgió un error al intentar actualizar la base de datos");
						},
				  timeout : 1000 
			}); 
			httpClientIndiv.open("GET", "http://s544443713.onlinehome.mx/AppTrucks/app/imagenesTrucks.zip");
			httpClientIndiv.send();	
			////////////////////////////////////////////////////////
		}
		else{
			//alert("No se actualizará");
		}
});

////////////////////////////////////// --- SECCIÓN FACEBOOK ---//////////////////////////////////////////////////
var win = Ti.UI.createWindow({backgroundImage:separadorImg+'ui/img/android/logo.png', fullscreen: true});
//var fb = require('facebook');
/*fb.appid = '901121093249961';
Ti.API.info('facebook logedin?' + fb.loggedIn);
if (!fb.loggedIn) {
	fb.permissions = ['publish_stream'];
	fb.addEventListener('login', function(e) {
    	if (e.success) {
        	alert('Bienvenido');
			var fileVersionLocal = Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),"version.json");	
				if (fileVersionLocal.exists()){
					dataVersion = JSON.parse(fileVersionLocal.read().text);
					Ti.API.info('Versión Actual desde APD' + dataVersion.version);
				}else{
					fileVersionLocal = Titanium.Filesystem.getFile(Titanium.Filesystem.getResourcesDirectory(),"version.json");	
					dataVersion = JSON.parse(fileVersionLocal.read().text);
					Ti.API.info('Versión Actual desde RD' + dataVersion.version);	
				}
        		//Set links to an empty array
				var index = require ('ui/common/Index');	
					new index().open();   								
		}		   
	});
			
	fb.addEventListener('logout', function(e) {
		alert('Logged out');
	});
    
// Add the button.  Note that it doesn't need a click event listener.
	win.add(fb.createLoginButton({
    top : '550px',
    style : fb.BUTTON_STYLE_WIDE
}));
  alert('BienvenidoINICIO');
win.open();	    
}  
else{
	alert("Bienvenido") ;*/
	var currentLat=0.9;
	var currentLon=0.0;
	
	
	
	if (osname === 'iphone' || osname === 'ipad') {
		Ti.Geolocation.purpose = "Recieve User Location";

			// get current location
			Titanium.Geolocation.getCurrentPosition( function(e) {
			    if (!e.success) {
			        alert('Could not retrieve location');
			        return;
			    }
			    //here are users coordinatesf¡
			    currentLon = e.coords.longitude;
			    currentLat = e.coords.latitude;
			   	//alert(currentLat)
				//alert(currentLon)
			// alert(latitude+longitude);
			    // try to get address
			
			});

		var welcome = require ('ui/common/IndexIOS');	
		new welcome().open(); 
	} 
	else{
		var welcome = require ('ui/common/Welcome');	
		new welcome().open(); 
	}
//} 

function Index(){
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
	
	var pWidth = Ti.Platform.displayCaps.platformWidth;
	var pHeight = Ti.Platform.displayCaps.platformHeight;
	Ti.API.info('Ti.Platform.displayCaps.density: ' + Ti.Platform.displayCaps.density);
	Ti.API.info('Ti.Platform.displayCaps.dpi: ' + Ti.Platform.displayCaps.dpi);
	Ti.API.info('Ti.Platform.displayCaps.platformHeight: ' + Ti.Platform.displayCaps.platformHeight);
	Ti.API.info('Ti.Platform.displayCaps.platformWidth: ' + Ti.Platform.displayCaps.platformWidth);
	if(Ti.Platform.osname === 'android'){
	  Ti.API.info('Ti.Platform.displayCaps.xdpi: ' + Ti.Platform.displayCaps.xdpi);
	  Ti.API.info('Ti.Platform.displayCaps.ydpi: ' + Ti.Platform.displayCaps.ydpi);
	  Ti.API.info('Ti.Platform.displayCaps.logicalDensityFactor: ' + Ti.Platform.displayCaps.logicalDensityFactor);
	}
	var self = Titanium.UI.createWindow({
		//backgroundImage:separadorImg+'ui/img/android/lineas-bg.png',
		exitOnClose: true,
		layout :'vertical',
		height:pHeight+"px",
		width:pWidth+"px",
		
		title: 'Inicio',
		navBarHidden: true		
	});
	
//		Ti.API.info('Click en el botòn Salir');	
//		Ti.API.info('Click en el botòn Salir');	
	
	// generate random number, used to make each row appear distinct for this example
	function randomInt(max){
	  return Math.floor(Math.random() * max) + 1;
	}

	var IMG_BASE = 'https://github.com/appcelerator/titanium_mobile/raw/master/demos/KitchenSink/Resources/images/';
	//var defaultFontSize = Ti.Platform.name === 'android' ? 16 : 14;

	var btn1= Titanium.UI.createButton({		
		backgroundImage:separadorImg+'ui/img/android/barra-menu.jpg',
		top:'0px',
		left:'0',
		height:'110px',
		width:pWidth+"px"
	});
	
	var tituloCentrado = Titanium.UI.createView({
		
		backgroundImage: separadorImg+'ui/img/android/barra-menu.jpg',
		top: '0px',
		height: '110px',
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
	
	
	/*btn1.addEventListener('click',function (e){
		Ti.API.info('Click en el botòn Salir');	
		self.close();
		var activity = Titanium.Android.currentActivity;
			activity.finish();
			self.activity.finish();
	});*/

var menuTitulo = ['radar','trucks','eventos','estaciones','promociones','con-antojo-de','magazine'] ;
var icons = ['icon1','icon2','icon3','icon4','icon5','icon6','icon7'] ;

var menuData = [];
var row = new Array(7);
for (var i=1; i<=7; i++){
  	row[i-1] = Ti.UI.createTableViewRow({
    className:'forumEvent', // used to improve table performance
    backgroundImage:separadorImg+'ui/img/android/lineas-bg.png',
	rowIndex:i, // custom property, useful for determining the row during events
    height:60
  });
  
  var imageAvatar1 = Ti.UI.createImageView({
    image: separadorImg+'ui/img/android/bullet.png',
    left:-10, top:5,
    height:50,width:50   
  });
  row[i-1].add(imageAvatar1);
    
  var imageAvatar = Ti.UI.createImageView({
    image: separadorImg+'ui/img/android/'+menuTitulo[i-1]+'.png',
    left:-5, top:5,
     height:40
  });
  row[i-1].add(imageAvatar);

 var imageAvatar2 = Ti.UI.createImageView({
    image: separadorImg+'ui/img/android/'+icons[i-1]+'.png',
    left: 270, top:5,
     height:40,
     width: 40
  });
  row[i-1].add(imageAvatar2);
  
  
  
  //row[i-1].add(labelUserName);
  
  /*var labelDetails = Ti.UI.createLabel({
    color:'#222',
    font:{fontFamily:'Arial', fontSize:defaultFontSize+2, fontWeight:'normal'},
    text:'Replied to post with id ' + randomInt(1000) + '.',
    left:70, top:44,
    width:360
  });
  row.add(labelDetails);
  var imageCalendar = Ti.UI.createImageView({
    image:IMG_BASE + 'custom_tableview/eventsButton.png',
    left:70, bottom: 2,
    width:32, height: 32
  });
  row.add(imageCalendar);
  var labelDate = Ti.UI.createLabel({
    color:'#999',
    font:{fontFamily:'Arial', fontSize:defaultFontSize, fontWeight:'normal'},
    text:'on ' + randomInt(30) + ' Nov 2012',
    left:105, bottom:10,
    width:200, height:20
  });
  row.add(labelDate);
  */
 if (i==1){
	  row[i-1].addEventListener('click',function (e){
		Ti.API.info('Click en el botòn Mapa');	
		   var mapaAndroid = require ('ui/mapa/MapaAndroid');	
			new mapaAndroid().open(); 	
		});
  }
  if (i==2){
	  row[i-1].addEventListener('click',function (e){
		  var favoritosAndroid = require ('ui/favoritos/FavoritosAndroid');	
			new favoritosAndroid().open(); 	
		});  
  }
  if (i==3){
	  row[i-1].addEventListener('click',function (e){
		Ti.API.info('Click en el botòn Eventos');	
		   var favoritosAndroid = require ('ui/eventos/EventosAndroid');	
			new favoritosAndroid().open(); 	
		});  
  }
  /*  if (i==4){
	  row[i-1].addEventListener('click',function (e){
	  	var fb = require('facebook');
	  	fb.appid = '901121093249961';
		Ti.API.info('facebook logedin?' + fb.loggedIn);
		fb.logout();
		Ti.API.info('Click en el botòn LGFacebook');	
		alert("Se cerró la sesión FB");
		});  
  }  
 if (i==4){
	  row[i-1].addEventListener('click',function (e){
		Ti.API.info('Click en el botòn Temporal');	
		   var perfil = require ('ui/perfil/Perfil');	
			new perfil(1).open(); 	
		});  
  }*/
  
 /* if (i==5){
	  row[i-1].addEventListener('click',function (e){
		Ti.API.info('Click en el botòn Temporal');	
		   var perfil = require ('ui/bienvenida/Bienvenida');	
			new perfil().open(); 	
		});  
  }*/  
  

  menuData.push(row[i-1]);
}
	var menu = Ti.UI.createTableView({
	  data: menuData,
	  zIndex: 10
	});
	
	
	//self.add(btn1);
	
	self.add(tituloCentrado);
	 
	var imgAvt = Ti.UI.createImageView({
	    backgroundImage:separadorImg+'ui/img/android/lineas-bg.png',
    	image: separadorImg+'ui/img/android/contenido.png',
   		 left:0, top:0,
    	 height:40
 	 });
	self.add(imgAvt);
	
	
	
	self.add(menu);	
	alert("OKs"+self)
	
	
	
	return self;
}
module.exports = Index;
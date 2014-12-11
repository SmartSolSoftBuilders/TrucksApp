function Perfil(idTruck){
//alert(idTruck);	
var IMG_BASE = 'https://github.com/appcelerator/titanium_mobile/raw/master/demos/KitchenSink/Resources/images/';
var defaultFontSize = Ti.Platform.name === 'android' ? 16 : 14;	

var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;


var osname = Ti.Platform.osname;
var os = function(/*Object*/ map) {
    var def = map.def||null; //default function or value
    if (map[osname]) {
        if (typeof map[osname] == 'function') { return map[osname](); }
        else { return map[osname]; }
    }
    else {
        if (typeof def == 'function') { return def(); }
        else { return def; }
    }
};

var IMG_BASE2 = Titanium.Filesystem.getApplicationDataDirectory();

var fileMainTrucks = Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),'trucks.json');	
var imageAvatars = new Array(30);
var imgName="1";
var nombreTruckTS="S/N";
var infoTruck="S/I";
var faceLabelTxt="";
var twitterLabelTxt="";
var tipoTruckTS="S/N";

if (fileMainTrucks.exists()){
	var data = JSON.parse(fileMainTrucks.read().text);
	//for (var i=0; i<data.trucks.length; i++){
	//}
	//alert(data.trucks[0].nombre);
	imgName=idTruck-1;
	infoTruck=data.trucks[idTruck-1].info;
	nombreTruckTS=data.trucks[idTruck-1].nombre;
	tipoTruckTS=data.trucks[idTruck-1].tipo;
	faceLabelTxt=data.trucks[idTruck-1].facebook;
	twitterLabelTxt=data.trucks[idTruck-1].twitter;
}	
Ti.UI.setBackgroundColor('#fff');

var win = Ti.UI.createWindow({
  backgroundColor: 'transparent',
  exitOnClose: false,
  fullscreen: false,
  modal: true,
  navBarHidden: true,
  title: 'Perfil',
  opacity: 1,
  height: '100%'
});


var vistaPrincipal = Ti.UI.createView({
	width: '100%',	
	height: '120%',	
	backgroundColor: '#231f20',
	opacity: 0.7
});


var etiquetaEstacion= Titanium.UI.createButton({		
		title:'Regresar a Menú Principal',
		backgroundImage: '/ui/img/HUERTO/barra-menu.png',
		top: 0,
		left:0,
		width: '100%',
		height: '6%',
		opacity: 1	,
		textAlign:'center',
	    tintColor:'white',
	    color: 'white',
		opacity: 1,	
		zIndex: 9999,
	    font:{
        fontFamily: os({
            iphone:'Avenir LT Std',
            ipad: 'Avenir LT Std',
            ipod: 'Avenir LT Std',
            android:'AvenirLTStd-Medium'
        })
        }	
	});
	etiquetaEstacion.addEventListener( 'click', function() {
    	win.close();	
	});


var etiquetaBlanca = Ti.UI.createView({
	backgroundColor: '#fff',	
	top: '6%',	
	width: '100%',
	height: '1%',
	opacity: 1,	
	zIndex: 9999		
});

var espacioFotoPrincipal = Ti.UI.createImageView({
	//image: '/ui/img/android/espacios/'+idTruck+'.jpg',
	image: IMG_BASE2+idTruck+'l.jpg',
	top: '7%',
	width: '80%',
	height: '30%',
	opacity: 1
});

var etiquetaNombreTruck = Ti.UI.createView({
	
	backgroundColor: '#231f20',
	/*image: */
	top: '31%',
	width: '80%',
	height: '6%',
	opacity: '0.7'	,
	textAlign:'center',
	tintColor:'white',
	color:'white',
	zIndex: 9999	
	
});


var logoTruck = Ti.UI.createImageView({
	image: IMG_BASE2+idTruck+'.jpg',	
//	image: IMG_BASE2'/ui/img/HUERTO/logo-local.png',
	top: '28%',
	left: '10%',
	width: '28%',
	height: '18%',
	zIndex: 9999,	
	opacity: 1
});


var nombreTruck = Ti.UI.createLabel({	
	top: '32%',
	left: '44%',
	width: '36%',
	backgroundColor: 'transparent',
    textAlign:'center',
	tintColor:'white',
	
	zIndex: 9999,	
	text: nombreTruckTS,
	font:{
        fontFamily: os({
            iphone:'Avenir LT Std', 
            ipad: 'Avenir LT Std',
            ipod: 'Avenir LT Std',
            android:'AvenirLTStd-Medium'
        })
    }
});



var imagenHorario = Ti.UI.createImageView({	
	image: '/ui/img/HUERTO/reloj.png',
	top: '42%',
	left: '43%',
	width: '3%',
	height: '2%',
	zIndex: 9999,	
	opacity: 1
});


var etiquetaHorario = Ti.UI.createLabel({	
	top: '42%',
	left: '48%',
	width: '30%',
	backgroundColor: 'transparent',
    textAlign:'left',
	tintColor:'white',
	color:'white',
	zIndex: 9999,	
	text: '8am - 9pm',
	font:{
        fontFamily: os({
            iphone:'Avenir LT Std', 
            ipad: 'Avenir LT Std',
            ipod: 'Avenir LT Std',
            android:'AvenirLTStd-Medium'
        })
    }
});

var imagenTipo = Ti.UI.createImageView({	
	image: '/ui/img/HUERTO/asiatica.png',
	top: '37%',
	left: '42%',
	width: '5%',
	height: '2%',
	zIndex: 9999,	
	opacity: 1
});


var etiquetaTipo = Ti.UI.createLabel({	
	top: '37%',
	left: '48%',
	width: '30%',
	backgroundColor: 'transparent',
    textAlign:'left',
	tintColor:'white',
	color:'white',
	zIndex: 9999,	
	text: tipoTruckTS,
	//text: 'Asiática',
	font:{
        fontFamily: os({
            iphone:'Avenir LT Std', 
            ipad: 'Avenir LT Std',
            ipod: 'Avenir LT Std',
            android:'AvenirLTStd-Medium'
        })
    }
});




var Map = require('ti.map');


var anotacionPerfil = Map.createAnnotation({
    latitude: 19.444706,
    longitude: -99.167377, 
    title:"Noodle Truck",
    subtitle: 'Comida Asiática',
    image: '/ui/img/android/elbuen-logo-90.png',
    myid:1 
});


var miniMapa = Map.createView({
    mapType: Map.NORMAL_TYPE,
    region : {latitude:19.441718, longitude:-99.160461,latitudeDelta:0.05, longitudeDelta:0.05},            
    animate:true,
    regionFit:true,
    userLocation:true,
    height: '15%',
    top: '47%',
    width: '80%',  
    annotations:[anotacionPerfil],   
    opacity: 1 ,
    zIndex: 9999  
	});

var etiquetaDireccion = Ti.UI.createView({
	backgroundImage: '/ui/img/HUERTO/barra-gris.png',
	top: '63%',
	width: '80%',
	height: '8%',
	opacity: '1',
	textAlign:'center',
	tintColor:'white',
	color:'white',
	zIndex: 9999	
});

var referenciaDireccion = Ti.UI.createLabel({	
	top: '63%',
	left: '20%',
	width: '70%',
	backgroundColor: 'transparent',
    textAlign:'left',
	tintColor:'white',
	zIndex: 9999,	
	text: 'Huerto Roma Verde',
	font:{
        fontFamily: os({
            iphone:'Avenir LT Std', 
            ipad: 'Avenir LT Std',
            ipod: 'Avenir LT Std',
            android:'AvenirLTStd-Medium'
        })
    }
});

var direccionDireccion = Ti.UI.createLabel({	
	top: '67%',
	left: '20%',
	width: '70%',
	backgroundColor: 'transparent',
    textAlign:'letf',
	tintColor:'white',
	zIndex: 9999,	
	text: 'Xalapa S/N, 06760 Cuauhtémoc',
	font:{
		
        fontFamily: os({
            iphone:'Avenir LT Std', 
            ipad: 'Avenir LT Std',
            ipod: 'Avenir LT Std',
            android:'AvenirLTStd-Medium'
        })
    }
});



var etiquetaDescripcion = Ti.UI.createLabel({	
	top: '72%',
	width: '80%',
	height: '18%',
	backgroundColor: 'transparent',
    textAlign:'justify',
	tintColor:'white',
	zIndex: 9999,	
	text:infoTruck, 
	/*'Food Truck que funciona con energía solar. Los Platillos que ofrecemos se basan en la transformación del ramen oriental pensado para el paladar mexicano.',
	*/
	font:{
        fontFamily: os({
            iphone:'Avenir LT Std', 
            ipad: 'Avenir LT Std',
            ipod: 'Avenir LT Std',
            android:'AvenirLTStd-Medium'
        })
    }
});

var imagenFacebook = Ti.UI.createImageView({
	image: '/ui/img/HUERTO/fb-logo.png',
	width: '50px',
	left: '0%',
	height: '50px',
	zIndex: 9999,	
	opacity: 1
});

var imagenTwitter = Ti.UI.createImageView({
	image: '/ui/img/HUERTO/tw-logo.png',
	width: '50px',
	left: '50%',
	height: '50px',
	zIndex: 9999,	
	opacity: 1
});

var labelFacebook = Ti.UI.createLabel({	
	left: '9%',
	width: '40%',
	backgroundColor: 'transparent',
    textAlign:'left',
	tintColor:'white',
	zIndex: 9999,	
	text: faceLabelTxt,
	font:{
		fontSize: '11%',
        fontFamily: os({
            iphone:'Avenir LT Std', 
            ipad: 'Avenir LT Std',
            ipod: 'Avenir LT Std',
            android:'AvenirLTStd-Medium'
        })
    }
});

var labelTwitter = Ti.UI.createLabel({	
	left: '59%',
	width: '40%',
	backgroundColor: 'transparent',
    textAlign:'left',
	tintColor:'white',
	zIndex: 9999,	
	text: '@'+twitterLabelTxt,
	font:{
		    fontSize: '11%',
            fontFamily: os({
            iphone:'Avenir LT Std', 
            ipad: 'Avenir LT Std',
            ipod: 'Avenir LT Std',
            android:'AvenirLTStd-Medium'
        })
    }
});

var panelRedes = Ti.UI.createView({	
	width: '80%',
	height: '4%',
	top: '91%',
	zIndex: 9999,	
	backgroundColor: 'transparent'
});


panelRedes.add(imagenFacebook);
panelRedes.add(labelFacebook);
panelRedes.add(imagenTwitter);
panelRedes.add(labelTwitter);


 win.add(vistaPrincipal);
 win.add(etiquetaEstacion);
 win.add(etiquetaBlanca);
 win.add(espacioFotoPrincipal);
 win.add(etiquetaNombreTruck);
 win.add(nombreTruck);
 win.add(logoTruck);
 win.add(imagenHorario);
 win.add(etiquetaHorario);
 win.add(imagenTipo);
 win.add(etiquetaTipo);
 win.add(miniMapa);
 win.add(etiquetaDireccion);
 win.add(referenciaDireccion);
 win.add(direccionDireccion);
 win.add(etiquetaDescripcion);
 win.add(panelRedes);

 return win;
}
module.exports = Perfil;

/*var etiquetaEstacion = Ti.UI.createView({
	backgroundImage: '/ui/img/HUERTO/barra-menu.png',
	top: 0,
	left:0,
	width: '100%',
	height: '6%',
	opacity: 1	,
	textAlign:'center',
    tintColor:'white',
	opacity: 1,	
	zIndex: 9999	
});*/
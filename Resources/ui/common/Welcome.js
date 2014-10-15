function Welcome(){
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

	
Ti.UI.setBackgroundColor('#fff');

var win = Ti.UI.createWindow({
  backgroundColor: 'white',
  theme: "Theme.NoActionBar",
  exitOnClose: false,
  fullscreen: false,
  modal: true,
  navBarHidden: true,
  title: 'Radar Food Truck',
  opacity: 1,
  width:  '100%',
  height: '100%'
});
win.addEventListener('click',function (e){
		Ti.API.info('Click en el botòn Index');	
			if (osname === 'iphone' || osname === 'ipad') {
				var index = require ('ui/common/IndexIOS');	
				new index().open(); 				
			}
			else{
				var index = require ('ui/common/Index');	
				new index().open(); 	
			}
	});  
var fondoPrincipal = Ti.UI.createView({
	width: '100%',	
	height: '100%',	
	backgroundImage: '/ui/img/SALUDO/bg.png',
});

var imagenPrincipal = Ti.UI.createImageView({
	image: '/ui/img/SALUDO/2.png',
	width: '55%',
	height: '75%',
});


var imagenBanderin = Ti.UI.createImageView({	
	image: '/ui/img/SALUDO/banderin.png',
	top: '0%',
	left: '5%',
	width: '15%',
	height: '15%',
	zIndex: 9999
});


 win.add(fondoPrincipal);
 win.add(imagenPrincipal);
 win.add(imagenBanderin);

 return win;

	}module.exports = Welcome;
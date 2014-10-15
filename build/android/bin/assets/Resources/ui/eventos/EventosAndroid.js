function EventosAndroid(){
Ti.UI.setBackgroundColor('#000');

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




var win = Ti.UI.createWindow({
  backgroundColor: 'transparent',
  theme: "Theme.NoActionBar",
  exitOnClose: false,
  modal:true,
  fullscreen: false,
  title: 'EVENTOS',
  navBarHidden: true
});


var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;


var vistaPrincipal = Ti.UI.createView({
	width: '100%',	
	height: '100%',	
	backgroundColor: '#231f20',
	opacity: '0.6'
});
	
win.add(vistaPrincipal);

	
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
	
	
	win.add(etiquetaEstacion);
	
	
	
// generate random number, used to make each row appear distinct for this example
function randomInt(max){
  return Math.floor(Math.random() * max) + 1;
}

var IMG_BASE = 'https://github.com/appcelerator/titanium_mobile/raw/master/demos/KitchenSink/Resources/images/';
var defaultFontSize = Ti.Platform.name === 'android' ? 16 : 14;

var tableData = [];

for (var i=1; i<=1; i++){
  var row = Ti.UI.createTableViewRow({
    className:'forumEvent', // used to improve table performance
    selectedBackgroundColor:'transparent',
    rowIndex:i, // custom property, useful for determining the row during events
    height:110
  });
  
  
  var labelUserName = Ti.UI.createLabel({
    color:'#098596', 
    text:'#FoodtrucksEnelHuerto 6: ¡Los mejores #Foodtrucks en un sólo lugar!',
    left:35, top: 6,
    width: Ti.UI.SIZE, 
    height: 40,
	font:{
		fontSize: '15%',
		fontWeight: 'bold',
        fontFamily: os({
            iphone:'Avenir LT Std',
            ipad: 'Avenir LT Std',
            ipod: 'Avenir LT Std',
            android:'AvenirLTStd-Medium'
        })
        }    
    
  });
  row.add(labelUserName);
  
  var labelDetails = Ti.UI.createLabel({
    color:'#ccc',
    font:{fontFamily:'Arial', fontSize:defaultFontSize+2, fontWeight:'normal'},
    text:'Huerto Roma Verde',
    left:40, top:44,
    width:360,
     font:{
		fontSize: '15%',
        fontFamily: os({
            iphone:'Avenir LT Std',
            ipad: 'Avenir LT Std',
            ipod: 'Avenir LT Std',
            android:'AvenirLTStd-Medium'
        })
        }   
    
  });
  row.add(labelDetails);
  
  var imageCalendar = Ti.UI.createImageView({
    image:IMG_BASE + 'custom_tableview/eventsButton.png',
    left:40, bottom: 2,
    width:32, height: 32
  });
  row.add(imageCalendar);
  
  var labelDate = Ti.UI.createLabel({
    color:'#ddd',
    font:{fontFamily:'Arial', fontSize:defaultFontSize, fontWeight:'normal'},
    text:'on 26 de septiembre - 28 de septiembre',
    left:75, bottom:10,
    width:200, height:20,
    font:{
		fontSize: '10%',
        fontFamily: os({
            iphone:'Avenir LT Std',
            ipad: 'Avenir LT Std',
            ipod: 'Avenir LT Std',
            android:'AvenirLTStd-Medium'
        })
        }
  });
  row.add(labelDate);
  
  tableData.push(row);
}

var tableView = Ti.UI.createTableView({
  backgroundColor:'transparent',
  data:tableData,
  top:'6%'
});

win.add(tableView);
return win;
//win.open();	
	//self.add(btn1);
	//return self;
}
module.exports = EventosAndroid;
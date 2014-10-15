function Index2(){
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
	
	var self = Titanium.UI.createWindow({
		backgroundColor :'white',
		exitOnClose: true,
		layout :'vertical'
	});

	var btn1= Titanium.UI.createButton({		
		backgroundColor:'#0F5E8B',
		height:'30',
		tintColor:'white',
		title:'REGISTRO'		
	});
	var btn2= Titanium.UI.createButton({		
		backgroundColor:'#0F5E8B',
		height:'30',
		tintColor:'white',
		title:'				 SEDE 			'		
	});
	var btn3= Titanium.UI.createButton({		
		height:'30',
		backgroundColor:'#0F5E8B',
		tintColor:'white',
		title:' SALIR	 '		
	});
	btn3.addEventListener('click',function (e){
		Ti.API.info('Click en el botòn Salir');	
		self.close();
		var activity = Titanium.Android.currentActivity;
			activity.finish();
			self.activity.finish();
	});
		
	var label1 = Titanium.UI.createLabel({
		heigth:'200px',
		width:'400px',
		tintColor:'black',
		top:20,
		left:70,
		//backgroundImage:separadorImg+'ui/images/noticias.png',
		text:"Noticias Importantes"
	});
	self.add(btn1);
	self.add(btn2);
	self.add(btn3);
	self.add(label1);	
	return self;
}
module.exports = Index2;
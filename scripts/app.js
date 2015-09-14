var imageEncryptor = (function(){

	function init(){
		document.body.addEventListener('touchend',imageEncryptor.controller.notify,false);
		document.body.addEventListener('touchmove',imageEncryptor.util.isScrolling,false);
		imageEncryptor.controller.subscribe('touchend',imageEncryptor.filesystem.beginBrowseForFiles);
		imageEncryptor.controller.subscribe('touchend',imageEncryptor.filesystem.directoryUp);
		imageEncryptor.controller.subscribe('touchend',imageEncryptor.filesystem.openFile);
	}

	return{
		init:init
	}
})();
imageEncryptor.filesystem = (function(){
	
	// //{"name":"persistent","root":{"isFile":false,"isDirectory":true,"name":"sdcard0","fullPath":"file:///storage/sdcard0","filesystem":null}}
	var _currentFileSystem = null;
	
	// 1
	function beginBrowseForFiles(e){
		// check subscription type
		if (e.target.attributes['data-action'].nodeValue != 'beginBrowseForFiles'){
			return;
		}
		
		if (!e.target.attributes['data-path']){
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, requestFileSystemSuccess, null);
		} else {
			// this is used to get subdirectories
			var path = e.target.attributes['data-path'].nodeValue;
		    window.resolveLocalFileSystemURI(path, 
		    	function(filesystem){
				// we must pass what the PhoneGap API doc examples call an "entry" to the reader
				// which appears to take the form constructed below.
		    		requestFileSystemSuccess({root:filesystem});
		    	},
				function(err){
					// Eclipse doesn't let you inspect objects like Chrome does, thus the stringify
					console.log('### ERR: filesystem.beginBrowseForFiles() -' + (JSON.stringify(err)));
				}
		    );
		}
	}
	// 2
	function requestFileSystemSuccess(fileSystem){
		// this is our filesystem object
		//{"name":"persistent","root":{"isFile":false,"isDirectory":true,"name":"sdcard0","fullPath":"file:///storage/sdcard0","filesystem":null}}
		// DirectorEntry object is the root object
		// console.log(JSON.stringify(fileSystem));
		// pop path
		document.getElementById('folderName').innerHTML = fileSystem.root.fullPath;
		// create a directory reader
		_currentFileSystem = fileSystem;
		var directoryReader = fileSystem.root.createReader();

		// Get a list of all the entries in the directory
		directoryReader.readEntries(directoryReaderSuccess,fail);
	}
	// 3 - list entries
	function directoryReaderSuccess(entries){
		// array of directory entry objects taking this form:
		// {isFile:false,isDirectory:true,name:'str',fullPath:'file:///storage/sdcard0',filesystem:null}
		
		// sort entries
		entries.sort(function(a,b){return (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)});
		
		//console.log(JSON.stringify(entries));
		var list = '<ul>';
		
		for (var i=0;i<entries.length;i++){
			list += '<li><div class="rowTitle" data-action="' + (entries[i].isFile ? 'selectFile' : 'beginBrowseForFiles') + '" \
						 data-type="' + (entries[i].isFile ? 'file':'directory') + '" \
						 data-path="' + entries[i].fullPath + '">' + entries[i].name + '</div>\
						 <div class="alginIconInRow">\
						 <img data-path="' + entries[i].fullPath + '" \
							  data-action="' + (entries[i].isFile ? 'openFile' : 'non') + '" \
							  src="images/' + (entries[i].isFile ? 'file':'folder') + '.png"></div>\
						 </li>';
		}
		if (entries.length === 0){
			list = '<h3>Empty Directory</h3>';
		}

		document.getElementById('body').innerHTML = list + '</ul>';
	}

	function directoryUp(e){
		if (e.target.attributes['data-action'].nodeValue != 'directoryUp'){
			return false;
		}
		doDirectoryUp();
	}
	
	function backButton(){
		doDirectoryUp();
	}
		
	function doDirectoryUp(){
		var path = _currentFileSystem.root.fullPath;
		
		window.resolveLocalFileSystemURI(path,
			function(entry){
				entry.getParent( 
					function(filesystem){
						requestFileSystemSuccess({root:filesystem});
					},
					function(err){
						console.log('### ERR: filesystem.directoryUp() getParent -' + (JSON.stringify(err)));
					}
				);
			},
			function(err){
				console.log('### ERR: filesystem.directoryUp() -' + (JSON.stringify(err)));
			}
		);
	}
	
    function readDataUrl(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            console.log("Read as data URL");
            console.log(evt.target.result);
        };
        reader.readAsDataURL(file);
    }
	
    function fail(evt) {
        console.log(evt.target.error.code);
    }
    
	function openFile(){
		// nothing
	}
	
	return {
		readDataUrl:readDataUrl,
		beginBrowseForFiles:beginBrowseForFiles,
		directoryUp:directoryUp,
		backButton:backButton,
		openFile:openFile
	}
	
})();
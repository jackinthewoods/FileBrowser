imageEncryptor.controller = (function(){
	var subscriptions = {};
	
	function subscribe(eType,callback){
		if (!subscriptions.hasOwnProperty(eType)){
			subscriptions[eType] = [];
		}
		subscriptions[eType].push(callback);
	}
	
	function notify(e){
		if (imageEncryptor.util.getScrollingFlag()){
			imageEncryptor.util.touchHasEnded();
			return false;
		}
		if (!e.target.attributes['data-action']){
			return false;
		}
		var cbs = subscriptions[e.type];
		for (var i=0;i<cbs.length;i++){
			cbs[i](e);
		}
	}
	
	return {
		subscribe:subscribe,
		notify:notify
	}
})();
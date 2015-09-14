imageEncryptor.util = (function(){

	var _isScrolling = false;
	var _hasTouchEnded = false;
	var _loopUntilReset = null;
	
	function isScrolling(e){
		_isScrolling = true;
		if (!_loopUntilReset){
			_loopUntilReset = setInterval(function(){
				if (_hasTouchEnded){
					_isScrolling = false;
					_hasTouchEnded = false;
					clearInterval(_loopUntilReset);
					_loopUntilReset = null;
				}
			},300);
		} 
	}
    function touchHasEnded(){
    	_hasTouchEnded = true;
    }
    function getScrollingFlag(){
    	return _isScrolling;
    }
    
    return{
    	isScrolling:isScrolling,
    	touchHasEnded:touchHasEnded,
    	getScrollingFlag:getScrollingFlag
    }
	
})();
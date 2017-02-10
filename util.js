//Util.js
(function(window){
    function _util(){};
    _util.prototype={
        /**
        *字符串替换
        *
        */
        LangSub:function(){
            
        },
        RandomRange:function(m,n){
            return (parseInt(Math.random()*(n-m))+m);
        },
        MixArray:function(array){
            return array.sort(function(){
                return Math.random()-0.5;
            });
        },
        isArrayExit:function(array,n){
            for(var i=0;i<array;i++){
                if(array[i]==n){
                    return true;
                }
            }
            return false;
        },
        arrayUnique:function(array){
            var _array=[];
            for(var i=0;i<array.length;i++){
                
                if(array[i]===array)
            }
        },
        numberToDouble:function(n){
            return n<10?'0'+n:n;
        },
        serialize:function(obj){
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
                  
             for(name in obj) {
              value = obj[name];
                
              if(value instanceof Array) {
                for(i=0; i<value.length; ++i) {
                  subValue = value[i];
                  fullSubName = name + '[' + i + ']';
                  innerObj = {};
                  innerObj[fullSubName] = subValue;
                  query += serialize(innerObj) + '&';
                }
              }
              else if(value instanceof Object) {
                for(subName in value) {
                  subValue = value[subName];
                  fullSubName = name + '[' + subName + ']';
                  innerObj = {};
                  innerObj[fullSubName] = subValue;
                  query += serialize(innerObj) + '&';
                }
              }
              else if(value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }
                  
            return query.length ? query.substr(0, query.length - 1) : query;
        },
        
        extend:function(){
            
        },
        
        deepExtend:function(){
            
        }
    };
   
    function util(){
		return new _util();
	};
    window.ut=util();
    
})(window);



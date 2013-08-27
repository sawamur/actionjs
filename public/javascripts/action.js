

function moduleFoo(){

    function action(func,params){
        var f,
            beforeFilters = [],
            afterFilters = [],
            otherwise = function(){};

        f = function(){
            var tf = true,
                res,
                i,len;

            beforeFilters.reverse();
            for( i = beforeFilters.length; i > 0 ; i-- ){
                tf = beforeFilters[0].call(this,params);
            }
            if(tf){
                res = func(params);
            } else {
                otherwise(params);
            }
            afterFilters.reverse();
            for( i = afterFilters.length; i > 0 ; i-- ){
                res = afterFilters[0].call(this,res);
            }
        };

        f.before  = function(func){
            beforeFilters.push(func);
            return f;
        };

        f.after = function(func){
            afterFilters.push(func);
            return f;
        };
        f.otherwise = function(func){
            otherwise = func;
            return f;
        };
        
        return f;
    }

    return {action: action} ;
}



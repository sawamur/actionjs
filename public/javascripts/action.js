

function action(func,params){
    var f,
        beforeFilters = [],
        afterFilters = [],
        otherwise = function(){};

    f = function(){
        var tf = true,
            res,
            i,len;


        for( i = 0,len = beforeFilters.length; tf && i < len ; i++ ){
            tf = beforeFilters[0].call(this,params,func);
        }
        if(tf){
            res = func(params);
        } else {
            otherwise(params,func);
        }

        for( i = 0,len = afterFilters.length; i < len; i++ ){
            res = afterFilters[0].call(this,res,func);
        }
        return res;
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



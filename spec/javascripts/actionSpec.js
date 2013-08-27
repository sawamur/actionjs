describe("action", function() {
  
  it("kick action",function(){
    var called = false,
      calledParams = {},
      passedParams = {};
    function func1(params){
      calledParams = params;
      called = true;
      return {a:2};
    }
    function bef(params){
      return true;
    }
    function af(params){
      passedParams = params;
    }
    action(func1,{opt:1}).before(bef).after(af)();

    expect(called).toBeTruthy();
    expect(calledParams).toEqual({opt:1});
    expect(passedParams).toEqual({a:2});
  });

  it("can stop action",function(){
    var called = false,
      calledParams = {},
      passedParams = {};
    function func1(params){
      calledParams = params;
      called = true;
      return {a:2};
    }
    function bef1(params){
      return false;
    }
    function bef2(params){
      return true;
    }
    action(func1,{opt:1}).before(bef1).before(bef2)();

    expect(called).toBeFalsy();
  });


  it("can change paramter to pass to main func",function(){
        var called = false,
            calledParams = {},
            passedParams = {};
  
    function func1(params){
      calledParams = params;
      called = true;
      return {a:2};
    }
    function bef(params){
      params.opt = 1000;
      return true;
    }
    function af(params){
      passedParams = params;
    }
    action(func1,{opt:1}).before(bef).after(af)();

    expect(called).toBeTruthy();
    expect(calledParams).toEqual({opt:1000});
  });

 it("can accept original func as 2nd param",function(){
    var secondParamBf = false,
        secondParamAf = false,
        that = {};

    function func1(params){
    }
    that.func1 = func1;

    function bef(params,originalFunc){
      secondParamBf = originalFunc;
      return true;
    }

    function af(params,originalFunc){
      secondParamAf = originalFunc;
      return true;
    }
    action(that.func1,{opt:1}).before(bef).after(af)();
    expect(secondParamBf).toEqual(func1);
    expect(secondParamAf).toEqual(func1);
  });

  it("can kick otherwise",function(){
        var called = false,
            calledParams = {},
            passedParams = {};
  
    function func1(params){
      calledParams = params;
      called = true;
      return {a:2};
    }
    function bef(params){
      return false;
    }
    function ot(params){
      passedParams = params;
    }
    action(func1,{opt:1}).before(bef).otherwise(ot)();

    expect(called).toBeFalsy();
    expect(passedParams).toEqual({opt:1});
  });  

  it("is valid for spy",function(){
        var that = {};
  
    function func1(params){
      return 1;
    }
    that.func1 = func1;

    function bef(params){
      params.b = 10
      return true;
    }
    function af(params){
      passedParams = params;
    }
    spyOn(that,"func1");

    action(that.func1,{opt:1}).before(bef).after(af)();
    expect(that.func1).toHaveBeenCalled();
    expect(that.func1).toHaveBeenCalledWith({opt:1,b: 10});
  });
});

# action.js

apply filters before and  after the action


```
action(func1,{opt:"foo"}).before(foo1).before(foo2).after(bar1)();
```

## Filters

### Before filters

You can set multipule before filters. Each filters will be called with original parameters. Which mean if you write as follows

```javascript
action(foo,{ bar: 2}).before(zoo)();
```

Your `zoo` function will catch `{bar:2}`. 
To kick main function (in this case `foo`) , you must return true for each before filters. In other word you can prevent the function by returning false.

```javascript
function fi(p){
   return false;
}
action(foo,{}).before(fi)(); // you never call foo
```

You can modify original paramters within before filters.

```javascript
function birthday(p){
   p.age ++;
   return true;
}
action(bar,{age:10}).before(birthday)();
// bar will be called with { age : 11 };
```

You can specify arbitrary numbers of filters. 

```javascript
actiion(foo,{}).before(f1).before(f2).before(f3)();
```

Filters will be called in specified order; ie. f1,f2 then f3.


### After filters

After filters will be called with returning parameters from main function

```javascript

function af(p){
   return p;
}

function main(p){
   return { foo: "bar"};
}

action(main,{}).after(af)();
// af will be called with { foo: "bar"};

```

### Otherwise

If you want to do something another when it stops on one of before filters, you can specify `otherwise`.

```javascript
function foo(p){
    cosole.log("action canceled");
}
function fl(p){
   return false;
}
action(foo,{}).before(fl).otherwise(foo)();
// => "action canceled"
```



## Testing

```
$ bundle install --path=foo
$ bundle exec rake jasmine
# acccess http://localhost:8888/
```

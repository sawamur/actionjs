# action.js

appy filters before and  after the action


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
To kick main function, you must return true for each before filter. In other word you can prevent the function by returning false.

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

### after filters

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



## Testing

```
$ bundle install --path=foo
$ bundle exec rake jasmine
# acccess http://localhost:8888/
```

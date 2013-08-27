
# action.js

appy filters before and  after the action


```
action(func1,{opt:"foo"}).before(foo1).before(foo2).after(bar1)();
```

## Testing

```
$ bundle install --path=foo
$ bundle exec rake jasmine
# acccess http://localhost:8888/
```

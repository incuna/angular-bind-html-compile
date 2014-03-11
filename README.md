`bind-html-compile` allows for HTML containing directives to be compiled.

You should only use this directive where the content is coming from a trusted
source.

`ng-bind-html`:
```
<div ng-bind-html="data.content"></div>
```

If the `data.content` contained a directive, it would not be compiled.

`bind-html-compile`:
```
<div bind-html-compile="data.content"></div>
```

# angular typed
Angular typed plugin. It is angular directive which add typing animation to words

#Example
https://jsfiddle.net/kyvo8qon/

# Install

```sh
bower install angular-typed --save
```

or just grab dist/angular-typed.js

# Usage

```javascript
//include it in your app
angular.module('myapp', ['angularTyped']);


```

CSS required for display. It should be added to your app css.
```css

.is-hidden, .out {
  display: none;
}
.is-visible, .in {
  display: inline-block;
}
.typed-cursor {
  -khtml-opacity: 1;
  -moz-opacity: 1;
  opacity: 1;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
  filter: alpha(opacity=100);
  -webkit-animation: blink 0.7s infinite;
  -moz-animation: blink 0.7s infinite;
  -o-animation: blink 0.7s infinite;
  animation: blink 0.7s infinite;
  color: #e2328f;
}

@-webkit-keyframes blink {
  0% {
    -khtml-opacity: 1;
    -moz-opacity: 1;
    opacity: 1;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: alpha(opacity=100);
  }
  50% {
    -khtml-opacity: 0;
    -moz-opacity: 0;
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
  100% {
    -khtml-opacity: 1;
    -moz-opacity: 1;
    opacity: 1;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: alpha(opacity=100);
  }
}
@-moz-keyframes blink {
  0% {
    -khtml-opacity: 1;
    -moz-opacity: 1;
    opacity: 1;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: alpha(opacity=100);
  }
  50% {
    -khtml-opacity: 0;
    -moz-opacity: 0;
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
  100% {
    -khtml-opacity: 1;
    -moz-opacity: 1;
    opacity: 1;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: alpha(opacity=100);
  }
}
@-moz-keyframes blink {
  0% {
    -khtml-opacity: 1;
    -moz-opacity: 1;
    opacity: 1;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: alpha(opacity=100);
  }
  50% {
    -khtml-opacity: 0;
    -moz-opacity: 0;
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
  100% {
    -khtml-opacity: 1;
    -moz-opacity: 1;
    opacity: 1;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: alpha(opacity=100);
  }
}
@-webkit-keyframes blink {
  0% {
    -khtml-opacity: 1;
    -moz-opacity: 1;
    opacity: 1;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: alpha(opacity=100);
  }
  50% {
    -khtml-opacity: 0;
    -moz-opacity: 0;
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
  100% {
    -khtml-opacity: 1;
    -moz-opacity: 1;
    opacity: 1;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: alpha(opacity=100);
  }
}
@-o-keyframes blink {
  0% {
    -khtml-opacity: 1;
    -moz-opacity: 1;
    opacity: 1;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: alpha(opacity=100);
  }
  50% {
    -khtml-opacity: 0;
    -moz-opacity: 0;
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
  100% {
    -khtml-opacity: 1;
    -moz-opacity: 1;
    opacity: 1;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: alpha(opacity=100);
  }
}
@keyframes blink {
  0% {
    -khtml-opacity: 1;
    -moz-opacity: 1;
    opacity: 1;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: alpha(opacity=100);
  }
  50% {
    -khtml-opacity: 0;
    -moz-opacity: 0;
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
  100% {
    -khtml-opacity: 1;
    -moz-opacity: 1;
    opacity: 1;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: alpha(opacity=100);
  }
}

```
```html
<div typed>
	<span>Hello</span>
	<span>Hi</span>
	<span>Labas</span>
</div>


```

# Development

## Install

```sh
npm install gulp-cli -g
npm install
```

## Build

```sh
gulp build
```

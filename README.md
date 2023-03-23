# NuInputElement

[![Apache License 2.0](https://img.shields.io/badge/license-Apache%202.0-red.svg?logo=Apache)](http://www.apache.org/licenses/)
![Webpack](https://img.shields.io/badge/Webpack-%5E5.74.0-%238DD6F9?logo=Webpack)


A package of Input Web Components

## Why called this name

This package is to create input components which support in all morden browsers.

In Chinese, “all” is 「所有」. 

Also, on the Zhuyin keyboard, 「所有」is “nji3 u.3”. To take the first letter of both is “NU”.

## Usage

### Embed the Script

#### All Inputs

If you want to embled all inputs, please use the `src/main.js` (if you want to embed as js module) or `dist/main.js` (if you want to embed as js script).

For example, to use as js script: 

```
<head>
	<script src="dist/main.js"></script>
</head>
<body>
	<form>
		<nu-time-input name="start-date" value="12:13"></<nu-time-input>
	</form>
</body>
```

## Browser Support

This project use Private fields. In other words, only browsers support private fields can run NuInputElement normally.

Please check [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields#browser_compatibility) to see the browser compatibility.


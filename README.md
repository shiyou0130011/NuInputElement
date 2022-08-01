# NuInputElement

The package of Input Web Components

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


const path = require('path');
const fs = require('fs');

// get all 'files' in this directory filter directories
function getFiles(dir) {
	return fs.readdirSync(dir).filter(file => {
		console.debug(file)
		return fs.statSync(`${dir}/${file}`).isFile()
	})
}

const config = {
	entry: {},
	mode: "production",
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './dist'),
	},
	devtool: "source-map",
}

getFiles(path.resolve(__dirname, './src')).forEach(function (file) {
	if (path.extname(file) == ".js") {
		config.entry[path.basename(file, ".js")] = "./src/" + file
	}
})


module.exports = (env, argv) => {
	switch (argv.mode) {
		case "none":
		case "development":
		case "production":
			config.mode = argv.mode
			break
		default:
			config.mode = "production"

	}

	return config
}



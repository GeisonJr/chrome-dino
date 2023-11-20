const { readdirSync, statSync, readFileSync, writeFileSync } = require('fs')
const { basename, extname, join } = require('path')

function convertJSFilesInDirectory(directoryPath) {

	const dir = readdirSync(directoryPath)
	for (const item of dir) {
		const itemPath = join(directoryPath, item)
		const itemStat = statSync(itemPath)

		// If it's a directory, recurse
		if (itemStat.isDirectory()) {
			convertJSFilesInDirectory(itemPath)

			// If it's a .js file, perform the conversions based on directory name
		} else if (itemStat.isFile() && extname(itemPath) === '.js') {

			// Edit file contents
			const fileContents = readFileSync(itemPath, 'utf8')

			const newContent = fileContents.replace(/(import .* from) \'(.*)\';/g, '$1 \'$2/index.js\';')

			// Write file contents
			writeFileSync(itemPath, newContent, 'utf8')
		}
	}
}

convertJSFilesInDirectory('./public/javascript')

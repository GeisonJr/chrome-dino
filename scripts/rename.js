const { readdirSync, renameSync, statSync } = require('fs')
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
			const fileExt = extname(item)

			const isCjs = directoryPath.includes('cjs')
			const isEsm = directoryPath.includes('esm')
			const targetExt = isCjs ? '.cjs' : isEsm ? '.mjs' : '.js'

			const filePath = join(directoryPath, basename(item, fileExt) + targetExt)

			renameSync(itemPath, filePath)
		}
	}
}

convertJSFilesInDirectory('./public/javascript')
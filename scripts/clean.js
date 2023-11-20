const { rmSync } = require('fs')

rmSync('./public/javascript', {
	recursive: true,
	force: true
})
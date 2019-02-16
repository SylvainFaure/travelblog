import path from 'path'
import string from 'lodash/string'

const services = angular.module(`${name}.services`, [])

require.context("./", true, /^((?!_.js).)*.js$/).keys().forEach((key) => {
    debugger
	let basename = path.basename(key,'.js')
	let name = string.camelCase(basename);
	name = string.upperFirst(name);
	let service = require(`${key}`).default
	services.service(name, service)
});

export default services.name
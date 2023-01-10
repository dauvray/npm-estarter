import {upperFirst} from '../../services/helpers.js'

let EstarterComponents = {}
const coreFields = import.meta.glob("./*.vue", {eager: true})
// recursif : const coreFields = import.meta.glob("./**/*.vue", {eager: true})

for (const path in coreFields) {
    let compName = upperFirst(path.replace(/^\.\//, "").replace(/\.vue/, "").split('/').pop())
    EstarterComponents[compName] = coreFields[path].default
}

export default EstarterComponents


/* import Reverse from 'lodash/reverse'

const modulesCache = {}
const storeData = {}

// Allow us to dynamically require all Vuex module files.
// https://webpack.js.org/guides/dependency-management/#require-context
const requireModule = require.context(
    // Search for files in the current directory.
    '.',
    // Search for files in subdirectories.
    true,
    // Include any .js files that are not this file or a unit test.
    /^((?!index|\.unit\.).)*\.vue$/
)

// For every View module...
requireModule.keys().forEach((fileName) => {

    const moduleDefinition = requireModule(fileName)

    // Skip the module during hot reload if it refers to the
    // same module definition as the one we have cached.
    if (modulesCache[fileName] === moduleDefinition) return

    // Update the module cache, for efficient hot reloading.
    modulesCache[fileName] = moduleDefinition

    // Get the path and remove the file extension from the end.
    const modulePath = fileName.replace(/\.\w+$/, '')

    // Get the module path as an array.
    const moduleName = fileName
    // Remove the "./" from the beginning.
        .replace(/^\.\//, '')
        // Remove the file extension from the end.
        .replace(/\.\w+$/, '')
        // Split nested modules into an array path.
        .split(/\//)

    Reverse(moduleName);

    storeData[`${moduleName[0]}`] = () => import(`${modulePath}`)

})

export default storeData
 */

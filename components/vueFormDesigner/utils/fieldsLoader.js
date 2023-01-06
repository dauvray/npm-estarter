import {upperFirst} from './helpers.js'

let fieldComponents = {}
const coreFields = import.meta.glob("../fields/core/*.vue", {eager: true})

  for (const path in coreFields) {
    let compName = upperFirst(path.replace(/^\.\//, "").replace(/\.vue/, "").split('/').pop())
      fieldComponents[compName] = coreFields[path].default

  }

export default fieldComponents

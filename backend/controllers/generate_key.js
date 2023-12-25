const crpyto = require('crypto')

const key1 = crpyto.randomBytes(32).toString('hex')

const key2 = crpyto.randomBytes(32).toString('hex')

console.table({key1, key2})
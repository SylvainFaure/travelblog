
const app = require('express')()
const port = process.env.PORT || 3001;
const path = require('path');
const { Nuxt, Builder } = require('nuxt')
const config = require('../nuxt.config.js')
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
 const builder = new Builder(nuxt)
 builder.build()
} 
app.use(nuxt.render);

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})
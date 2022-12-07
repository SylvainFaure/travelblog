// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3000;
// const path = require('path');

// /** MIDDLEWARES **/
// const corsMiddleware = require('./middleware/cors');
// const bodyParser = require('body-parser');
// const tokenMiddleware = require('./middleware/token');
// const errorMiddleware = require('./middleware/error');

// /** ROUTES **/
// const articlesRouter = require('./routes/articles');
// const travelsRouter = require('./routes/travels');
// const usersRouter = require('./routes/users');
// const assetsRouter = require('./routes/assets');
// const anecdotesRouter = require('./routes/anecdotes');
// const categoriesRouter = require('./routes/categories');
// const settingsRouter = require('./routes/settings');

// /** STATIC FILES **/
// app.use('/', express.static('admin'));

// /** MIDDLEWARES **/
// if (app.get("env") === 'development') {
//   app.use(corsMiddleware);
// }
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(tokenMiddleware);

// /*** ROUTES ****/
// app.use('/api/articles', articlesRouter);
// app.use('/api/travels', travelsRouter);
// app.use('/api/users', usersRouter);
// app.use('/api/assets', assetsRouter);
// app.use('/api/settings', settingsRouter);
// app.use('/api/anecdotes', anecdotesRouter);
// app.use('/api/categories', categoriesRouter);

// app.use(errorMiddleware);

// app.listen(port, () => {
//   console.log(`Listening on port ${port}!`)
// })
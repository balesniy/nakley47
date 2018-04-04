const Koa = require('koa');
const app = new Koa();
const mongoose = require('./libs/mongoose');


const config = require('config');
const session = require('koa-session');
// const MongooseStore = require('koa-session-mongoose');


app.keys = [config.secret];
app.use(session(app))

// (async function init () {
//     const connection = await mongoose;
//
//     app.use(session({
//         store: new MongooseStore({
//             collection: 'appSessions',
//             connection: connection,
//             expires: 86400, // 1 day is the default
//             name: 'AppSession'
//         })
//     }, app));
// }());

const path = require('path');
const fs = require('fs');
const middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

middlewares.forEach(function(middleware) {
    app.use(require('./middlewares/' + middleware));
});


const Router = require('koa-router');
const router = new Router();
// const User = require('./libs/user');
// const Auto = require('./libs/auto');

router.get('/', require('./routes/frontpage').get);
router.post('/login', require('./routes/login').post);
router.post('/logout', require('./routes/logout').post);

app.use(router.routes());

app.listen(3000);
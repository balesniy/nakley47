
// Parse application/json, application/x-www-form-urlencoded
// ctx.body = ctx.request.body;
// NOT form/multipart!
const bodyParser = require('koa-bodyparser');
module.exports = bodyParser();

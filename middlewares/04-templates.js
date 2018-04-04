const pug = require('pug');
const config = require('config');
const path = require('path');

module.exports = async function (ctx, next) {

    /* default helpers */
    ctx.locals = {
        /* at the time of this middleware, user is unknown, so we make it a getter */
        get user() {
            return ctx.req.user; // passport sets this
        },

        get flash() {
            return ctx.flash();
        },
        get csrf() {
            return ctx.csrf
        }
    };



    // ctx.locals.csrf = function() {
    //     // function, not a property to prevent autogeneration
    //     // pug touches all local properties
    //     return ctx.req.user ? ctx.csrf : null;
    // };

    ctx.render = function(templatePath, locals) {
        locals = locals || {};
        // use inheritance for all getters to work
        const localsFull = Object.create(ctx.locals);

        for(let key in locals) {
            localsFull[key] = locals[key];
        }

        const templatePathResolved = path.join(config.template.root, templatePath + '.pug');

        return pug.renderFile(templatePathResolved, localsFull);
    };

    await next();

};
// recieve multipart/form
// without files????

// for routes which require custom file handling
// can introduce config to ignore them here

const busboy = require('co-busboy');



module.exports = async function (ctx, next) {
  // the body isn't multipart, so busboy can't parse it
  if (!ctx.request.is('multipart/*')) {
    return await next();
  }

  const parser = busboy(ctx, {
    autoFields: true
  });

    // var parts = parse(this, {
    //     checkField: function (name, value) {
    //         if (name === '_csrf' && !checkCSRF(ctx, value)) {
    //             var err =  new Error('invalid csrf token')
    //             err.status = 400
    //             return err
    //         }
    //     }
    // })
  
  let fileStream;

  while (fileStream = await parser()) {
    // autoFields => part is a file
    // specific handlers know how to handle the file, not us
    // alt: can auto-save to disk
    ctx.throw(400, "Files are not allowed here");
  }

  // copy normal fields from parser to this.request.body
  const body = ctx.request.body;

  for (let [name, val, fieldnameTruncated, valTruncated] of parser.fields) {
    if (body[name]) { // same value already exists
      if (!Array.isArray(body[name])) { //  convert to array
        body[name] = [body[name]];
      }
      body[name].push(val);
    } else {
      body[name] = val;
    }
  }

  await next();
};

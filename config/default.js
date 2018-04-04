const root = process.cwd();
const path = require('path');

module.exports = {
    // secret data can be moved to env variables
    // or a separate config
    secret: 'mysecret',
    root,
    template: {
        // template.root uses config.root
        root: path.join(root, 'templates')
    },
    crypto: {
        hash: {
            length:     128,
            // may be slow(!): iterations = 12000 take ~60ms to generate strong password
            iterations: process.env.NODE_ENV === 'production' ? 12000 : 1
        }
    },
};
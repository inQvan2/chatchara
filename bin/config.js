class Config {
    constructor(app) {
        app.use(require('express').static(require('path').join('')));
    }
}

module.exports = Config;
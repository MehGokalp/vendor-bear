const glob = require('glob');
const path = require('path');

module.exports = (exp) => {
    glob.sync(exp).forEach(file => require(path.join(__dirname, file)))
};

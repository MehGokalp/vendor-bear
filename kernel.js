const loader = require('./loader');
loader('models/**.js');
loader('domain/**/*.js');
require('dotenv').config();

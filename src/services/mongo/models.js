const debug = require('debug')(`server:${__filename}`);

// User model
require('../../api/components/user/model')

debug("Mongoose models successfully compiled")
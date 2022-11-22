const express = require('express');
const router = express.Router();
const message = require('../controllers/message.js');
router.get('/', message.getMessages);
router.post('/', message.sendMessage);
module.exports = router;
//# sourceMappingURL=message_route.js.map
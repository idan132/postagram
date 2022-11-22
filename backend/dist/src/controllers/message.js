"use strict";
const getMessages = (req, res) => {
    res.send('get messages');
};
const sendMessage = (req, res) => {
    res.send('create message');
};
module.exports = { getMessages, sendMessage };
//# sourceMappingURL=message.js.map
const getMessages = (req,res,next) =>{
    res.send('get messages')
}

const sendMessage = (req,res,next)=>{
    res.send('create message')
}

module.exports = {getMessages, sendMessage}
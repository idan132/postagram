const getMessages = (req,res) =>{
    res.send('get messages')
}

const sendMessage = (req,res)=>{
    res.send('create message')
}

export = {getMessages, sendMessage}
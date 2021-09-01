// Drive Api
const {google} = require('googleapis')
const path = require('path')
const fs = require('fs')
const formidable = require('formidable')
require('dotenv').config()

// OAuth2
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
)
// Rfresh Token
oauth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})
// Set Drive
const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

module.exports = {
    
    index: function (req, res){
        res.render('index')
    },
    
    create: async function (req, res){
        const body = req.body
        
        const filePath = path.join(process.cwd()+'/resources/docs/', 'NOTICE.txt')
        const fleExten = path.extname(filePath)
        
        let _mimeType;
        switch (fleExten) {
            case '.doc':
                _mimeType = 'application/msword'
                break;
            case '.docx':
                _mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                break;
            case '.pdf':
                _mimeType = 'application/pdf'
                break;
            default:
                _mimeType = 'application/msword'
                break;
        }
        
        try {
            const response = await drive.files.create({
                requestBody:{
                    name: 'GTC_Application',
                    mimeType: _mimeType
                },
                media:{
                    mimeType: _mimeType,
                    body: fs.createReadStream(filePath)
                }
            })
            console.log(response.data)
            res.send(response.data)
        } catch (error) {
            console.log(error.message)
            res.send(response.data)
        }

    },

}

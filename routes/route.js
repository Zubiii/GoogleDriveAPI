// Call Controller
const GoogleDriveController = require('../controller/GoogleDriveController')


module.exports = (app) => {
    
    app.get('/', GoogleDriveController.index)
    app.post('/', GoogleDriveController.create)
    
}
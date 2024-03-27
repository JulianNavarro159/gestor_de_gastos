const { Router } = require('express');
const authRouter = Router()
const userExtractor = require('../middleware/userExtractor')
const { admin } = require('../middleware/rolsExtractor')
const path = require('path')
const multer = require('multer')

console.log('hola');

const storage = multer.diskStorage({
    destination: function (req,file, cb) {
        const uploadDir = path.join(__dirname, '../../uploads');
        cb(null, uploadDir);
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      }
})

const upload = multer({storage: storage})
// traigo los handlers

const { loginHandler,registerHandler, updateHandler, getUsers, authenticationFromGoogle,deleteUser, restoreUser } = require('../controllers/handlersUser/authHandler')

// rutas

authRouter.get('/users',admin, getUsers)
authRouter.post('/login', loginHandler)
authRouter.post('/register', registerHandler)
authRouter.post('/fromGoogle', authenticationFromGoogle)

authRouter.put('/userUpdate/:id', userExtractor, upload.single('image'), updateHandler)
authRouter.delete('/user/:id', userExtractor, deleteUser)
authRouter.post('/user/restore/:id',userExtractor, restoreUser)

module.exports = authRouter
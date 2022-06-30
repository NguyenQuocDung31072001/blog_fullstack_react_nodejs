const express=require('express')
const router=express.Router()
const accountController=require('../controller/account.controller')

router.post('/register',accountController.register)
// router.post('/login',accountController.login)
// router.post('/logout',accountController.logout)

// router.put('/update',accountController.updateAccount)
// router.delete('/delete',accountController.deleteAccount)



module.exports = router
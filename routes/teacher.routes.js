const express =require('express')
const {getAll,createNew} = require('../controllers/teacher.controller.js')
const router = express.Router()

router.get('/list_all',getAll)

router.post('/add_new',createNew)

module.exports = router
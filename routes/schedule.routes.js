const express = require('express')
const {getAll,createNew,updateIt,deleteIt} = require('../controllers/schedule.controller.js')
const router = express.Router()

router.get('/list_all',getAll)

router.post('/add_new',createNew)

router.post('/update',updateIt)

router.post('/delete',deleteIt)

module.exports = router
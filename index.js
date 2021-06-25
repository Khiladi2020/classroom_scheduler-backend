const express = require('express')
const teacherRoutes = require('./routes/teacher.routes.js')
const scheduleRoutes = require('./routes/schedule.routes.js')
const app = express()
const port = 3000

app.use(express.json())
app.use('/teachers',teacherRoutes)
app.use('/schedules',scheduleRoutes)

app.get('/',(req,res)=>{
	res.send('Ravinder Here')
})

app.listen(port,()=>{
	console.log(`Server listening at port ${port}`)
})
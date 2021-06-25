const db = require('./db.js')

//constructor
const Teacher = function(data){
	this.id = data.id || ""
	this.name = data.name ,
	this.bd = data.birth_date ,
	this.gen = data.gender_id ,
	this.ph = data.contact_phone || "",
	this.em = data.contact_email || ""

	this.to_list = function(){
		return [this.name,this.bd,this.gen,this.ph,this.em]
	}
}

Teacher.listAll = function(callback){
	const sql = "SELECT * from teachers"
	db.query(sql,(err,results)=>{
		if(err){
			console.log("error: ",err)
			callback(err.message,null)
			return;
		}

		callback(null,results)
	})
} 

Teacher.prototype.create = function(callback){
	const sql = `INSERT INTO teachers(name,birth_date,gender_id,
					contact_phone,contact_email) VALUES (?,?,?,?,?)`
	db.query(sql,this.to_list(),(err,results)=>{
		if(err){
			console.log("error: ",err)
			callback(err.message,null)
			return;
		}

		callback(null,results.affectedRows)
	})
}

module.exports = Teacher
const db = require("./db.js");

//constructor
const Schedule = function (data) {
	this.id = data.schedule_id || "";
	this.tpc = data.topic;
	this.scd_dt = data.scheduled_date;
	this.st_tm = data.start_time;
	this.en_tm = data.end_time;
	this.tch_id = data.teacher_id;

	this.to_list = function (type) {
		if (type == "create")
			return [this.tpc, this.scd_dt, this.st_tm, this.en_tm, this.tch_id];
		else if (type == "update")
			return [this.tpc, this.scd_dt, this.st_tm, this.en_tm, this.id];
		else if(type == "delete")
			return [this.id]
		else if(type=="verify_clash")
			return [this.scd_dt,this.st_tm,this.st_tm,this.en_tm,this.en_tm,this.st_tm,this.en_tm]
	};
};

Schedule.listAll = function (callback) {
	const sql = "SELECT * from schedules";
	db.query(sql, (err, results) => {
		if (err) {
			callback(err.message, null);
			return;
		}
		callback(null, results);
	});
};

Schedule.prototype.verifyClash = function (callback) {
	const sql = `SELECT COUNT(*) AS count from schedules WHERE 
				(scheduled_date = ?) AND ((start_time<=? AND end_time >=?) OR 
				(start_time<=? AND end_time >=?) OR (start_time >=? AND end_time <=?)) `
	db.query(sql, this.to_list("verify_clash"), (err, results) => {
		if (err) {
			callback(err.message,null);
			return;
		}
		console.log('clash results: ',results,results[0].count)
		// return results[0].count;
		callback(null,results[0].count)
	});
};

Schedule.prototype.create = function (callback) {
	const sql = `INSERT INTO schedules(topic,scheduled_date,start_time,
					end_time,teacher_id) VALUES (?,?,?,?,?)`;
	db.query(sql, this.to_list("create"), (err, results) => {
		if (err) {
			callback(err.message, null);
			return;
		}
		callback(null, results.affectedRows);
	});
};

Schedule.prototype.update = function (callback) {
	const sql = `UPDATE schedules SET topic = ?,scheduled_date = ?,
				start_time = ?,end_time = ?	WHERE schedule_id = ?`;
	db.query(sql, this.to_list("update"), (err, results) => {
		if (err) {
			callback(err.message, null);
			return;
		}
		callback(null, results.affectedRows);
	});
};

Schedule.prototype.delete = function(callback){
	const sql = `DELETE FROM schedules WHERE schedule_id = ?`
	db.query(sql,this.to_list('delete'),(err,results)=>{
		if(err){
			callback(err.message,null)
			return;
		}
		callback(null,results.affectedRows)
	})
}

module.exports = Schedule;


//sql to check schedule clashing
// SELECT COUNT(*) from schedules WHERE (start_time<=st_tm AND end_time >=st_tm) OR 
// OR (start_time<=en_tm AND end_time >=en_tm) OR (start_time >=st_tm AND end_time <=en_tm) 
// let sql = `SELECT COUNT(*) from schedules WHERE (start_time<=? AND end_time >=?)
// 		OR (start_time<=? AND end_time >=?) OR (start_time >=? AND end_time <=?) `

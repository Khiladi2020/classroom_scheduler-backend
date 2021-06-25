const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

var connection = mysql.createPool({
	host:dbConfig.HOST,
	user:dbConfig.USER,
	password:dbConfig.PASSWORD,
	database:dbConfig.DATABASE,
})

module.exports = connection

// class Database {
// 	constructor() {
// 		this.con = mysql.createConnection(config);
// 	}

// 	query(sql, args) {
// 		return new Promise((resolve, reject) => {
// 			this.con.query(sql, args, (err, results, fields) => {
// 				if (err) return reject(err);
// 				resolve(results);
// 			});
// 		});
// 	}

// 	close() {
// 		return new Promise((resolve, reject) => {
// 			this.con.end((err) => {
// 				if (err) return reject(err);
// 				resolve();
// 			});
// 		});
// 	}
// }

// module.exports = Database;

const Teacher = require("../models/teacher.model.js");

exports.createNew = (req, res) => {
	console.log(req.body);
	//create teacher
	const teacher = new Teacher({
		name: req.body.name,
		birth_date: req.body.birth_date,
		gender_id: req.body.gender_id,
		contact_phone: req.body.contact_phone,
		contact_email: req.body.contact_email,
	});

	teacher.create((err, data) => {
		if (err) {
			res.status(400).send({
				message: "failure, unable to create teacher",
				error: err,
			});
		} else {
			res.send({
				message:'success, new teacher created',
				detail:data
			});
		}
	});
};

exports.getAll = (req, res) => {
	Teacher.listAll((err, data) => {
		if (err) {
			res.status(400).send({
				message: "failure, unable to get list of teachers",
				error: err,
			});
		} else {
			res.send(data);
		}
	});
};

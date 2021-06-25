const Schedule = require("../models/schedule.model.js");

exports.getAll = (req, res) => {
	Schedule.listAll((err, data) => {
		if (err) {
			res.status(400).send({
				message: "failure, unable to get list of schedules.",
				error: err,
			});
		} else {
			res.send(data);
		}
	});
};

exports.createNew = (req, res) => {
	const newSchedule = new Schedule({
		topic: req.body.topic,
		scheduled_date: req.body.scheduled_date,
		start_time: req.body.start_time,
		end_time: req.body.end_time,
		teacher_id: req.body.teacher_id,
	});

	// let clash_status = await newSchedule.verifyClash()
	newSchedule.verifyClash((err, data) => {
		if (err) {
			res.status(400).send({
				message: "failure, unable to create new schedule.",
				error: err,
			});
		} else {
			if(data != 0){
				res.status(400).send({
					message: "failure, unable to create schedule due to date/time clash",
					detail: data
				});
				return;
			}
			else{
				console.log(data)
				newSchedule.create((err, data) => {
					if (err) {
						res.status(400).send({
							message: "failure, unable to create new schedule.",
							error: err,
						});
					} else {
						res.send({
							message: "success, new schedule created.",
							detail: data,
						});
					}
				});
			}
		}
	})

	// if(clash_status){
	// 	res.status(400).send({
	// 		message:'failure, unable to create schedule due to date/time clash'
	// 	})
	// }

	// newSchedule.create((err, data) => {
	// 	if (err) {
	// 		res.status(400).send({
	// 			message: "failure, unable to create new schedule.",
	// 			error: err,
	// 		});
	// 	} else {
	// 		res.send({
	// 			message: "success, new schedule created.",
	// 			detail: data,
	// 		});
	// 	}
	// });
};

exports.updateIt = (req, res) => {
	const newSchedule = new Schedule({
		schedule_id: req.body.schedule_id,
		topic: req.body.topic,
		scheduled_date: req.body.scheduled_date,
		start_time: req.body.start_time,
		end_time: req.body.end_time,
		teacher_id: req.body.teacher_id,
	});

	newSchedule.update((err, data) => {
		if (err) {
			res.status(400).send({
				message: "failure, unable to update schedule.",
				error: err,
			});
		} else {
			res.send({
				message: "success, schedule updated.",
				detail: data,
			});
		}
	});
};

exports.deleteIt = (req,res)=>{
	const newSchedule = new Schedule({
		schedule_id: req.body.schedule_id
	})

	newSchedule.delete((err,data)=>{
		if (err) {
			res.status(400).send({
				message: "failure, unable to delete schedule.",
				error: err,
			});
		} else {
			res.send({
				message: "success, schedule deleted.",
				detail: data,
			});
		}
	})
}
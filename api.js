var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/priapus';
var db = pgp(connectionString);

function getAllReports(req, res, next) {
	db.any('select * from reports')
	.then(function (data) {
		res.status(200)
		.json({
			status: 'success',
			data: data,
			message: 'ALL reports'
		});
	})
	.catch(function (err) {
		return next(err);
	});
}

function getUnitReports(req, res, next) {
	var unit_id = req.params.unit_id;
	db.any("select * from reports where unit_id = 'charles';", unit_id)
	.then(function (data) {
		res.status(200)
		.json({
			status: 'success',
			data: data,
			message: 'unit reports for ' + req.params.unit_id
		});
	})
	.catch(function (err) {
		return next(err);
	});
}

function getReportByDate(req, res, next) {
	// var unit_id = req.params.unit_id;
	// var report_date = req.params.date;
	// db.one('select * from reports where unit_id = $1;', unit_id)
	// .then(function (data) {
	// 	res.status(200)
	// 	.json({
	// 		status: 'success',
	// 		data: data,
	// 		message: 'unit reports'
	// 	});
	// })
	// .catch(function (err) {
	// 	return next(err);
	// });
}

function getReportByDateTime(req, res, next) {
	// var unit_id = req.params.unit_id;
	// var report_date = req.params.date;
	// var report_time = req.params.time;

	// db.one('select * from reports where unit_id = $1;', unit_id)
	// .then(function (data) {
	// 	res.status(200)
	// 	.json({
	// 		status: 'success',
	// 		data: data,
	// 		message: 'unit reports'
	// 	});
	// })
	// .catch(function (err) {
	// 	return next(err);
	// });
}

function createReport(req, res, next) {
	var unit_id = req.params.unit_id;
	console.log('Posted report for ' + unit_id);
	db.none(
		'INSERT INTO reports (unit_id,light_direct_R,light_direct_G,light_direct_B,light_ambient,soil_moisture,rain_measure,temperature_C,temperature_F,humidity,report_date)' +
		'VALUES (${unit_id}, ${light_direct_R}, ${light_direct_G}, ${light_direct_B}, ${light_ambient}, ${soil_moisture}, ${rain_measure}, ${temperature_C}, ${temperature_F}, ${humidity}, now());'
		,req.body)
	.then(function () {
		res.status(200)
		.json({
			status: 'success',
			message: 'Inserted report!'
		});
	})
	.catch(function (err) {
		return next(err);
	});
}

function updateReport(req, res, next) {
	// db.none('UPDATE reports SET param=param where 1=1',
	// 	[
	// 	unit_id,
	// 	light_direct_R,
	// 	light_direct_G,
	// 	light_direct_B,
	// 	light_ambient,
	// 	soil_moisture,
	// 	rain_measure,
	// 	temperature_C,
	// 	temperature_F,
	// 	humidity,
	// 	report_date
	// 	])
	// .then(function () {
	// 	res.status(200)
	// 	.json({
	// 		status: 'success',
	// 		message: 'Updated report'
	// 	});
	// })
	// .catch(function (err) {
	// 	return next(err);
	// });
}

function removeReport(req, res, next) {
	// // Get the date time
	// var report_date = req.params.report_date;
	// var report_time = req.params.report_time;

	// db.result('DELETE FROM reports WHERE report_date = $1', report_date)
	// .then(function (result) {
	// 	/* jshint ignore:start */
	// 	res.status(200)
	// 	.json({
	// 		status: 'success',
	// 		message: `Removed ${result.rowCount} report`
	// 	});
	// 	/* jshint ignore:end */
	// })
	// .catch(function (err) {
	// 	return next(err);
	// });
}


// add query functions
module.exports = {
	getAllReports: getAllReports,
	getUnitReports: getUnitReports,
	getReportByDate: getReportByDate,
	getReportByDateTime: getReportByDateTime,
	createReport: createReport,
	updateReport: updateReport,
	removeReport: removeReport
};
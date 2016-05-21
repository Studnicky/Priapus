var express = require('express');
var router = express.Router();

var api = require('../api');

// Create
router.post('/api/reports', api.createReport);

//	Read
router.get('/api/reports', api.getAllReports);
router.get('/api/reports/:unit_id', api.getUnitReports);
router.get('/api/reports/:unit_id/:date', api.getReportByDate);
router.get('/api/reports/:unit_id/:date/:time', api.getReportByDateTime);

//	Update
router.put('/api/reports/:unit_id', api.updateReport);

//	Delete
router.delete('/api/reports/:unit_id', api.removeReport);

module.exports = router;
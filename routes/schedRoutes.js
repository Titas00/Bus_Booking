const express = require('express');
const asyncHandler = require('express-async-handler');
const Bus = require('../models/Bus');
const Route = require('../models/Route');
const Schedule = require('../models/Schedule');

const router = express.Router();

router.put('/getBuses', asyncHandler(async (req, res) => {
	const { from, to, date } = req.body;

	// Find route id
	const route = await Route.findByFromTo(from, to);
    
	// Find sched item with rid, date
	const scheds = await Schedule.getSched(date, route.id);
    
	// Find details of those buses
	const resp = [];
	for (const sched of scheds) {
		const bus = await Bus.findById(sched.busID);
		const respObj = { time: sched.time, busNumber: bus.busNumber, pricePerSeat: bus.pricePerSeat, id: sched.id };
		resp.push(respObj);
	};

	res.json(resp);

}));

module.exports = router;
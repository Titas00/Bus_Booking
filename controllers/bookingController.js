const asyncHandler = require('express-async-handler');

const Booking = require('../models/Booking');
const Bus = require('../models/Bus');
const Schedule = require('../models/Schedule');

const getBookedSeats = asyncHandler(async (req, res) => {
	const { schedId } = req.body;

	// find bus in that schedule item and get seatCapacity of bus
	const { busID } = await Schedule.findById(schedId);
	const { seatCapacity } = await Bus.findById(busID);

	// find sum of all seats booked with schedId
	const booked = await Booking.getSeatsBooked(schedId);

	res.json({ capacity: seatCapacity, booked });
});

const newBooking = asyncHandler(async (req, res) => {
	const { schedId, seats } = req.body;

	// create booking
	const nBooking = new Booking(req.id, schedId, seats);
	const r = await nBooking.save();

	res.json({ message: `Booking successful for ${seats} seats!` });
});

const getMyBookings = asyncHandler(async(req, res) => {
    const { id } = req.body;
    
    const myBookings = await Booking.getMyBookings(id);
    return res.json(myBookings);
});

module.exports = { getBookedSeats, newBooking, getMyBookings };

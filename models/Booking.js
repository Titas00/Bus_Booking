const db = require('../config/db');

class Booking {
    constructor(userID, schedID, seatsBooked) {
        this.userID = userID;
        this.schedID = schedID;
        this.seatsBooked = seatsBooked;
    }

    async save() {
        const query = `
            INSERT INTO BOOKING (userID, schedID, seatsBooked) VALUES (?, ?, ?)
        `;

        const [newBooking, _] = await db.execute(query, [this.userID, this.schedID, this.seatsBooked]);
        return newBooking;
    }

    static async getSeatsBooked(schedID) {
        const query = 'SELECT SUM(seatsBooked) AS ans FROM BOOKING WHERE schedID=(?)';

        const [seatsBooked, _] = await db.execute(query, [schedID]);
        return seatsBooked[0].ans === null ? 0 : parseInt(seatsBooked[0].ans);
    }

    static async getMyBookings(userId) {
        // const query = 'SELECT * FROM BOOKING NATURAL JOIN SCHEDULE WHERE userId=(?)';
        const query = 'SELECT date, busNumber, from, to, time, seatsBooked, pricePerSeat*seatsBooked AS cost FROM (SELECT busID, date, time, seatsBooked, from, to FROM (SELECT busID, routeID, date, time, seatsBooked FROM (SELECT schedID, seatsBooked FROM busDB.booking WHERE userID=(?)) t2 INNER JOIN busDB.schedule s ON t2.schedID=s.id) t2 INNER JOIN busdb.route r ON t2.routeID=r.id) t3 INNER JOIN busDB.bus b ON t3.busID=b.id;'

        const [myBookings, _] = await db.execute(query, [userId]);
        return myBookings;
    }
}

module.exports = Booking;
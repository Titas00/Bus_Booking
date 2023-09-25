const db = require('../config/db');

class Bus {
    constructor(busNumber, seatCapacity, pricePerSeat) {
        this.busNumber = busNumber;
        this.seatCapacity = seatCapacity;
        this.pricePerSeat = pricePerSeat;
    }

    async save() {
        const query = 'INSERT INTO BUS (busNumber, seatCapacity, pricePerSeat) VALUES (?, ?, ?)';

        const [newBus, _] = await db.execute(query, [this.busNumber, this.seatCapacity, this.pricePerSeat]);
        return newBus;
    }

    static async findById(busId) {
        const query = 'SELECT * FROM BUS WHERE id = ?';

        const [bus, _] = await db.execute(query, [busId]);
        return bus[0];
    }
}

module.exports = Bus;
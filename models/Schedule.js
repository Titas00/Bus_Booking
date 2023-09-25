const db = require('../config/db');

class Schedule {
    constructor(date, time, busID, routeID) {
        this.date = date;
        this.time = time;
        this.busID = busID;
        this.routeID = routeID;
    }

    async save() {
        const query = 'INSERT INTO SCHEDULE (date, time, busID, routeID) VALUES (?, ?, ?, ?)';

        const [newSchedule, _] = await db.execute(query, [this.date, this.time, this.busID, this.routeID]);
        return newSchedule;
    }

    static async getId(date, from, to, busNumber) {
        const query =
            "SELECT id AS schedId FROM SCHEDULE WHERE SCHEDULE.date=(?) AND routeID=( SELECT id AS routeID FROM ROUTE WHERE ROUTE.from = (?) AND ROUTE.to = (?)) AND busID = (?)"

        const [schedId, _] = await db.execute(query, [date, from, to, busNumber]);
        return schedId;
    }

    static async getSched(date, rid) {
        const query = "SELECT * FROM SCHEDULE WHERE SCHEDULE.date=(?) AND routeID=(?)"
        
        const [sched, _] = await db.execute(query, [date, rid]);
        
        return sched;
    }

    static async findById(schedId) {
        const query = "SELECT * FROM SCHEDULE WHERE id = ?"

        const [sched, _] = await db.execute(query, [schedId]);
        return sched[0];
    }
}

module.exports = Schedule;
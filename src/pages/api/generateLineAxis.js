import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();

export default async function generateAxis(req, res) {

    /*
        1. findMany where: Type = 0
        2. Convert datetime to datetime object
        3. Calculate the average soil moisture in time intervals of 30 mins
            3.1 Create an array of 30 mins intervals
            3.2 Loop through the array and calculate the average soil moisture in each interval
    */

    // getMonth() returns a zero-based value, so we add 1 to it
    const now = moment();
    const { day = now.date(), month = now.month() + 1, year = now.year()} = req.query;

    // Get the start and end times of the specified date
    const startDay = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').startOf('day').toDate();
    const endDay = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').add(1, 'days').startOf('day').toDate()

    const filter = {
        orderBy: {
            datetime: 'desc'
        },
        where: {
            Type: 0,
            datetime: {
                gte: startDay,
                lt: endDay
            }
        },
        take: Number(process.env.MAX_DB_GRAPH_ENTRIES)
    }

    const data = await prisma[`sensor_${process.env.ENV}`].findMany(filter);
    await prisma.$disconnect();

    /*
        Calculating the average soil moisture:
            1. Create an array of 30 mins intervals in datetime objects
            2. Check if the datetime of the current item is in the interval
            3. If it is, add it a temporary variable and increment a counter
            4. If it isn't, calculate the average and push it to the array
            5. Clear the temporary variable and reset the counter
    */

    const intervals = [];

    // Set the start time to the beginning of the day
    const startTime = new Date(startDay);
    
    // Set the end time to the end of the day
    const endTime = new Date(startDay.setHours(23, 59, 59, 999));
    
    // Loop through the time range in 30 minute intervals
    for (let time = startTime; time <= endTime; time.setMinutes(time.getMinutes() + 30)) {
        intervals.push(moment(time));
    }
    
    const totalPerInterval = [];
    for(let i = 0; i < intervals.length; i++) { totalPerInterval.push(0); }
    var itemCountsPerInterval = []
    for(let i = 0; i < intervals.length; i++) { itemCountsPerInterval.push(0); }

    var currentMoment;

    data.map((item) => {
        currentMoment = moment(item.datetime);
        intervals.map((interval, i) => {
            // On the last interval, check if the current time is after the interval (when i == 47)
            if (i == 47 ? (currentMoment.isAfter(interval)) : (currentMoment.isBetween(interval, intervals[i + 1]))) {
                // i == 47 && console.log(interval, currentMoment, currentMoment.isAfter(interval))
                totalPerInterval[i] += item.Value;
                itemCountsPerInterval[i] += 1;
            }
        })
    })

    var averages = [];
    var value;
    for(let i = 0; i < intervals.length; i++) {
        value = 0
        if(totalPerInterval[i] !== 0) value = Math.floor((totalPerInterval[i] / itemCountsPerInterval[i]));
        averages.push(value)
    }

    intervals.map((interval, i) => {
        intervals[i] = interval.format('HH:mm');
    })

    // var response = [];
    // intervals.map((interval, i) => {
    //     response.push({
    //         x: interval,
    //         y: averages[i]
    //     })
    // })

    let response = {
        x: intervals,
        y: averages
    }

    response.y.map((average, i) => { 
        if(average == 0)  response.y[i] = "N/A"
    });

    return await res.json(response);
}

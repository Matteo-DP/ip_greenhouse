import moment from "moment/moment";

export default async function GenerateBarAxis(req, res) {
    
    const { typeFilter } = req.query;

    // Get the start and end times of today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const filter = {
        orderBy: {
            datetime: 'desc'
        },
        where: {
            Type: 2,
            datetime: {
                gte: today.toISOString(),
                lt: tomorrow.toISOString()
            }
        },
        take: Number(process.env.MAX_DB_GRAPH_ENTRIES)
    }

    const data = await prisma[`sensor_${process.env.ENV}`].findMany(filter);
    prisma.$disconnect();

    /* 
        1. Create an array of 60 min intervals in datetime objects
        2. Check if the datetime of the current item is in the interval
        3. Check how long the current item has been in the interval
            3.1 Calculate the datetime between the current item and the end of the interval
            3.2 If the datetime exceeds the interval, calculate the datetime in the next interval
        
    */

    const intervals = [];

    // Set the start time to the beginning of the day
    const startTime = new Date();
    startTime.setHours(0, 0, 0, 0);
    
    // Set the end time to the end of the day
    const endTime = new Date();
    endTime.setHours(23, 59, 59, 999);
    
    // Loop through the time range in 30 minute intervals
    for (let time = startTime; time <= endTime; time.setMinutes(time.getMinutes() + 60)) {
        intervals.push(moment(time));
    }

    const totalPerInterval = [];

}
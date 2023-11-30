import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();

export default async function findMany(req, res) {
    const now = moment();
    const {typeFilter, rows = process.env.MAX_DB_GRAPH_ENTRIES, day = now.date(), month = now.month() + 1, year = now.year()} = req.query;
    
    var filter = {
        skip: 0,
        take: Number(rows),
        orderBy: {
            datetime: "desc"
        },
        where: {
            datetime: {
                gte: moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').startOf('day').toDate(),
                lt: moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').add(1, 'days').startOf('day').toDate()
            }
        }
    };

    if(typeFilter !== undefined) {
        filter.where.Type =  Number(typeFilter)
    }

    const data = await prisma[`sensor_${process.env.ENV}`].findMany(filter);
    prisma.$disconnect();
    return await res.json(data);
}

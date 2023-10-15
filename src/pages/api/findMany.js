import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function findMany(req, res) {
    const {typeFilter, rows} = req.query;
    
    var filter = {
        skip: 0,
        take: Number(rows),
        orderBy: {
            datetime: "desc"
        }
    };

    if(typeFilter !== undefined) {
    filter.where = { Type: Number(typeFilter) }
    }

    const data = await prisma[`sensor_${process.env.ENV}`].findMany(filter);
    prisma.$disconnect();
    return await res.json(data);
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function FindLatest(req, res) {
    const { typeFilter } = req.query;

    var filter = {
        orderBy: {
            datetime: 'desc'
        }
    }

    if(typeFilter !== undefined) {
        filter.where = { Type: Number(typeFilter) }
    }

    const data = await prisma[`sensor_${process.env.ENV}`].findFirst(filter);
    prisma.$disconnect();
    return await res.json(data);
}
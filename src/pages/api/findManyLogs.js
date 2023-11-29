import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function findMany(req, res) {
    const {rows} = req.query;
    
    var filter = {
        skip: 0,
        take: Number(rows),
        orderBy: {
            datetime: "desc"
        }
    };

    const data = await prisma[`log_${process.env.ENV}`].findMany(filter);
    prisma.$disconnect();
    return await res.json(data);
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getConfig(req, res) {
    
    const data = await prisma.config.findMany({
        where: {
            name: {
                startsWith: 'USE_'
            }
        }
    });
    await prisma.$disconnect();

    return await res.json(data);
}

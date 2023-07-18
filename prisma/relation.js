const { PrismaClient } = require('@prisma/client');
const internal = require('stream');
const prisma = new PrismaClient();

async function store() {
    const createMany = await prisma.store.createMany({
        data: [
            { title: 'store_1', seller_id:2 },
            { title: 'store_2', seller_id:1 }
        ],
        skipDuplicates: true
    }
    );
}

store()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1);
    })
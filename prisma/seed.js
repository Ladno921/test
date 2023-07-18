const { PrismaClient } = require('@prisma/client');
const internal = require('stream');
const prisma = new PrismaClient();

async function seller() {
    const createMany = await prisma.seller.createMany({
        data: [
            { title: "seller_1" },
            { title: "seller_2" },
        ],
        skipDuplicates: true
    }
    );
}

async function item() {
    const createMany = await prisma.item.createMany({
        data: [
            { title: 'item_1' },
            { title: 'item_2' }
        ],
        skipDuplicates: true
    }
    );
}

seller()
item()


    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1);
    })
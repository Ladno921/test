import { Request, Response } from 'express';
import { item, PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export class ItemsController {
    async index(req: Request, res: Response) {
        const items: item[] = await prisma.item.findMany();

        res.render('items/index', {
            'items': items,
        });
    }

    async create(req: Request, res: Response) {
        const seller = await prisma.seller.findMany({});
        const store = await prisma.store.findMany({});
        const item = await prisma.item.findMany({});

        res.render('items/store',{
            'seller' : seller,
            'store' : store,
            'item' : item
        });
    }


    async store(req: Request, res: Response) {
        const { check_1, check_2 } = req.body;
        console.log(check_1, check_2)
        // let mas1 = []
        // let mas2 = []
        // mas1.push(check_1)
        // mas2.push(check_2)

        await prisma.store_items.create({
            data:{
                item_id: Number(check_2),
                store_id: Number(check_1)
            }
        });

        res.redirect('/');
    }
}

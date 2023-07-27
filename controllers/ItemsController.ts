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

    async show(req: Request, res: Response) {
        const store = await prisma.store.findMany({
            include: {
                seller: true,
                items: {
                    include: {
                        items: true
                    }
                }
            }
        });

        const storeLen = store.length;
        for (let i = 0; i < storeLen; i++) {
            console.log('---------------');

            console.log(store[i].title);
            console.log(store[i].seller.title);

            for (let k = 0; k < store[i].items.length; k++) {
                console.log(store[i].items[k].items.title);
            }
        }
        
        res.render('items/show', {
            // 'items': items,
        });
    }

    async create(req: Request, res: Response) {
        const seller = await prisma.seller.findMany({});
        const store = await prisma.store.findMany({});
        const item = await prisma.item.findMany({});

        res.render('items/store', {
            'seller': seller,
            'store': store,
            'item': item
        });
    }


    async store(req: Request, res: Response) {
        const { check_1, check_2 } = req.body;

        const exist = await prisma.store_items.findMany({
            where: {
                item_id: Number(check_2),
                store_id: Number(check_1)
            }
        })

        if (exist[0] == undefined) {
            await prisma.store_items.create({
                data: {
                    item_id: Number(check_2),
                    store_id: Number(check_1)
                }
            });

            res.redirect('/');
        } else {
            res.redirect('/');
        }
    }
}

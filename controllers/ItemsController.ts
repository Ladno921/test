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

    async show (req: Request, res: Response){
        const items: item[] = await prisma.item.findMany();

        const sellers = await prisma.seller.findMany({})

        for (let i = 0; i<sellers.length;i++){
            const store = await prisma.store.findMany({})

            for(let j = 0; j< store.length;j++){
                const items = await prisma.item.findMany({})

                for(let k = 0; k < items.length; k++){
                    console.log("Seller: "+ sellers[i].title +', Store: '+ store[j].title +', Items: '+ items[k].title)
                }
            }
        }

        res.render('items/show', {
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

        const exist = await prisma.store_items.findMany({
            where:{
                item_id: Number(check_2),
                store_id: Number(check_1)
            }
        })

        if(exist[0] == undefined){
            await prisma.store_items.create({
                data:{
                    item_id: Number(check_2),
                    store_id: Number(check_1)
                }
            });
            res.redirect('/');
        }else{
            res.redirect('/');
        }
    }
}

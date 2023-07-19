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

        const store = await prisma.store.findMany({})

        for(let i = 0; i < store.length; i++){
            const seller = await prisma.seller.findMany({
                where:{
                    id: store[i].id
                }
            });

            const stores = await prisma.store.findMany({
                where:{
                    id: store[i].seller_id
                }
            });

            const item = await prisma.store.findMany({
                where:{
                    id: store[i].seller_id
                },
                select:{
                    items:{
                        select:{
                            items:{
                                select:{
                                    title:true,
                                    id:true
                                }
                            }
                        }
                    }
                }
            });  

            console.log(seller[0].title, stores[0].title)

            for(let i = 0; i < item[0].items.length; i++){
                console.log(item[0].items[i].items.title);
            }

            console.log();
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

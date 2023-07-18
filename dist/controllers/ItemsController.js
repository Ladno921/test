"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ItemsController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield prisma.item.findMany();
            res.render('items/index', {
                'items': items,
            });
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield prisma.item.findMany();
            const sellers = yield prisma.seller.findMany({});
            for (let i = 0; i < sellers.length; i++) {
                const store = yield prisma.store.findMany({});
                for (let j = 0; j < store.length; j++) {
                    const items = yield prisma.item.findMany({});
                    for (let k = 0; k < items.length; k++) {
                        console.log("Seller: " + sellers[i].title + ', Store: ' + store[j].title + ', Items: ' + items[k].title);
                    }
                }
            }
            res.render('items/show', {
                'items': items,
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const seller = yield prisma.seller.findMany({});
            const store = yield prisma.store.findMany({});
            const item = yield prisma.item.findMany({});
            res.render('items/store', {
                'seller': seller,
                'store': store,
                'item': item
            });
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { check_1, check_2 } = req.body;
            const exist = yield prisma.store_items.findMany({
                where: {
                    item_id: Number(check_2),
                    store_id: Number(check_1)
                }
            });
            if (exist[0] == undefined) {
                yield prisma.store_items.create({
                    data: {
                        item_id: Number(check_2),
                        store_id: Number(check_1)
                    }
                });
                res.redirect('/');
            }
            else {
                res.redirect('/');
            }
        });
    }
}
exports.ItemsController = ItemsController;
//# sourceMappingURL=ItemsController.js.map
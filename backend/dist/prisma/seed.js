"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Cleaning database...');
    await prisma.orderItem.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.order.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
    console.log('Database emptied. Starting seed...');
    await prisma.user.create({
        data: {
            email: 'admin@boogieneko.com',
            firstName: 'Mr',
            lastName: 'Admin',
            password: await bcrypt.hash('admin123', 10),
            role: 'ADMIN',
        },
    });
    for (let i = 0; i < 50; i++) {
        const pass = faker_1.faker.internet.password();
        const hashedPass = await bcrypt.hash(pass, 10);
        await prisma.user.create({
            data: {
                email: faker_1.faker.internet.email(),
                firstName: faker_1.faker.person.firstName(),
                lastName: faker_1.faker.person.lastName(),
                password: hashedPass,
            },
        });
    }
    for (let i = 0; i < 100; i++) {
        await prisma.product.create({
            data: {
                title: faker_1.faker.commerce.product(),
                slug: faker_1.faker.commerce.productAdjective() +
                    String(Math.round(Math.random() * 1e9)),
                description: faker_1.faker.commerce.productDescription(),
                price: faker_1.faker.commerce.price(),
                stock: Math.round(Math.random() * 10),
                categoryId: 1,
            },
        });
    }
    console.log('Database seeded successfully!');
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map
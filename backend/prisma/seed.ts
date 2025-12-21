import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

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

  // ADMIN
  await prisma.user.create({
    data: {
      email: 'admin@boogieneko.com',
      firstName: 'Mr',
      lastName: 'Admin',
      password: await bcrypt.hash('admin123', 10),
      role: 'ADMIN',
    },
  });

  // Users
  for (let i = 0; i < 50; i++) {
    const pass = faker.internet.password();
    const hashedPass = await bcrypt.hash(pass, 10);
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        password: hashedPass,
      },
    });
  }

  // Products
  for (let i = 0; i < 100; i++) {
    await prisma.product.create({
      data: {
        title: faker.commerce.product(),
        slug:
          faker.commerce.productAdjective() +
          String(Math.round(Math.random() * 1e9)),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
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

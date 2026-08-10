import {
  PrismaClient,
  Role,
  UserStatus,
} from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Admin
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: {
      email: "admin@rentnest.com",
    },
    update: {},
    create: {
      name: "Admin",
      email: "admin@rentnest.com",
      password: hashedPassword,
      phone: "01711111111",
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
    },
  });

  // Categories
  const categories = [
    "Apartment",
    "House",
    "Studio",
    "Villa",
  ];

  for (const name of categories) {
    await prisma.category.upsert({
      where: {
        name,
      },
      update: {},
      create: {
        name,
      },
    });
  }

  console.log("Admin seeded:", admin.email);
  console.log("Categories seeded:", categories.join(", "));
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
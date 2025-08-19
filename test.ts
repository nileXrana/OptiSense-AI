import { PrismaClient } from "./lib/generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  // Test connection first
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully!");
    
    // Try to find existing users
    const existingUsers = await prisma.users.findMany();
    console.log("📊 Existing users:", existingUsers.length);
    
    // Use upsert instead of create to avoid duplicate key errors
    const user = await prisma.users.upsert({
      where: { email: "alice@example.com" },
      update: {
        name: "Alice Updated",
        credits: 150,
        tokenUsed: 10,
      },
      create: {
        name: "Alice",
        email: "alice@example.com",
        credits: 100,
        tokenUsed: 0,
        picture: "",
        orderId: null
      },
    });
    console.log("✅ User operation successful:", user);
  } catch (error) {
    console.error("❌ Database error:", error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

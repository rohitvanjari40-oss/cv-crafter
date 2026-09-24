import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { sampleStudentResume, sampleEngineerResume } from '../src/lib/sampleData';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting CV Crafter database seeding...');

  // 1. Create Demo User
  const demoPasswordHash = await bcrypt.hash('password123', 10);
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@cvcrafter.com' },
    update: {},
    create: {
      name: 'Demo Student User',
      email: 'demo@cvcrafter.com',
      passwordHash: demoPasswordHash,
      role: 'USER',
    },
  });
  console.log(`✅ Demo user created: ${demoUser.email} (password: password123)`);

  // 2. Create Admin User
  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@cvcrafter.com' },
    update: {},
    create: {
      name: 'CV Crafter Admin',
      email: 'admin@cvcrafter.com',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
    },
  });
  console.log(`✅ Admin user created: ${adminUser.email} (password: admin123)`);

  // 3. Clean existing demo resumes to avoid duplicate slug conflicts
  await prisma.resume.deleteMany({
    where: { userId: demoUser.id },
  });

  // 4. Create Student Demo Resume
  const studentResume = await prisma.resume.create({
    data: {
      userId: demoUser.id,
      title: 'Rohit Sharma — BCA Graduate & Developer',
      templateId: 'student',
      isPublic: true,
      slug: 'rohit-sharma',
      targetRole: 'Full-Stack Developer',
      resumeData: JSON.stringify(sampleStudentResume),
    },
  });
  console.log(`✅ Student Resume created: ${studentResume.title} (Slug: /p/rohit-sharma)`);

  // 5. Create Senior Engineer Demo Resume
  const engineerResume = await prisma.resume.create({
    data: {
      userId: demoUser.id,
      title: 'Priya Patel — Senior Full-Stack Engineer',
      templateId: 'modern',
      isPublic: true,
      slug: 'priya-patel',
      targetRole: 'Full-Stack Developer',
      resumeData: JSON.stringify(sampleEngineerResume),
    },
  });
  console.log(`✅ Engineer Resume created: ${engineerResume.title} (Slug: /p/priya-patel)`);

  console.log('🎉 Seeding successfully completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

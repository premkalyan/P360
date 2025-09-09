// P360 Database Seed Script
// =========================
// Replicates demo data from init-db.sql for development and testing

import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting P360 database seeding...');

  // Demo tenant
  const demoTenant = await prisma.tenant.upsert({
    where: { slug: 'demo-org' },
    update: {},
    create: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Demo Organization',
      slug: 'demo-org',
      status: 'active',
    },
  });

  console.log('✅ Demo tenant created:', demoTenant.name);

  // Demo user
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@p360.com' },
    update: {},
    create: {
      id: '550e8400-e29b-41d4-a716-446655440001',
      tenantId: demoTenant.id,
      email: 'demo@p360.com',
      passwordHash: process.env.DEMO_USER_PASSWORD_HASH || '$2b$10$K9V1P8sLzR4ZQgF1VxJGJuLMNaP0tM5KmS0K2R4VnS2Q8W9L5pV8K', // Use env var or fallback
      firstName: 'Demo',
      lastName: 'User',
      role: 'manager',
    },
  });

  console.log('✅ Demo user created:', demoUser.email);

  // Demo campaigns
  const campaigns = [
    {
      id: '550e8400-e29b-41d4-a716-446655440010',
      name: 'Summer Sale 2024',
      description: 'Promotional campaign for summer sale season targeting high-value customers',
      status: 'active' as const,
      budget: 15000.00,
      dailyBudget: 500.00,
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-08-31'),
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440011',
      name: 'Brand Awareness Q3',
      description: 'Brand awareness campaign focusing on new product launches',
      status: 'active' as const,
      budget: 25000.00,
      dailyBudget: 800.00,
      startDate: new Date('2024-07-01'),
      endDate: new Date('2024-09-30'),
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440012',
      name: 'Product Launch',
      description: 'Launch campaign for new product line with targeted messaging',
      status: 'paused' as const,
      budget: 8000.00,
      dailyBudget: 300.00,
      startDate: new Date('2024-08-15'),
      endDate: new Date('2024-10-15'),
    },
  ];

  for (const campaignData of campaigns) {
    const campaign = await prisma.campaign.upsert({
      where: { id: campaignData.id },
      update: {},
      create: {
        ...campaignData,
        tenantId: demoTenant.id,
        userId: demoUser.id,
      },
    });
    console.log('✅ Campaign created:', campaign.name);
  }

  // Campaign performance data
  const performanceData = [
    // Summer Sale 2024 performance
    { campaignId: '550e8400-e29b-41d4-a716-446655440010', date: new Date('2024-09-01'), impressions: 45678, clicks: 1234, spend: 456.78, conversions: 67 },
    { campaignId: '550e8400-e29b-41d4-a716-446655440010', date: new Date('2024-09-02'), impressions: 52341, clicks: 1456, spend: 523.41, conversions: 78 },
    { campaignId: '550e8400-e29b-41d4-a716-446655440010', date: new Date('2024-09-03'), impressions: 48902, clicks: 1342, spend: 489.02, conversions: 71 },
    
    // Brand Awareness Q3 performance
    { campaignId: '550e8400-e29b-41d4-a716-446655440011', date: new Date('2024-09-01'), impressions: 78234, clicks: 2156, spend: 782.34, conversions: 98 },
    { campaignId: '550e8400-e29b-41d4-a716-446655440011', date: new Date('2024-09-02'), impressions: 81567, clicks: 2298, spend: 815.67, conversions: 103 },
    { campaignId: '550e8400-e29b-41d4-a716-446655440011', date: new Date('2024-09-03'), impressions: 76891, clicks: 2089, spend: 768.91, conversions: 92 },
    
    // Product Launch performance
    { campaignId: '550e8400-e29b-41d4-a716-446655440012', date: new Date('2024-09-01'), impressions: 23456, clicks: 567, spend: 234.56, conversions: 34 },
    { campaignId: '550e8400-e29b-41d4-a716-446655440012', date: new Date('2024-09-02'), impressions: 25678, clicks: 634, spend: 256.78, conversions: 38 },
    { campaignId: '550e8400-e29b-41d4-a716-446655440012', date: new Date('2024-09-03'), impressions: 21234, clicks: 498, spend: 212.34, conversions: 29 },
  ];

  for (const perfData of performanceData) {
    await prisma.campaignPerformance.upsert({
      where: {
        campaignId_date: {
          campaignId: perfData.campaignId,
          date: perfData.date,
        },
      },
      update: {},
      create: perfData,
    });
  }

  console.log('✅ Performance data seeded');
  console.log('🎉 P360 database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

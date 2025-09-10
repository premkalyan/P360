#!/usr/bin/env node

/**
 * Database connectivity check for CI/CD environments
 * Determines which test suite to run based on database availability
 */

const { PrismaClient } = require('@prisma/client');

async function checkDatabaseConnectivity() {
  const prisma = new PrismaClient();
  
  try {
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database is available - running full test suite');
    process.exit(0);
  } catch (error) {
    console.log('⚠️ Database not available - running unit tests only');
    console.log('Error:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabaseConnectivity();

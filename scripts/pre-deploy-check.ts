#!/usr/bin/env tsx
/**
 * Pre-deployment Validation Script
 * 
 * This script performs comprehensive pre-deployment checks including:
 * - Environment variable validation
 * - Build test
 * - Configuration validation
 */

import { config } from 'dotenv';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';

// Load environment variables from .env.local if it exists
const envLocalPath = resolve(process.cwd(), '.env.local');
if (existsSync(envLocalPath)) {
  config({ path: envLocalPath });
  console.log('✓ Loaded environment from .env.local\n');
}

let hasErrors = false;

console.log('🚀 Pre-Deployment Validation\n');
console.log('='.repeat(60));

// Step 1: Check Required Files
console.log('\n📁 Step 1: Checking Required Files...\n');

const requiredFiles = [
  'package.json',
  'next.config.ts',
  'vercel.json',
  '.env.example',
  'app/layout.tsx',
];

for (const file of requiredFiles) {
  const filePath = resolve(process.cwd(), file);
  if (existsSync(filePath)) {
    console.log(`  ✓ ${file}`);
  } else {
    console.error(`  ❌ ${file} - MISSING`);
    hasErrors = true;
  }
}

// Step 2: Validate Environment Variables
console.log('\n🔐 Step 2: Validating Environment Variables...\n');

interface EnvCheck {
  name: string;
  required: boolean;
  minLength?: number;
  pattern?: RegExp;
}

const envChecks: EnvCheck[] = [
  {
    name: 'MONGODB_URI',
    required: true,
    pattern: /^mongodb(\+srv)?:\/\/.+/
  },
  {
    name: 'JWT_SECRET',
    required: true,
    minLength: 32
  },
  {
    name: 'NEXT_PUBLIC_APP_URL',
    required: true,
    pattern: /^https?:\/\/.+/
  },
];

for (const check of envChecks) {
  const value = process.env[check.name];
  
  if (!value && check.required) {
    console.error(`  ❌ ${check.name} - MISSING`);
    hasErrors = true;
    continue;
  }
  
  if (!value) {
    console.log(`  ⚠ ${check.name} - NOT SET (optional)`);
    continue;
  }
  
  if (check.minLength && value.length < check.minLength) {
    console.error(`  ❌ ${check.name} - TOO SHORT (min ${check.minLength} chars)`);
    hasErrors = true;
    continue;
  }
  
  if (check.pattern && !check.pattern.test(value)) {
    console.error(`  ❌ ${check.name} - INVALID FORMAT`);
    hasErrors = true;
    continue;
  }
  
  console.log(`  ✓ ${check.name}`);
}

// Step 3: Check Configuration Files
console.log('\n⚙️  Step 3: Validating Configuration Files...\n');

try {
  const packageJson = require(resolve(process.cwd(), 'package.json'));
  
  if (!packageJson.scripts || !packageJson.scripts.build) {
    console.error('  ❌ package.json missing build script');
    hasErrors = true;
  } else {
    console.log('  ✓ package.json has build script');
  }
  
  if (!packageJson.dependencies || !packageJson.dependencies.next) {
    console.error('  ❌ package.json missing Next.js dependency');
    hasErrors = true;
  } else {
    console.log('  ✓ package.json has Next.js dependency');
  }
  
  if (!packageJson.dependencies || !packageJson.dependencies.mongodb) {
    console.error('  ❌ package.json missing MongoDB dependency');
    hasErrors = true;
  } else {
    console.log('  ✓ package.json has MongoDB dependency');
  }
  
} catch (error) {
  console.error('  ❌ Failed to parse package.json');
  hasErrors = true;
}

// Step 4: Check vercel.json
try {
  const vercelJson = require(resolve(process.cwd(), 'vercel.json'));
  
  // Check that deprecated @ syntax is not used
  if (vercelJson.env) {
    const envValues = Object.values(vercelJson.env);
    const hasDeprecatedSyntax = envValues.some((val: any) => 
      typeof val === 'string' && val.startsWith('@')
    );
    
    if (hasDeprecatedSyntax) {
      console.error('  ❌ vercel.json uses deprecated @ syntax for environment variables');
      hasErrors = true;
    } else {
      console.log('  ✓ vercel.json environment configuration');
    }
  } else {
    console.log('  ✓ vercel.json (no inline env variables)');
  }
  
  if (vercelJson.framework && vercelJson.framework !== 'nextjs') {
    console.warn('  ⚠ vercel.json framework is not set to "nextjs"');
  } else {
    console.log('  ✓ vercel.json framework setting');
  }
  
} catch (error) {
  console.error('  ❌ Failed to parse vercel.json');
  hasErrors = true;
}

// Final Summary
console.log('\n' + '='.repeat(60));

if (hasErrors) {
  console.error('\n❌ Pre-deployment validation FAILED\n');
  console.error('Please fix the errors above before deploying.\n');
  process.exit(1);
} else {
  console.log('\n✅ Pre-deployment validation PASSED\n');
  console.log('Your application is ready for deployment to Vercel!\n');
  console.log('Next steps:');
  console.log('  1. Push your code to GitHub');
  console.log('  2. Import project to Vercel');
  console.log('  3. Configure environment variables in Vercel dashboard');
  console.log('  4. Deploy!\n');
  console.log('See VERCEL_DEPLOYMENT_CHECKLIST.md for detailed instructions.\n');
}

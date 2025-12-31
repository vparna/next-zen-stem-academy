#!/usr/bin/env tsx
/**
 * Environment Variable Validation Script
 * 
 * This script validates that all required environment variables are set
 * before deployment to Vercel.
 */

import { config } from 'dotenv';
import { existsSync } from 'fs';
import { resolve } from 'path';

// Load environment variables from .env.local if it exists
const envLocalPath = resolve(process.cwd(), '.env.local');
if (existsSync(envLocalPath)) {
  config({ path: envLocalPath });
}

interface EnvVariable {
  name: string;
  required: boolean;
  description: string;
  validationFn?: (value: string) => boolean;
}

const requiredEnvVars: EnvVariable[] = [
  {
    name: 'MONGODB_URI',
    required: true,
    description: 'MongoDB connection string',
    validationFn: (value: string) => {
      return value.startsWith('mongodb://') || value.startsWith('mongodb+srv://');
    }
  },
  {
    name: 'JWT_SECRET',
    required: true,
    description: 'Secret key for JWT token generation (min 32 characters)',
    validationFn: (value: string) => value.length >= 32
  },
  {
    name: 'NEXT_PUBLIC_APP_URL',
    required: true,
    description: 'Application URL (e.g., https://your-app.vercel.app)',
    validationFn: (value: string) => {
      return value.startsWith('http://') || value.startsWith('https://');
    }
  }
];

const optionalEnvVars: EnvVariable[] = [
  {
    name: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    required: false,
    description: 'Stripe publishable key (required for payments)',
    validationFn: (value: string) => value.startsWith('pk_')
  },
  {
    name: 'STRIPE_SECRET_KEY',
    required: false,
    description: 'Stripe secret key (required for payments)',
    validationFn: (value: string) => value.startsWith('sk_')
  },
  {
    name: 'STRIPE_WEBHOOK_SECRET',
    required: false,
    description: 'Stripe webhook secret (required for payment webhooks)',
    validationFn: (value: string) => value.startsWith('whsec_')
  },
  {
    name: 'EMAIL_HOST',
    required: false,
    description: 'SMTP host for email notifications'
  },
  {
    name: 'EMAIL_PORT',
    required: false,
    description: 'SMTP port for email notifications'
  },
  {
    name: 'EMAIL_USER',
    required: false,
    description: 'SMTP user for email notifications'
  },
  {
    name: 'EMAIL_PASSWORD',
    required: false,
    description: 'SMTP password for email notifications'
  }
];

function validateEnvironmentVariables(): void {
  console.log('🔍 Validating environment variables...\n');
  
  let hasErrors = false;
  let hasWarnings = false;
  
  // Check required variables
  console.log('✅ Required Variables:');
  for (const envVar of requiredEnvVars) {
    const rawValue = process.env[envVar.name];
    
    if (!rawValue) {
      console.error(`  ❌ ${envVar.name}: MISSING`);
      console.error(`     ${envVar.description}`);
      hasErrors = true;
    } else {
      // Trim whitespace and check for invisible characters
      const value = rawValue.trim();
      const hasInvisibleChars = rawValue !== value || /[\r\n\t]/.test(rawValue);
      
      if (!value) {
        console.error(`  ❌ ${envVar.name}: EMPTY (contains only whitespace)`);
        console.error(`     ${envVar.description}`);
        hasErrors = true;
      } else if (envVar.validationFn && !envVar.validationFn(value)) {
        console.error(`  ❌ ${envVar.name}: INVALID`);
        console.error(`     ${envVar.description}`);
        if (envVar.name === 'MONGODB_URI') {
          console.error(`     Current value length: ${value.length}`);
          console.error(`     Starts with: "${value.substring(0, Math.min(30, value.length))}..."`);
        }
        hasErrors = true;
      } else {
        if (hasInvisibleChars) {
          console.warn(`  ⚠ ${envVar.name}: OK (but contains whitespace/newlines - will be trimmed)`);
        } else {
          console.log(`  ✓ ${envVar.name}: OK`);
        }
      }
    }
  }
  
  // Check optional variables
  console.log('\n⚠️  Optional Variables (warnings only):');
  for (const envVar of optionalEnvVars) {
    const value = process.env[envVar.name];
    
    if (!value) {
      console.warn(`  ⚠ ${envVar.name}: NOT SET`);
      console.warn(`     ${envVar.description}`);
      hasWarnings = true;
    } else if (envVar.validationFn && !envVar.validationFn(value)) {
      console.warn(`  ⚠ ${envVar.name}: INVALID FORMAT`);
      console.warn(`     ${envVar.description}`);
      hasWarnings = true;
    } else {
      console.log(`  ✓ ${envVar.name}: OK`);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  
  if (hasErrors) {
    console.error('\n❌ Validation FAILED: Missing or invalid required environment variables.');
    console.error('\nPlease ensure all required environment variables are set in:');
    console.error('  - Local: .env.local file');
    console.error('  - Vercel: Project Settings → Environment Variables');
    console.error('\nSee .env.example for reference values.\n');
    process.exit(1);
  }
  
  if (hasWarnings) {
    console.warn('\n⚠️  Validation PASSED with warnings.');
    console.warn('Some optional features may not work without the missing variables.\n');
  } else {
    console.log('\n✅ Validation PASSED: All environment variables are properly configured.\n');
  }
}

// Run validation
validateEnvironmentVariables();

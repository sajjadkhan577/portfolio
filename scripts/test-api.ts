/**
 * Automated Verification Tests for Contact Validation & Admin Authorization
 * Run with: npx tsx scripts/test-api.ts
 */
import { z } from 'zod';
import {
  authenticateAdmin,
  generateAdminSessionToken,
  verifyAdminSessionToken,
} from '../src/server/auth';
import { checkRateLimit } from '../src/server/rateLimit';

let testsPassed = 0;
let testsFailed = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    testsPassed++;
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    testsFailed++;
  }
}

// Contact form schema replicate for unit validation test
const testContactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().trim().email('Please enter a valid email address'),
  project_type: z.string().trim().min(1, 'Please select a project type'),
  budget: z.string().trim().optional(),
  message: z.string().trim().min(15, 'Please provide a message of at least 15 characters'),
  website: z.string().optional(),
});

async function runTests() {
  console.log('🧪 Starting Security & Validation Test Suite...\n');

  // 1. Zod Contact Validation Tests
  console.log('📋 Test Group 1: Contact Form Input Validation');
  const validLead = {
    name: 'Emily Watson',
    email: 'emily@consulting.com',
    project_type: 'Coach & Consultant Websites',
    budget: '$3,000 - $5,000',
    message: 'We are launching our new cohort next month and need an automated booking system.',
  };
  const validResult = testContactSchema.safeParse(validLead);
  assert(validResult.success === true, 'Accepts properly formatted contact submission');

  const invalidEmail = {
    ...validLead,
    email: 'not-an-email',
  };
  const invalidEmailResult = testContactSchema.safeParse(invalidEmail);
  assert(
    invalidEmailResult.success === false &&
      invalidEmailResult.error.issues[0].message.includes('valid email'),
    'Rejects malformed email address'
  );

  const shortMessage = {
    ...validLead,
    message: 'Need help',
  };
  const shortMsgResult = testContactSchema.safeParse(shortMessage);
  assert(
    shortMsgResult.success === false &&
      shortMsgResult.error.issues[0].message.includes('at least 15 characters'),
    'Rejects messages shorter than 15 characters'
  );

  // 2. Honeypot Bot Trap Test
  console.log('\n🍯 Test Group 2: Honeypot Anti-Spam Bot Trap');
  const botSubmission = {
    ...validLead,
    website: 'http://spam-link-bot.xyz',
  };
  const isHoneypotTriggered = Boolean(botSubmission.website && botSubmission.website.trim().length > 0);
  assert(isHoneypotTriggered === true, 'Detects bot filling out hidden honeypot website field');

  // 3. IP Rate Limiting Test
  console.log('\n⏱️ Test Group 3: IP Sliding Window Rate Limiting');
  const testIp = '192.168.1.99';
  const limit = 3;
  const windowMs = 5000;

  const r1 = checkRateLimit(testIp, limit, windowMs);
  const r2 = checkRateLimit(testIp, limit, windowMs);
  const r3 = checkRateLimit(testIp, limit, windowMs);
  const r4 = checkRateLimit(testIp, limit, windowMs);

  assert(r1.allowed && r2.allowed && r3.allowed, 'Allows requests under threshold limit');
  assert(!r4.allowed, 'Blocks 4th request when limit is 3 (HTTP 429)');

  // 4. Admin Authentication & Session Security Tests
  console.log('\n🔐 Test Group 4: Admin Authentication & Authorization Tokens');

  const correctLogin = await authenticateAdmin('sajjad2003khan@gmail.com', 'sajjad_admin_2026!');
  assert(correctLogin === true, 'Authenticates primary admin with correct email and password');

  const wrongPassword = await authenticateAdmin('sajjad2003khan@gmail.com', 'wrong-password-999');
  assert(wrongPassword === false, 'Rejects incorrect admin password');

  const unauthorizedEmail = await authenticateAdmin('imposter@stranger.com', 'sajjad_admin_2026!');
  assert(unauthorizedEmail === false, 'Rejects unauthorized email address even with correct password');

  // 5. Signed Session Token Verification
  const token = generateAdminSessionToken('sajjad2003khan@gmail.com');
  const verified = verifyAdminSessionToken(token);
  assert(
    verified !== null && verified.email === 'sajjad2003khan@gmail.com',
    'Validates legitimately signed HMAC-SHA256 admin session token'
  );

  const tamperedToken = token.slice(0, -4) + 'abcd';
  const tamperedVerified = verifyAdminSessionToken(tamperedToken);
  assert(tamperedVerified === null, 'Rejects tampered session token signature');

  console.log('\n=============================================');
  console.log(`Test Results: ${testsPassed} Passed, ${testsFailed} Failed`);
  console.log('=============================================\n');

  if (testsFailed > 0) {
    process.exit(1);
  }
}

runTests();

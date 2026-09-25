/**
 * Supabase Data Seeding Script
 * Run with: npx tsx scripts/seed.ts
 */
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import {
  initialFAQs,
  initialProjects,
  initialServices,
  initialSiteSettings,
  initialTestimonials,
} from '../src/data/initialData';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function seed() {
  console.log('🌱 Starting Supabase Seeding Process...');

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.');
    console.log('Please configure your .env file with your Supabase credentials:');
    console.log('SUPABASE_URL=https://xyzcompany.supabase.co');
    console.log('SUPABASE_SERVICE_ROLE_KEY=eyJh...');
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  try {
    // 1. Seed Site Settings
    console.log('Inserting Site Settings...');
    const { error: settingsError } = await supabase
      .from('site_settings')
      .upsert(initialSiteSettings);
    if (settingsError) console.error('Error seeding site_settings:', settingsError.message);
    else console.log('✅ Site settings seeded successfully.');

    // 2. Seed Services
    console.log('Inserting Services...');
    for (const service of initialServices) {
      const { error } = await supabase.from('services').upsert(service);
      if (error) console.error(`Error seeding service ${service.title}:`, error.message);
    }
    console.log('✅ Services seeded successfully.');

    // 3. Seed Projects
    console.log('Inserting Projects...');
    for (const project of initialProjects) {
      const { error } = await supabase.from('projects').upsert(project);
      if (error) console.error(`Error seeding project ${project.title}:`, error.message);
    }
    console.log('✅ Projects seeded successfully.');

    // 4. Seed Testimonials
    console.log('Inserting Testimonials...');
    for (const testimonial of initialTestimonials) {
      const { error } = await supabase.from('testimonials').upsert(testimonial);
      if (error) console.error(`Error seeding testimonial:`, error.message);
    }
    console.log('✅ Testimonials seeded successfully.');

    // 5. Seed FAQs
    console.log('Inserting FAQs...');
    for (const faq of initialFAQs) {
      const { error } = await supabase.from('faqs').upsert(faq);
      if (error) console.error(`Error seeding FAQ:`, error.message);
    }
    console.log('✅ FAQs seeded successfully.');

    // 6. Seed Admin User Allowlist
    console.log('Ensuring Admin User Allowlist...');
    const { error: adminError } = await supabase
      .from('admin_users')
      .upsert({ email: 'sajjad2003khan@gmail.com' }, { onConflict: 'email' });
    if (adminError) console.error('Error seeding admin_user:', adminError.message);
    else console.log('✅ Admin user allowlisted: sajjad2003khan@gmail.com');

    console.log('🎉 Seeding completed successfully!');
  } catch (err: unknown) {
    console.error('Fatal error during seeding:', err);
    process.exit(1);
  }
}

seed();

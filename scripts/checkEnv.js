require('dotenv').config();

const required = [
  'MONGODB_URI',
  'DBNAME',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'EMAIL_USER',
  'EMAIL_PASS'
];

const missing = required.filter(k => !process.env[k]);
if (missing.length === 0) {
  console.log('All required environment variables are set.');
  process.exit(0);
}

console.error('Missing environment variables:');
missing.forEach(m => console.error(` - ${m}`));
process.exit(2);

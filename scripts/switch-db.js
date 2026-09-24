const fs = require('fs');
const path = require('path');

const target = process.argv[2] || 'sqlite';
const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
const envPath = path.join(__dirname, '..', '.env');

if (!fs.existsSync(schemaPath)) {
  console.error('prisma/schema.prisma not found!');
  process.exit(1);
}

let schema = fs.readFileSync(schemaPath, 'utf8');

if (target === 'postgres' || target === 'postgresql') {
  schema = schema.replace(/provider\s*=\s*"sqlite"/g, 'provider = "postgresql"');
  console.log('Switched Prisma schema provider to postgresql.');
  if (fs.existsSync(envPath)) {
    let env = fs.readFileSync(envPath, 'utf8');
    if (!env.includes('postgresql://')) {
      env = env.replace(/DATABASE_URL=".*"/, 'DATABASE_URL="postgresql://postgres:postgrespassword@localhost:5432/cvcrafter?schema=public"');
      fs.writeFileSync(envPath, env);
      console.log('Updated .env DATABASE_URL to PostgreSQL connection string.');
    }
  }
} else {
  schema = schema.replace(/provider\s*=\s*"postgresql"/g, 'provider = "sqlite"');
  console.log('Switched Prisma schema provider to sqlite.');
  if (fs.existsSync(envPath)) {
    let env = fs.readFileSync(envPath, 'utf8');
    env = env.replace(/DATABASE_URL=".*"/, 'DATABASE_URL="file:./dev.db"');
    fs.writeFileSync(envPath, env);
    console.log('Updated .env DATABASE_URL to SQLite dev.db.');
  }
}

fs.writeFileSync(schemaPath, schema);
console.log('Done! Now run: npm run db:generate && npm run db:push');

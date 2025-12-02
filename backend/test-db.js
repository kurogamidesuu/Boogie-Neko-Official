import { Client } from 'pg';

// REPLACE THIS STRING WITH EXACTLY WHAT IS IN YOUR .env FILE
const connectionString = "postgresql://postgres:Hime2002@localhost:5432/boogieneko?schema=public";

const client = new Client({
  connectionString: connectionString,
});

async function testConnection() {
  try {
    console.log("Attempting to connect...");
    await client.connect();
    console.log("✅ SUCCESS! Connected to the database.");
    
    const res = await client.query('SELECT NOW()');
    console.log("Database Time:", res.rows[0]);
    
    await client.end();
  } catch (err) {
    console.error("❌ CONNECTION FAILED:", err.message);
    // If password is wrong, it will say "password authentication failed for user..."
  }
}

testConnection();
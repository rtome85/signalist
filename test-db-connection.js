// Test script for MongoDB database connection
require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_DB_URI = process.env.MONGO_DB_URI;

async function testDatabaseConnection() {
  console.log('🔍 Testing MongoDB Connection...\n');

  // Check if MONGO_DB_URI is set
  if (!MONGO_DB_URI) {
    console.error('❌ ERROR: MONGO_DB_URI is not set in environment variables');
    console.log('   Please create a .env.local file with MONGO_DB_URI defined');
    process.exit(1);
  }

  console.log('✓ MONGO_DB_URI found in environment variables');
  console.log(`  Connection string: ${MONGO_DB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')}\n`);

  try {
    console.log('🔄 Attempting to connect to MongoDB...');

    const startTime = Date.now();
    await mongoose.connect(MONGO_DB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
    });
    const endTime = Date.now();

    console.log(`✅ Successfully connected to MongoDB in ${endTime - startTime}ms\n`);

    // Get connection info
    const connection = mongoose.connection;
    console.log('📊 Connection Details:');
    console.log(`   Database Name: ${connection.db.databaseName}`);
    console.log(`   Host: ${connection.host}`);
    console.log(`   Port: ${connection.port}`);
    console.log(`   Ready State: ${connection.readyState} (1 = connected)\n`);

    // Test basic database operations
    console.log('🧪 Testing basic database operations...');

    // List collections
    const collections = await connection.db.listCollections().toArray();
    console.log(`✓ Found ${collections.length} collection(s) in database:`);
    if (collections.length > 0) {
      collections.forEach(col => {
        console.log(`   - ${col.name}`);
      });
    } else {
      console.log('   (No collections yet - this is normal for a new database)');
    }

    console.log('\n✅ All database tests passed successfully!');
    console.log('   Your database connection is working properly.\n');

  } catch (error) {
    console.error('\n❌ Database connection failed!\n');
    console.error('Error details:');
    console.error(`   Type: ${error.name}`);
    console.error(`   Message: ${error.message}`);

    if (error.message.includes('ENOTFOUND') || error.message.includes('ETIMEDOUT')) {
      console.error('\n💡 Troubleshooting tips:');
      console.error('   - Check your internet connection');
      console.error('   - Verify the MongoDB server is running and accessible');
      console.error('   - Check if your IP address is whitelisted (for MongoDB Atlas)');
    } else if (error.message.includes('authentication failed')) {
      console.error('\n💡 Troubleshooting tips:');
      console.error('   - Verify your username and password are correct');
      console.error('   - Check if the database user has proper permissions');
    } else if (error.message.includes('bad auth')) {
      console.error('\n💡 Troubleshooting tips:');
      console.error('   - Your credentials may be incorrect or URL-encoded improperly');
      console.error('   - Special characters in passwords should be URL-encoded');
    }

    process.exit(1);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed.');
  }
}

// Run the test
testDatabaseConnection();

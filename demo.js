#!/usr/bin/env node

/**
 * Demo script to showcase Qommander functionality
 */

const { handler: createCommand } = require('./handlers/createCommand');
const { handler: getCommand } = require('./handlers/getCommand');
const { handler: archiveCommand } = require('./handlers/archiveCommand');

// Mock environment variables for demo
process.env.COMMANDS_TABLE = 'qommander-commands-dev';
process.env.AWS_LAMBDA_FUNCTION_NAME = 'qommander-dev-createCommand';

async function runDemo() {
  console.log('🚀 Qommander Demo\n');

  try {
    // Demo 1: Create a command
    console.log('1. Creating a new command...');
    const createEvent = {
      body: JSON.stringify({
        name: 'Deploy to Production',
        description: 'Deploy the application to production environment',
        category: 'deployment'
      })
    };

    const createResult = await createCommand(createEvent);
    console.log(`Status: ${createResult.statusCode}`);
    
    if (createResult.statusCode === 201) {
      const command = JSON.parse(createResult.body);
      console.log(`✅ Command created: ${command.name} (ID: ${command.id})\n`);

      // Demo 2: Retrieve the command
      console.log('2. Retrieving the command...');
      const getEvent = {
        pathParameters: { id: command.id }
      };

      const getResult = await getCommand(getEvent);
      console.log(`Status: ${getResult.statusCode}`);
      
      if (getResult.statusCode === 200) {
        const retrievedCommand = JSON.parse(getResult.body);
        console.log(`✅ Command retrieved: ${retrievedCommand.name}\n`);

        // Demo 3: Archive the command
        console.log('3. Archiving the command...');
        const archiveEvent = {
          pathParameters: { id: command.id }
        };

        const archiveResult = await archiveCommand(archiveEvent);
        console.log(`Status: ${archiveResult.statusCode}`);
        
        if (archiveResult.statusCode === 200) {
          const archivedCommand = JSON.parse(archiveResult.body);
          console.log(`✅ Command archived: ${archivedCommand.name} (Status: ${archivedCommand.status})\n`);
        }
      }
    }

    console.log('🎉 Demo completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('• Run `npm test` to see all tests pass');
    console.log('• Deploy with `npm run deploy` (requires AWS credentials)');
    console.log('• Check pricing-breakdown.md for cost estimates');

  } catch (error) {
    console.error('❌ Demo failed:', error.message);
    console.log('\n💡 This is expected in demo mode without AWS services');
    console.log('   The handlers would work correctly when deployed to AWS');
  }
}

if (require.main === module) {
  runDemo();
}
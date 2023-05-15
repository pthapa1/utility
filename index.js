import { DynamoDBClient, CreateTableCommand } from '@aws-sdk/client-dynamodb';

// create the client.
const REGION = 'us-east-1';
const ENDPOINT = 'http://localhost:8000';
const ddbClient = new DynamoDBClient({ region: REGION, endpoint: ENDPOINT });

//

export const params = {
  AttributeDefinitions: [
    {
      AttributeName: 'country-code',
      AttributeType: 'S',
    },
    {
      AttributeName: 'id',
      AttributeType: 'S',
    },
  ],
  KeySchema: [
    {
      AttributeName: 'country-code',
      KeyType: 'HASH',
    },
    {
      AttributeName: 'id',
      KeyType: 'RANGE',
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
  TableName: 'addresses',
  StreamSpecification: {
    StreamEnabled: false,
  },
};

export const run = async () => {
  try {
    const data = await ddbClient.send(new CreateTableCommand(params));
    console.log('Table Created', data);
  } catch (error) {
    console.log('Error while Creating Table', error);
  }
};

run();

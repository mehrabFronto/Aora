import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Storage,
} from 'react-native-appwrite';

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.mdd.aora',
  projectId: '66211b072d2d4611e0e3',
  databaseId: '66211cd1a322f875d3c0',
  usersCollectionId: '66211cf76a16c775b8c5',
  videosCollectionId: '66211d5849841e2b3fff',
  storageId: '662120cd90412d09bf3c',
};

// Init your react-native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

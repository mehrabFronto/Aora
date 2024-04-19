import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';

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

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export async function createUser(email: string, password: string, username: string) {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.usersCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      },
    );

    return newUser;
  } catch (error) {
    throw new Error(String(error));
  }
}

// Sign In
export async function signIn(email: string, password: string) {
  try {
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error) {
    throw new Error(String(error));
  }
}

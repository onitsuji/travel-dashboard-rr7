import { Client, Account, Databases, Storage } from "appwrite";
import { appwriteConfig } from "./appwrite-config";

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpointUrl)
  .setProject(appwriteConfig.projectId);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { account, databases, storage };

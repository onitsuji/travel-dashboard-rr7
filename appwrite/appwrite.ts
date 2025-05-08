import { Client, Account, Databases, Storage } from "appwrite";
import { appWriteConfig } from "./appwrite-config";

export const client = new Client();

client
  .setEndpoint(appWriteConfig.endpointUrl)
  .setProject(appWriteConfig.projectId);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { account, databases, storage };

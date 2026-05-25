import { CreateUserParams, GetMenuParams, SignInParams } from "@/type";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appWriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  platform: "com.SwiftBite.FoodOrdering",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: "6a0b2f51001b551786b2",
  bucketId: "6a129fe5000f6d627e0f",
  // USE REAL COLLECTION ID HERE
  userCollectionId: "user",
  categoriesCollectionId: "categories",
  menuCollectionId: "menu",
  customizationsCollectionId: "customization",
  menuCustomizationsCollectionId: "menu_customizations",
};

export const client = new Client();

client
  .setEndpoint(appWriteConfig.endpoint)
  .setProject(appWriteConfig.projectId)
  .setPlatform(appWriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async ({
  name,
  email,
  password,
}: CreateUserParams) => {
  try {
    // CREATE AUTH ACCOUNT
    const newAccount = await account.create(ID.unique(), email, password, name);

    if (!newAccount) throw new Error("Account creation failed");

    // LOGIN USER
    await signIn({ email, password });

    // CREATE AVATAR URL
    const avatarUrl = avatars.getInitialsURL(name);

    // SAVE USER IN DATABASE
    const newUser = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      {
        name,
        email,
        accountId: newAccount.$id,
        avatar: avatarUrl,
      },
    );

    return newUser;
  } catch (error: any) {
    throw new Error(error as string);
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    // optional but very useful: get logged-in user
    const user = await account.get();

    return { session, user };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)],
    );

    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getMenu = async ({ category, query }: GetMenuParams) => {
  try {
    const queries: string[] = [];

    if (category) queries.push(Query.equal("categories", category));
    if (query) queries.push(Query.search("name", query));

    const menus = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.menuCollectionId,
      queries,
    );
    return menus;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getCategories = async () => {
  try {
    const categories = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.categoriesCollectionId,
    );

    return categories;
  } catch (error) {
    console.log(error);

    throw new Error("Failed to fetch categories");
  }
};

export const getCustomization = async () => {
  try {
    const customization = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.customizationsCollectionId,
    );

    return customization;
  } catch (error) {
    console.log(error);

    throw new Error("Failed to fetch categories");
  }
};

export const getCategoryById = async (categoryId: string) => {
  try {
    const category = await databases.getDocument(
      appWriteConfig.databaseId,
      appWriteConfig.categoriesCollectionId, // your categories collection
      categoryId,
    );

    return category;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch category");
  }
};

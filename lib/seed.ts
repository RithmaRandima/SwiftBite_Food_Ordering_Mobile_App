import { ID } from "react-native-appwrite";
import { appWriteConfig, databases } from "./appwrite";
import dummyData from "./data";

interface Category {
  name: string;
  description: string;
}

interface Customization {
  name: string;
  price: number;
  type: "topping" | "side" | "size" | "crust" | string;
}

interface MenuItem {
  name: string;
  description: string;
  image_url: string;
  price: number;
  rating: number;
  calories: number;
  protein: number;
  category_name: string;
  customizations: string[];
}

interface DummyData {
  categories: Category[];
  customizations: Customization[];
  menu: MenuItem[];
}

const data = dummyData as DummyData;

async function clearAll(collectionId: string): Promise<void> {
  const list = await databases.listDocuments(
    appWriteConfig.databaseId,
    collectionId,
  );

  await Promise.all(
    list.documents.map((doc) =>
      databases.deleteDocument(
        appWriteConfig.databaseId,
        collectionId,
        doc.$id,
      ),
    ),
  );
}

async function seed(): Promise<void> {
  try {
    console.log("🌱 Seeding database...");

    // =========================
    // 1. CLEAR OLD DATA
    // =========================

    await clearAll(appWriteConfig.categoriesCollectionId);
    await clearAll(appWriteConfig.customizationsCollectionId);
    await clearAll(appWriteConfig.menuCollectionId);
    await clearAll(appWriteConfig.menuCustomizationsCollectionId);

    console.log("🗑 Old data cleared");

    // =========================
    // 2. CREATE CATEGORIES
    // =========================

    const categoryMap: Record<string, string> = {};

    for (const cat of data.categories) {
      const doc = await databases.createDocument(
        appWriteConfig.databaseId,
        appWriteConfig.categoriesCollectionId,
        ID.unique(),
        {
          name: cat.name,
          description: cat.description,
        },
      );

      categoryMap[cat.name] = doc.$id;
    }

    console.log("✅ Categories seeded");

    // =========================
    // 3. CREATE CUSTOMIZATIONS
    // =========================

    const customizationMap: Record<string, string> = {};

    for (const cus of data.customizations) {
      const doc = await databases.createDocument(
        appWriteConfig.databaseId,
        appWriteConfig.customizationsCollectionId,
        ID.unique(),
        {
          name: cus.name,
          price: cus.price,
          type: cus.type,
        },
      );

      customizationMap[cus.name] = doc.$id;
    }

    console.log("✅ Customizations seeded");

    // =========================
    // 4. CREATE MENU ITEMS
    // =========================

    for (const item of data.menu) {
      // ✅ USE ONLINE IMAGE URL DIRECTLY
      const doc = await databases.createDocument(
        appWriteConfig.databaseId,
        appWriteConfig.menuCollectionId,
        ID.unique(),
        {
          name: item.name,
          description: item.description,
          image_url: item.image_url,
          price: item.price,
          rating: item.rating,
          calories: item.calories,
          protein: item.protein,
          categories: categoryMap[item.category_name],
        },
      );

      // =========================
      // 5. MENU CUSTOMIZATIONS
      // =========================

      for (const cusName of item.customizations) {
        await databases.createDocument(
          appWriteConfig.databaseId,
          appWriteConfig.menuCustomizationsCollectionId,
          ID.unique(),
          {
            menu: doc.$id,
            customization: customizationMap[cusName],
          },
        );
      }
    }

    console.log("🎉 Seeding complete");
  } catch (error) {
    console.log("❌ Failed to seed:", error);
  }
}

export default seed;

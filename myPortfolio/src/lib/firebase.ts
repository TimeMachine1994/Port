import { initializeApp } from 'firebase/app';
import { getStorage, ref, listAll, getDownloadURL, type StorageReference } from 'firebase/storage';

// Firebase configuration - you'll need to replace these with your actual config
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export interface PhotoItem {
  name: string;
  url: string;
  path: string;
  size?: number;
  timeCreated?: string;
}

/**
 * Get all photos from a specific folder in Firebase Storage
 * @param folderPath - Path to the folder (e.g., 'portfolio/', 'events/')
 * @returns Promise<PhotoItem[]>
 */
export async function getPhotosFromFolder(folderPath: string = ''): Promise<PhotoItem[]> {
  try {
    const folderRef = ref(storage, folderPath);
    const result = await listAll(folderRef);
    
    const photos: PhotoItem[] = [];
    
    // Get download URLs for all items
    for (const itemRef of result.items) {
      try {
        const url = await getDownloadURL(itemRef);
        // Note: For metadata, you would need to import getMetadata from firebase/storage
        // const metadata = await getMetadata(itemRef);
        const metadata = {}; // Simplified for now
        
        photos.push({
          name: itemRef.name,
          url: url,
          path: itemRef.fullPath,
          size: undefined,
          timeCreated: undefined
        });
      } catch (error) {
        console.warn(`Failed to get URL for ${itemRef.name}:`, error);
      }
    }
    
    // Sort by name or creation time
    return photos.sort((a, b) => {
      if (a.timeCreated && b.timeCreated) {
        return new Date(b.timeCreated).getTime() - new Date(a.timeCreated).getTime();
      }
      return a.name.localeCompare(b.name);
    });
    
  } catch (error) {
    console.error('Error fetching photos from Firebase Storage:', error);
    return [];
  }
}

/**
 * Get all folders in Firebase Storage
 * @param basePath - Base path to search from
 * @returns Promise<string[]>
 */
export async function getFolders(basePath: string = ''): Promise<string[]> {
  try {
    const folderRef = ref(storage, basePath);
    const result = await listAll(folderRef);
    
    return result.prefixes.map(prefix => prefix.name);
  } catch (error) {
    console.error('Error fetching folders from Firebase Storage:', error);
    return [];
  }
}

/**
 * Get photos from multiple folders organized by category
 * @param folders - Array of folder paths
 * @returns Promise<Record<string, PhotoItem[]>>
 */
export async function getPhotosByCategory(folders: string[]): Promise<Record<string, PhotoItem[]>> {
  const categories: Record<string, PhotoItem[]> = {};
  
  for (const folder of folders) {
    const photos = await getPhotosFromFolder(folder);
    const categoryName = folder.replace('/', '').toLowerCase() || 'general';
    categories[categoryName] = photos;
  }
  
  return categories;
}

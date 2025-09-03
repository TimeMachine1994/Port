import { initializeApp } from 'firebase/app';
import { getStorage, ref, listAll, getDownloadURL, type StorageReference } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "artfolio-b47a4.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "artfolio-b47a4",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "artfolio-b47a4.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export interface PhotoItem {
  name: string;
  url: string;
  thumbnailUrl: string;
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
    console.log('Firebase config:', {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? 'Set' : 'Missing',
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
    });
    
    const folderRef = ref(storage, folderPath);
    console.log('Folder reference:', folderRef);
    
    const result = await listAll(folderRef);
    console.log('List result:', result);
    console.log('Found items:', result.items.length);
    
    const photos: PhotoItem[] = [];
    
    // Get download URLs for all items
    for (const itemRef of result.items) {
      try {
        console.log('Processing item:', itemRef.name, itemRef.fullPath);
        const url = await getDownloadURL(itemRef);
        console.log('Got URL for', itemRef.name, ':', url);
        
        // Skip thumbnail files created by the resize extension
        if (itemRef.name.includes('_') && /_([\d]+x[\d]+)/.test(itemRef.name)) {
          console.log('Skipping thumbnail file:', itemRef.name);
          continue;
        }

        // Skip non-image files
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
        const hasImageExtension = imageExtensions.some(ext => 
          itemRef.name.toLowerCase().endsWith(ext)
        );
        if (!hasImageExtension) {
          console.log('Skipping non-image file:', itemRef.name);
          continue;
        }
        
        // Try to get auto-generated thumbnail from Firebase resize extension
        // Extension creates files with suffix like _200x200, _400x400, etc.
        // Let's try common thumbnail sizes the extension might have created
        const thumbnailSizes = ['_200x200', '_400x400', '_300x300'];
        let thumbnailUrl = url;
        let foundThumbnail = false;
        
        for (const size of thumbnailSizes) {
          try {
            const thumbnailPath = itemRef.fullPath.replace(/(\.[^.]+)$/, `${size}$1`);
            const thumbnailRef = ref(storage, thumbnailPath);
            thumbnailUrl = await getDownloadURL(thumbnailRef);
            console.log(`Found auto-generated thumbnail ${size} for ${itemRef.name}`);
            foundThumbnail = true;
            break;
          } catch (error) {
            // Continue to next size
            continue;
          }
        }
        
        if (!foundThumbnail) {
          console.log(`No auto-generated thumbnails found for ${itemRef.name}, using original URL`);
          thumbnailUrl = url;
        }

        photos.push({
          name: itemRef.name,
          url: url,
          thumbnailUrl: thumbnailUrl,
          path: itemRef.fullPath,
          size: undefined,
          timeCreated: undefined
        });
      } catch (error) {
        console.warn(`Failed to get URL for ${itemRef.name}:`, error);
      }
    }
    
    console.log('Final photos array:', photos);
    
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

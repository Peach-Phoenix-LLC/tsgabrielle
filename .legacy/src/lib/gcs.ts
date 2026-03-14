import { Storage } from '@google-cloud/storage';

const storage = new Storage();
export const bucketName = process.env.GOOGLE_CLOUD_STORAGE_BUCKET || 'tsgabrielle-media-prod';

export const bucket = storage.bucket(bucketName);

export const getPublicUrl = (filename: string) => {
    return `https://storage.googleapis.com/${bucketName}/${filename}`;
};

export const deleteFile = async (filename: string) => {
    try {
        await bucket.file(filename).delete();
        return true;
    } catch (error) {
        console.error('Error deleting file from GCS:', error);
        return false;
    }
};

export const renameFile = async (oldName: string, newName: string) => {
    try {
        const file = bucket.file(oldName);
        await file.copy(newName);
        await file.delete();
        return true;
    } catch (error) {
        console.error('Error renaming file in GCS:', error);
        return false;
    }
};

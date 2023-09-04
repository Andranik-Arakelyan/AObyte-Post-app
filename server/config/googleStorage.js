import { Storage } from "@google-cloud/storage";

export const storage = new Storage({
  projectId: process.env.GOOGLE_PROJECT_ID,
  keyFilename: process.env.KEY_FILE_NAME,
});

export const bucket = storage.bucket(process.env.BUCKET_ID);

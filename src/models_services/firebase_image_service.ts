import Resizer from 'react-image-file-resizer';
import { v4 as uuidv4 } from 'uuid';
import { FileWithPath } from 'react-dropzone';
import { getStorage, ref, uploadBytes, uploadString, getDownloadURL } from 'firebase/storage';
const imageResizeFileUri = ({ file }: { file: FileWithPath | File }): Promise<string> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1500,
      1500,
      'JPEG',
      95,
      0,
      (uri: any) => {
        resolve(uri as string);
      },
      'base64'
    );
  });

const getFirebaseStorageDownloadUrl = async ({ file }: { file: File | FileWithPath }): Promise<string> => {
  let downloadUrl = '';
  const storage = getStorage();
  const storageRef = ref(storage, `images/${uuidv4()}.jpeg`);
  const imageUri = await imageResizeFileUri({ file: file });

  try {
    const uploadTask = await uploadString(storageRef, imageUri, 'data_url');
    downloadUrl = await getDownloadURL(uploadTask.ref);
  } catch (error) {
    console.log(error);
  }

  return downloadUrl;
};

const getFirebaseStorageDownloadUrlList = async ({ files }: { files: Array<File | FileWithPath> }): Promise<Array<string>> => {
  let downloadUrls = [];

  for (const file of files) {
    const downloadUrl = await getFirebaseStorageDownloadUrl({ file: file });
    if (downloadUrl !== '') downloadUrls.push(downloadUrl);
  }

  return downloadUrls;
};

export { imageResizeFileUri, getFirebaseStorageDownloadUrl, getFirebaseStorageDownloadUrlList };

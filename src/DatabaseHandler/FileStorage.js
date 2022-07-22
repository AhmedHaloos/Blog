import app from "./Config";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'




const storage = getStorage(app);
const storageRef = ref(storage);

function uploadImage(file, id) {
  const imagesRef = ref(storageRef, id);

  return uploadBytes(imagesRef, file);

}
/**
 * 
 */
function downloadImg(id) {
  const imagesRef = ref(storageRef, id);
  return getDownloadURL(imagesRef)
}
/**
 * 
 * @param {*} id 
 * @returns 
 */
function deleteImage(id){
  const imagesRef = ref(storageRef, id);
  return deleteObject(imagesRef);

}

export { uploadImage, downloadImg, deleteImage }
// this module handle CRUD operatons for App data

import { collection, addDoc, getDocs, query, where, 
    DocumentReference, getDoc, doc, updateDoc,setDoc, 
    onSnapshot, deleteDoc} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import app from "./Config";
import { collections } from "./DataCollections";


const db = getFirestore(app);

/**
 * 
 * @param {*} dataCollection 
 * @param {*} data 
 * @returns 
 */
async function insertData(dataCollection, data) {

    const ref = doc(db, dataCollection, data.id);
    console.log(data);
   return  setDoc(ref, {...data});
   
}

async function registerForDataChange(getDataCallback, dataCollection){

    const q = query(collection(db, dataCollection))
    onSnapshot(collection(db, dataCollection), getDataCallback)
}

async function getData(dataCollection) {

    return  getDocs(collection(db, dataCollection));
   
}

async function getSingleData(dataCollection, id){

   return  getDoc(doc(db, dataCollection, id));
   

}

async function getSubData(dataCollection, field, condition, value) {
    

    const q = query(collection(db, dataCollection), where(field, condition, value));
    return  getDocs(q);

}


 function updateData(dataCollection, id, data) {

    const ref = doc(db, dataCollection, id);
    return  setDoc(ref,data);
    

}
function deleteData(dataCollection, dataId) {

    return deleteDoc(doc(db, dataCollection, dataId));


}

/**
 * 
 * @param {*} postId 
 * @param {*} psotCallback 
 */
function listenForPostUpdate(postId, psotCallback){

    onSnapshot(doc(db, collections.posts, postId), psotCallback);
}

export { insertData, getData, getSubData, updateData, deleteData, getSingleData, registerForDataChange };
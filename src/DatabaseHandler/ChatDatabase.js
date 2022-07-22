import app from "./Config";
import { getDatabase, onValue, ref, set  } from "firebase/database";
import { useContext } from "react";
import DataContext from "../DataContext";
import {Conversation} from '../DatabaseHandler/DataCollections'


const db = getDatabase(app);

/**
 * add message to conversation 
 * @param {*} senderId 
 * @param {*} msg 
 * @returns 
 */
function sendMessage(convId, msg){

   // const conv = new Conversation(senderId, recId, msg)
    const convRef = ref(db,'conversations/' + convId + '/' + msg.id );
    return  set(convRef, msg);


}
/**
 * 
 * @param {*} senderId 
 * @param {*} recId 
 * @param {*} clallback 
 * @returns 
 */
function getMessage(senderId, recId, clallback){


}
/**
 * get a complete conversation between 2 users 
 * @param {*} clallback 
 * @returns 
 */
function getConversationId(){

    return Math.ceil( Date.now() * Math.random()) ;

}

/**
 * 
 * @param {*} id 
 */

function getConversation(id){


}

function registerForChat(chatId, chatCallback){

    const chatRef = ref(db, 'conversations/' + chatId);
    onValue(chatRef, chatCallback);

}

/**
 * create 
 */
// function createConversation(senderId, recId, msg){

//     const conv = new Conversation(senderId, recId, msg)
//     const convRef = ref(db,'conversations/', conv.id );
//     return set(convRef, msg);


// }


export {sendMessage,getMessage, getConversation, getConversationId, registerForChat }
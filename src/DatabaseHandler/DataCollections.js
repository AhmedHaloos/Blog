import { getConversationId } from "./ChatDatabase";

const collections = {

    users: 'users',
    posts: 'posts',
    comments: 'comments'
}

class Post {
  
    constructor(postBody,postTitle = '',  postDate, userId, likeUsers = []) {
        this.id = Date.now() * Math.random() * 10000  + "";
        this.postBody = postBody;
        this.postDate = postDate;
        this.userId = userId;
        this.likeUsers = likeUsers;
        this.postTitle = postTitle
    }
}

class Comment {

    constructor(commentBody, commentDate, postId) {
        this.commentBody = commentBody;
        this.commentDate = commentDate;
        this.postId = postId;
    }

}

class User {

    constructor( name, phone, email, password, postId = "", image = '', convs = {}, uid = '') {
        this.id = uid;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.postId = postId;
        this.image = image;
        this.convs = convs;
    }

}

class Conversation {

    constructor(senderId, recvrId, message){

        this.id = getConversationId();
        this.senderId = senderId;
        this.recvrId = recvrId;
        this.message = message;
    }

}

class Message{

    constructor(sender,  msgBody){
        this.id = Date.now();
        this.sender = sender;
        this.msgBody = msgBody;
        this.msgDate = Date.now();
    }

}





export { collections, Post, Comment, User, Message, Conversation };
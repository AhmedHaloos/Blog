import { collections, Message as Msg } from "../DatabaseHandler/DataCollections"
import Message from "../components/Message"
import { useContext, useEffect, useState } from "react"
import { sendMessage, getMessage, getConversationId } from "../DatabaseHandler/ChatDatabase"
import { useLocation } from "react-router-dom"
import DataContext from "../DataContext"
import { updateData } from "../DatabaseHandler/FireStoreDB"
import Test from "../test"

export default function Chat() {

    const [msgs, setMsgs] = useState([])
    const [msg, setMsg] = useState('')

    const { state } = useLocation();
    const { id } = state !== null ? state : '';
    const dataContext = useContext(DataContext);
    // const [chatUser, setChatUser] = useState({});


    useEffect(() => {
      

            // let curUser = dataContext.users.find((user) => {
            //   return id== user.id;
            // })
        
            // setChatUser(curUser);
        


    }, [])

    useEffect(() => {
        let msgs = [] ;
        // const curUserConvs = dataContext.getCurrentUser()?.convs;

     
        dataContext.conversations.forEach(conv => {
          

            if(conv.id == id){
              for (const key in conv.convBody) {
               msgs.push( conv.convBody[key]);
              }
             
            }
        });

        // for ( let convId in dataContext.conversations) {
            
        //      console.log(convId);
            // console.log( id);
        //   if(dataContext.conversations.id == id){
            // msgs.push(dataContext.conversations.conv);
        //   }
        // }


        setMsgs(msgs)
    }, [dataContext.conversations, dataContext.users])


    const getRecUser = () => {

        let recUSer = dataContext.users.find((user) => {

            return user.id == id;
        })

        console.log(recUSer);
        return recUSer;

    }

    const handlMessage = (e) => {

        setMsg(e.target.value);

    }
    const handleAddMessge = () => {

        if (msg.msgBody === '') {
            return;
        }
        setMsg('');
        const recUser = getRecUser();
        const senderUser = dataContext.getCurrentUser();
        if (recUser == undefined || recUser == null || senderUser == undefined || senderUser == null) {

            alert('message did not saved');
            return;
        }

        let message = new Msg(senderUser.id, msg);
        const convId = updateUsers();
        if (convId !== null) {
            sendMessage(convId, message)
                .then(() => {

                    console.log('message added');
                    alert('Message Sent')
                    //  updateUsers();
                    
                })
                .catch((error) => {
                    alert('Message Not Sent')
                    console.log(error);
                });
        }
    }

    const updateUsers = () => {

        let convId = getConversationId();
        const recUser = getRecUser();
        const senderUser = dataContext.getCurrentUser();
        if (recUser == undefined || recUser == null || senderUser == undefined || senderUser == null) {

            alert('message did not saved');
            return convId;
        }

        //check if this conv. is already exist 


        // if conv is exist  = conversation
        // then convId = conversation
        // if not then generate convId and update the sender and receiver 
        //with convId
        //console.log('inside sender');
        if (senderUser.convs[`${recUser.id}`]) {

            convId = senderUser.convs[`${recUser.id}`];
            console.log(senderUser.convs[`${recUser.id}`]);
        }
        else {
            let obj = senderUser.convs;
            obj[`${recUser.id}`] = convId
            senderUser.convs = obj;

        }

        if (recUser.convs[`${senderUser.id}`]) {
            convId = recUser.convs[`${senderUser.id}`];
            console.log(recUser.convs[`${senderUser.id}`]);
        }
        else {
            let obj = recUser.convs;
            obj[`${senderUser.id}`] = convId
            recUser.convs = obj;
            // console.log(convId);
        }

        updateData(collections.users, recUser.id, recUser);
        updateData(collections.users, senderUser.id, senderUser);

        return convId;
        // update users with the new convs

        // send message on the convId

    }

    const handleEnter = (e) => {

        if(e.target.value == ''){
            return;
        }
        if (e.key == 'Enter'){
           handleAddMessge();
        }
    }


    return (

        <div>

            <div className="chat">
                <Test currPage={'chat'} />
                {
                    msgs.map((msg) => {

                        return (<Message msg={msg} />)
                    })
                }
                <div className="msg-input">

                    <input type={'text'} onChange={handlMessage} value={msg} onKeyPress={(e) => { handleEnter(e) }}
                        id='msgInput' placeholder="type your message" />
                    <input type={'button'} onClick={() => { handleAddMessge() }} value={'Send'} id='sendMsgBtn' />
                </div>
            </div>
        </div>

    )
}
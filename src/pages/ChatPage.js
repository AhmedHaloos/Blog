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
    const [cnvs, setCnvs] = useState([]);
    const [convUserId, setConvUserId] = useState("");



    useEffect(() => {

        dispConv();
        dispAllConvs();
        getConvUsers();

        // console.log(id);
        // let msgs = [] ;
        // //  console.log(dataContext.conversations);

        //  for (const key in dataContext.conversations) {

        //      //    console.log(key);
        //      if(key == dataContext.getCurrentUser()?.convs[`${id}`]){
        //        for (const id in dataContext.conversations[key]) {

        //         console.log(dataContext.conversations[key][id]);
        //         msgs.push(dataContext.conversations[key][id])
        //        } 
        //         // console.log( dataContext.getCurrentUser()?.convs[`${id}`]);

        //     }
        //  }
        // setMsgs(msgs);
    }, [dataContext.conversations])


    const dispConv = () => {

        let msgs = [];
        //  console.log(dataContext.conversations);

        for (const key in dataContext.conversations) {

            //    console.log(key);
            if (key == dataContext.getCurrentUser()?.convs[`${id}`]) {
                setConvUserId(key);
                console.log(key);
                for (const id in dataContext.conversations[key]) {

                    msgs.push(dataContext.conversations[key][id])

                }

            }
        }
        setMsgs(msgs);

    }

    const dispAllConvs = () => {

        let convs = []
        for (const key in dataContext.getCurrentUser()?.convs) {

            convs.push(dataContext.getCurrentUser()?.convs[key])
        }
        setCnvs(convs);
    }


    const dispMsgs = (key, id) => {

        let msgs = [];
        setConvUserId(id);
        for (const id in dataContext.conversations[key]) {

            // console.log(dataContext.conversations[key][id]);
            msgs.push(dataContext.conversations[key][id])
        }

        setMsgs(msgs);
    }


    const getConvUsers = () => {

        //console.log(cnvs);
        let CUsers = [];
        for (const key in dataContext.getCurrentUser()?.convs) {

            CUsers.push(getUser(key))

        }
        console.log(CUsers);
        setCnvs(CUsers)
    }

    const getUser = (id) => {
        let mUser = {}
        mUser = dataContext.users.find((user) => {
            return user.id == id;
        })
        //console.log(mUser);
        return mUser;
    }



    const getRecUser = () => {

        let recUSer = dataContext.users.find((user) => {

            return user.id == convUserId;
        })

        return recUSer;

    }

    const handlMessage = (e) => {

        setMsg(e.target.value);

    }
    const handleAddMessge = () => {

        if (msg.msgBody === '') {
            return;
        }
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

                    setMsg('');
                    console.log('message added');
                    // alert('Message Sent')
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

        if (e.target.value == '') {
            return;
        }
        if (e.key == 'Enter') {
            handleAddMessge();
        }
    }


    return (

        <div className="row d-flex felx direction-row" style={{ position: 'relative' }}>
            <Test currPage={'chat'} />
            <div className="col-3 conv-list">

                {
                    cnvs.map((convUser) => (

                        <div key={convUser.id} className="conv-list-item"
                            onClick={() => { dispMsgs(dataContext.getCurrentUser()?.convs[convUser.id], convUser.id) }}
                        >{convUser.name}</div>

                    ))

                }
            </div>
            <div className="chat col-9" style={{ marginLeft: 0 }}>
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
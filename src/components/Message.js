import { useContext } from "react"
import DataContext from "../DataContext"
import PostDropDown from "./PostDropDown";




export default function Message({msg}){

    const dataContext = useContext(DataContext);

    return (

        <div className="msg-body d-flex">
            
            <p style={{alignSelf:msg.sender == dataContext.currentUser.uid? 'flex-end':'flex-start',
                 fontStyle:'normal', backgroundColor : msg.sender == dataContext.currentUser.uid? '#a09':'#f60'
        }}>{msg.msgBody}</p>
            <p style={{alignSelf:msg.sender == dataContext.currentUser.uid? 'flex-end':'flex-start'}}>{new Date( msg.msgDate).toDateString()}</p>
        </div>

    )


}
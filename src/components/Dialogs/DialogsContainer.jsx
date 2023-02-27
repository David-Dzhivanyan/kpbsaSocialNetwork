import Dialogs from "./Dialogs.jsx";
import {sendMessage,} from '../../redux/dialog-reducer.js';
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect.js";
import { compose } from "redux";
import {getMessagesData, getDialogsData} from "../../redux/dialog-selectors" 


let mapStateToProps = (state)=>{
    return{
        messagesData: getMessagesData(state),
        dialogsData: getDialogsData(state),
    }
}

export default compose(
    connect(mapStateToProps,{sendMessage,}),
    withAuthRedirect
)(Dialogs);
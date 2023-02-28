const SEND_MESSAGE = 'dialogs/SEND-MESSAGE';

let initialState ={
    messagesData:[
        {id:1, message:'hi'},
        {id:2, message:'ky'},
        {id:3, message:'priv'},
        {id:4, message:'chd kd'},
    ],
    dialogsData:[
        {id:1, name:'Никита'},
        {id:2, name:'Толик'},
        {id:3, name:'Вова'},
        {id:4, name:'Максим'},
        {id:5, name:'Егор'},
        
    ],
}


const dialogReducer = (state=initialState , action) => {

    if(action.type === SEND_MESSAGE){
        let newMessage = {
            id: state.messagesData.length + 1,
            message: action.text,
        }
        return {
            ...state,
            messagesData: [...state.messagesData, newMessage],
        };
    }

    return state;
}


export const sendMessage = (text) =>({type: SEND_MESSAGE, text});

export default dialogReducer;
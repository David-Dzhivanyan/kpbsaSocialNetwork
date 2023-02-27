import profileReducer from './profile-reducer.js';
import dialogReducer from './dialog-reducer.js';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let store ={
    _state: {
        profilePage:{
            postData:[
                {id:1, text:'hi, how are you?', likesCount:12},
                {id:2, text:'It`s my first post!', likesCount:8},
            ],
            newPostText:'',
        },
        dialogsPage:{
            messagesData:[
                {id:1, message:'hi'},
                {id:2, message:'ky'},
                {id:3, message:'priv'},
                {id:4, message:'chd kd'},
            ],
            newMessagesText:'',
            dialogsData:[
                {id:1, name:'Никита'},
                {id:2, name:'Толик'},
                {id:3, name:'Вова'},
                {id:4, name:'Максим'},
                {id:5, name:'Егор'},
                
            ],
        }
    },
    _callSubscriber(){
        console.log('')
    },

    getState(){
        return this._state;
    },
    subscribe(observer){
        this._callSubscriber = observer;
    },
    dispatch(action){ //{type:'ADD-POST'}
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogReducer(this._state.dialogsPage, action)

        this._callSubscriber(this._state);
    },
};

window.store = store;
export default store;
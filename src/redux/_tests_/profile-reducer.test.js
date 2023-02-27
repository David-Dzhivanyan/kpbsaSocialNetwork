import profileReducer from "../profile-reducer";
import { addPost } from "../profile-reducer";

test('new post should be added', () => {
    let action = addPost("sd");
    let state = {
        postData:[
            {id:1, text:'hi, how are you?', likesCount:12},
            {id:2, text:'It`s my first post!', likesCount:8},
        ],
    };
    let newState = profileReducer(state,action);
    expect(newState.postData.length).toBe(3);
});
  

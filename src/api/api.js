import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "4c7e753f-8774-4aec-afc9-4e00cf3434bc",
    },
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
})

export const usersAPI = {
    getUsers(currentPage, pageSize){

        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => response.data)
    },
    unfollow(id){
        return instance.delete(`follow/${id}`)
        .then(response => response.data)
    },
    follow(id){
        return instance.post(`follow/${id}`)
        .then(response => {
            return response.data   
        })
    }
}

export const profileAPI = {
    setUser(id){
        return instance.get(`profile/${id}`)
        .then(response => response.data)
    },
    getStatus(id){
        return instance.get(`/profile/status/${id}`)
        .then(response => response.data)
    },
    updateStatus(status){
        return instance.put(`/profile/status`,{status})
        .then(response => response.data)
    }
}

export const authAPI = {
    getMe(){
        return instance.get(`auth/me`)
        .then(response => response.data);
    },
    login(email, password, rememberMe){
        return instance.post(`auth/login`,{email, password, rememberMe})
        .then(response => response.data);
    },
    logout(){
        return instance.delete(`auth/login`)
        .then(response => response.data);
    }
}



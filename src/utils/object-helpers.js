export const updateObjectInArray = (items, id, objPropName, newObjProp) => {
    console.log(items, id, objPropName, newObjProp)
    return items.map(u=>{
        if(u[objPropName] === id){
            return {...u, ...newObjProp}
        }
        return u
    })
}
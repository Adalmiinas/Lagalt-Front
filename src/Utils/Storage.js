export const storageSave = (key,value) => {
    sessionStorage.setItem(key,JSON.stringify(value));
}

export const storageRead = key => {
    const data = sessionStorage.getItem(key);

    if(data){
        return JSON.parse(data);
    }

    else{
        return null;
    }
}

export const storageDelete = key => {
    sessionStorage.removeItem(key)
}
function isEmpty(val){
    if(Array.isArray(val)) {
        return val.length == 0;
    } 
    
    if(val) { // if the value is not {null, undefined, NaN, "", 0, false
        return false;
    } 
    return true;
}

function parseJson(text) {
    if(!isEmpty(text)) {
        try {
            let json = JSON.parse(text);
            return json;
        } catch (e) {
            console.debug("Error: response is not with json format!");
            console.log("Error ...");
        }
        return null;
    }
}

export {isEmpty, parseJson};
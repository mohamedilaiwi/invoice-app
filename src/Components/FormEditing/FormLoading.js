/* Dealing with refreshes and storing data locally */


/* If form is changing senderAddress, this function updates it 
    pre: value is a string
    post: localStorage changes senderAddress of this form
*/
export const changeSenderAddress = (value) => {
    if ((typeof value) === 'string') {
        _setJSONData('senderAddress', value);        
    }
};


/* If form is changing clientAddress, this function updates it 
    pre: value is a string
    post: localStorage changes senderAddress of this form
*/
export const changeClientAddress = (value) => {
    if ((typeof value) === 'string') {
        // Retrieve the JSON data from localStorage
        _setJSONData('clientAddress', value);
    }
};


const _setJSONData = (typeAddress, value) => {
    console.log(value);
    const jsonData = localStorage.getItem(typeAddress);
    // Parse the JSON data into an object
    const parsedData = JSON.parse(jsonData);

    // Modify the "street" field
    parsedData.senderAddress.street = value;

    // Convert the modified object back to JSON
    const modifiedJsonData = JSON.stringify(parsedData);

    // Update the JSON data in localStorage
    localStorage.setItem(typeAddress, modifiedJsonData);
}


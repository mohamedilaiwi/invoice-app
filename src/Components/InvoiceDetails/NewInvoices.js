import { formatDate, generateRandomID, calcTotal } from "../../utilities/utils";

export const CreateNewInvoices = (newItems, editedForm, status) => {
    editedForm.items = newItems;
    editedForm.status = status;
    editedForm.createdAt = formatDate(new Date());
    editedForm.id = generateRandomID(5);

    editedForm.total = calcTotal(newItems);
};

export const StoreNewInvoice = (editedForm) => {
    console.log("new invoice", editedForm);
    // Retrieve the existing array from localStorage
    const existingArray = localStorage.getItem('invoices');

    let newArray = [];

    if (existingArray) {
        // If the array exists, parse it from JSON
        newArray = JSON.parse(existingArray);
    }

    // Append the new object to the array
    newArray.push(editedForm);

    // Store the updated array back in localStorage
    localStorage.setItem('invoices', JSON.stringify(newArray));
};

export const GetAllInvoices = () => {
    return JSON.parse(localStorage.getItem('invoices'));  
};

import mysql2 from 'mysql2';
import * as utils from '../../utilities/utils.js';

const { formatDate, generateRandomID, calcTotal } = utils;

// export const CreateNewInvoices = (newItems, editedForm, status) => {
//     editedForm.items = newItems;
//     editedForm.status = status;
//     editedForm.createdAt = formatDate(new Date());
//     editedForm.id = generateRandomID(5);

//     editedForm.total = calcTotal(newItems);
// };

// export const StoreNewInvoice = (editedForm) => {
//     // Retrieve the existing array from localStorage
//     const existingArray = localStorage.getItem('invoices');

//     let newArray = [];

//     if (existingArray) {
//         // If the array exists, parse it from JSON
//         newArray = JSON.parse(existingArray);
//     }

//     // Append the new object to the array
//     newArray.push(editedForm);

//     // Store the updated array back in localStorage
//     localStorage.setItem('invoices', JSON.stringify(newArray));
//     return true;
// };

// export const StoreEditInvoice = (id, editedForm) => {
//   // Get the existing invoices array from localStorage
//   const invoicesJSON = localStorage.getItem('invoices');
  
//   // Parse the JSON data to get the array of objects
//   const invoices = JSON.parse(invoicesJSON);
  
//   // Find the index of the object with the matching ID
//   const index = invoices.findIndex(invoice => invoice.id === id);
  
//   if (index !== -1) {
//     // Replace the old object with the new one
//     invoices[index] = editedForm;
    
//     // Convert the updated array back to JSON
//     const updatedInvoicesJSON = JSON.stringify(invoices);
    
//     // Update the 'invoices' key in localStorage
//     localStorage.setItem('invoices', updatedInvoicesJSON);
    
//     console.log(`Invoice with ID '${id}' replaced.`);
//     return true;
//   } else {
//     console.log(`Invoice with ID '${id}' not found.`);
//   }
// };

// export const DeleteStoredItem = (id) => {
//     try {
//       // Get the existing invoices array from localStorage
//       const invoicesJSON = localStorage.getItem('invoices');
//       if (!invoicesJSON) {
//         // If the 'invoices' key doesn't exist, nothing to delete
//         return;
//       }
  
//       // Parse the JSON string to an array
//       const invoicesArray = JSON.parse(invoicesJSON);
  
//       // Find the index of the object with the matching id
//       const indexToDelete = invoicesArray.findIndex(item => item.id === id);
  
//       if (indexToDelete !== -1) {
//         // If the index is found, remove the object from the array
//         invoicesArray.splice(indexToDelete, 1);
  
//         // Update the array in localStorage
//         localStorage.setItem('invoices', JSON.stringify(invoicesArray));
//       }
//     } catch (error) {
//       console.error('Error deleting item:', error);
//     }
//   };


// export const GetAllInvoices = () => {
//     return JSON.parse(localStorage.getItem('invoices'));  
// };



// Basic example of adding invoice to mysql table


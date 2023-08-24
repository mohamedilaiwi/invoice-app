import mysql from 'mysql2';
import * as utils from '../utilities/utils.js';

const { formatDate, generateRandomID, calcTotal } = utils;

/* NewInvoices.mjs is used for github pages, due to not hosting server */

const connection = mysql.createPool({
    host: process.env.INVOICE_HOST,
    password: process.env.INVOICE_PASSWORD,
    database: process.env.INVOICE_DATABASE,
    port: process.env.INVOICE_PORT,
})  


const CreateNewInvoices = (newItems, editedForm, status) => {
    editedForm.items = newItems;
    editedForm.status = status;
    editedForm.createdAt = formatDate(new Date());
    editedForm.id = generateRandomID(5);

    editedForm.total = calcTotal(newItems);
};


const StoreNewInvoice = (editedForm) => {
    try {
        // Retrieve the existing array from server
        const invoiceQuery = `
        INSERT INTO invoices (
        id, createdAt, paymentDue, description, paymentTerms, clientName,
        clientEmail, status, senderStreet, senderCity, senderPostCode,
        senderCountry, clientStreet, clientCity, clientPostCode, clientCountry
        ) VALUES (
        ${editedForm.id}, ${editedForm.createdAt}, ${editedForm.paymentDue}, ${editedForm.description}, ${editedForm.clientName}, ${editedForm.clientEmail}, ${editedForm.status}, ${editedForm.senderAddress}, ${editedForm.senderCity}, ${editedForm.senderPostcode}, ${editedForm.senderCountry}, ${editedForm.senderAddress}
        );
    `;
        connection.query(invoiceQuery);

        // Get the ID of the inserted invoice
        const [invoiceIdRows] = connection.query('SELECT LAST_INSERT_ID() AS invoiceId');
        const invoiceId = invoiceIdRows[0].invoiceId;

        const itemQueries = editedForm.items;

        for (const itemQuery of itemQueries) {
            connection.query(itemQuery, [editedForm.id]);
        }

        console.log('Data inserted successfully!');
    } catch (error) {
        console.error('Error: ', error);
    }
};

const updateInvoiceInDatabase = async (connection, id, editedForm) => {
    const updateQuery = `
      UPDATE invoices
      SET
        createdAt = ?,
        paymentDue = ?,
        description = ?,
        paymentTerms = ?,
        clientName = ?,
        clientEmail = ?,
        status = ?,
        senderStreet = ?,
        senderCity = ?,
        senderPostCode = ?,
        senderCountry = ?,
        clientStreet = ?,
        clientCity = ?,
        clientPostCode = ?,
        clientCountry = ?
      WHERE id = ?;
    `;
  
    const updateValues = [
      editedForm.createdAt,
      editedForm.paymentDue,
      editedForm.description,
      editedForm.paymentTerms,
      editedForm.clientName,
      editedForm.clientEmail,
      editedForm.status,
      editedForm.senderAddress.street,
      editedForm.senderAddress.city,
      editedForm.senderAddress.postCode,
      editedForm.senderAddress.country,
      editedForm.clientAddress.street,
      editedForm.clientAddress.city,
      editedForm.clientAddress.postCode,
      editedForm.clientAddress.country,
      id
    ];
  
    await connection.execute(updateQuery, updateValues);
  };
  
  export const StoreEditInvoice = async (id, editedForm) => {
    try {
      const connection = await mysql.createConnection({
        host: 'your_host',
        user: 'your_user',
        password: 'your_password',
        database: 'your_database'
      });
  
      await updateInvoiceInDatabase(connection, id, editedForm);
  
      console.log(`Invoice with ID '${id}' updated.`);
      return true;
    } catch (error) {
      console.error('Error:', error);
      return false;
    } finally {
      connection && connection.end(); // Close the connection when done
    }
  };

  const deleteInvoiceFromDatabase = async (connection, id) => {
    const deleteQuery = `
      DELETE FROM invoices
      WHERE id = ?;
    `;
  
    await connection.execute(deleteQuery, [id]);
  };
  
  export const DeleteStoredItem = async (id) => {
    try {
      await deleteInvoiceFromDatabase(connection, id);
  
      console.log(`Invoice with ID '${id}' deleted.`);
      return true;
    } catch (error) {
      console.error('Error deleting item:', error);
      return false;
    } finally {
      connection && connection.end(); // Close the connection when done
    }
  };

  export const GetAllInvoices = async () => {
    try {
      const [rows] = await connection.execute('SELECT * FROM invoices');
      connection.end(); // Close the connection
  
      return rows;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };


export { StoreNewInvoice, CreateNewInvoices };
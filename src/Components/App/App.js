import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideNav from '../SideNav/SideNav';
import MainContent from '../MainContent/MainContent';
import InvoiceDetails from '../InvoiceDetails/InvoiceDetails';
import { ConfirmDeletion } from '../InvoiceDetails/InvoiceDetails';
import EditFormContainer from '../FormEditing/FormEditing';
import NewFormContainer from '../FormEditing/FormCreation.js';
import { cleanForm } from '../../utilities/utils';

import { useState, useEffect } from 'react';
import { GetAllInvoices, DeleteStoredItem } from '../InvoiceDetails/NewInvoices';

function App() {
    const [ formData, setFormData ] = useState(null); // all of the forms stored locally
    const [ selectedInvoice, setSelectedInvoice ] = useState(null); // the invoice user selects
    const [newItems, setNewItems] = useState([]); // items section of JSON object
    const [displayDelete, setDisplayDelete] = useState(false);
    const [editedForm, setEditedForm] = useState(cleanForm()); // form to edit/new 
    const [theme, setTheme] = useState({ isLight: true, isDark: false });


    const handleThemeChange = () => {
      setTheme({
        isLight: !theme.isLight,
        isDark: !theme.isDark,
      });
    };

    
    useEffect(() => {
      const invoices = GetAllInvoices();
      setFormData(invoices);
    }, []);



    const handleDeleteButton = () => {
      setDisplayDelete(!displayDelete);
    };

    const deleteForm = () => {
      DeleteStoredItem(selectedInvoice.id);
    
      // Update the formData state after deletion
      setFormData(prevFormData => prevFormData.filter(item => item.id !== selectedInvoice.id));
    
      // Reset selectedInvoice and hide deletion confirmation
      setSelectedInvoice(null);
        setDisplayDelete(false);
      
      window.history.go(-1);
    }



    const handleInputChange = (field, value) => {
      // Split the field into its components (if it's a nested field)
      const fieldComponents = field.split('-');

      if (fieldComponents.length === 1) {
          // If it's not a nested field, update directly
          setEditedForm(prevForm => ({
              ...prevForm,
              [field]: value
          }));
      } else if (fieldComponents.length === 2) {
          // If it's a nested field, update accordingly
          const [parentField, nestedField] = fieldComponents;
          setEditedForm(prevForm => ({
              ...prevForm,
              [parentField]: {
                  ...prevForm[parentField],
                  [nestedField]: value
              }
          }));
      }
  };



  const updateInvoiceData = () => {
    const newInvoice = { ...editedForm }; // Clone the editedForm
    setFormData(prevData => [...prevData, newInvoice]);
    setEditedForm(null);
  };


  const handleNewItem = () => {
    setNewItems(prevItems => [...prevItems, {"name": '', "quantity": null, "price": null, "total": null}]); // Add an empty object
  }

  const handleFormInputChange = (index, field, value) => {
    setNewItems(prevItems => {
        const updatedItems = [...prevItems];
        updatedItems[index] = {
            ...updatedItems[index],
            [field]: value
        };
        updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].price;
        console.log('Inside:', updatedItems);
        return updatedItems;
    });
  };



  return (
    <div className={`App ${theme.isLight ? 'light-container' : 'dark-container'}`}>
      <Router>
        <SideNav theme={theme} handleThemeChange={handleThemeChange}/>
        {displayDelete && <ConfirmDeletion invoice={selectedInvoice.id} handleDeleteButton={handleDeleteButton} deleteForm={deleteForm} /> }
        <Routes>
          <Route exact path='/' element={<MainContent data={formData} />} />
          <Route path='/invoice/:id' element={<InvoiceDetails formData={formData} selectedInvoice={selectedInvoice} setSelectedInvoice={setSelectedInvoice} handleDeleteButton={handleDeleteButton} />} />
          <Route path='/invoice/edit/:id/' element={<EditFormContainer editedForm={editedForm} selectedInvoice={selectedInvoice} handleInputChange={handleInputChange} setEditedForm={setEditedForm} updateInvoiceData={updateInvoiceData} handleFormInputChange={handleFormInputChange} />} />
          <Route path='/invoice/new' element={<NewFormContainer handleInputChange={handleInputChange} handleNewItem={handleNewItem} handleFormInputChange={handleFormInputChange} newItems={newItems} editedForm={editedForm} updateInvoiceData={updateInvoiceData} />} />
        </Routes>
      </Router>

    </div>
  );
}



export default App;
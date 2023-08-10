import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideNav from '../SideNav/SideNav';
import MainContent from '../MainContent/MainContent';
import InvoiceDetails from '../InvoiceDetails/InvoiceDetails';
import { InvoiceFooter } from '../InvoiceDetails/InvoiceDetails';
import EditFormContainer from '../FormEditing/FormEditing';
import NewFormContainer from '../FormEditing/FormCreation.js';

import { useState, useEffect } from 'react';
import { GetAllInvoices } from '../InvoiceDetails/NewInvoices';

function App() {
  const [ formData, setFormData ] = useState(null);
  const [ selectedInvoice, setSelectedInvoice ] = useState(null);

  useEffect(() => {
    const invoices = GetAllInvoices();
    setFormData(invoices);
  }, []);

  return (
    <div className='App'>
      <Router>
        <SideNav />
        <Routes>
          <Route exact path='/' element={<MainContent data={formData} />} />
          <Route path='/invoice/:id' element={<InvoiceDetails formData={formData} selectedInvoice={selectedInvoice} setSelectedInvoice={setSelectedInvoice} />} />
          <Route path='/invoice/edit/:id/' element={<EditFormContainer form={selectedInvoice}/>} />
          <Route path='/invoice/new' element={<NewFormContainer />} />
        </Routes>
      </Router>

    </div>
  );
}



export default App;
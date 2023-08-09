import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideNav from '../SideNav/SideNav';
import MainContent from '../MainContent/MainContent';
import InvoiceDetails from '../InvoiceDetails/InvoiceDetails';
import { InvoiceFooter } from '../InvoiceDetails/InvoiceDetails';
import EditFormContainer from '../FormEditing/FormEditing';
import NewFormContainer from '../FormEditing/FormCreation.js';

import { useState } from 'react';

function App() {
  const [ formData, setFormData ] = useState(null);

  
  return (
    <div className='App'>
      <Router>
        <SideNav />
        <Routes>
          <Route exact path='/' element={<MainContent />} />
          <Route path='/invoice/:id' element={<InvoiceDetails formData={formData} setFormData={setFormData} />} />
          <Route path='/invoice/edit/:id/' element={<EditFormContainer form={formData}/>} />
          <Route path='/invoice/new' element={<NewFormContainer />} />
        </Routes>
      </Router>

    </div>
  );
}



export default App;

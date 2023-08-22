import './FormEditing.css'
import backArrow from '../../images/assets/icon-arrow-down.svg';
import deleteImg from '../../images/assets/icon-delete.svg';
import { EditInvoiceFooter } from '../InvoiceDetails/InvoiceDetails';
import { useEffect, useState } from 'react';
import { StoreEditInvoice } from '../InvoiceDetails/NewInvoices';
import { useNavigate } from 'react-router-dom';
import { cleanForm } from '../../utilities/utils';

const EditFormContainer = ({editedForm, selectedInvoice, handleInputChange, setEditedForm, updateInvoiceData, handleFormInputChange}) => {
    const [isReturnClicked, setIsReturnClicked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setEditedForm(selectedInvoice);
    }, [])


    const handleSaveSubmit = () => {
        const completed = StoreEditInvoice(editedForm.id, editedForm);
        if (completed) {
            updateInvoiceData(editedForm);
            navigate('/');
        }
    }

    const handleCancelSubmit = () => {
        setEditedForm(cleanForm());
        navigate('/');
    }

    const handleReturnClick = () => {
        setIsReturnClicked(true);
        setEditedForm(cleanForm());

        setTimeout(() => {
            navigate(-1);
        }, 1000)
    };


    return (
        <>
            {editedForm ?         
                <div className={`Editting-Form-Wrapper ${isReturnClicked ? 'return-page-shifted' : ''}`}>
                    <EditForm form={editedForm} handleInputChange={handleInputChange} handleReturnClick={handleReturnClick} handleFormInputChange={handleFormInputChange}/>
                    <EditInvoiceFooter handleSaveSubmit={handleSaveSubmit} handleCancelSubmit={handleCancelSubmit} />
                </div> : 
                'Loading..'}
        </>
    );
};


export const EditForm = ({form, handleInputChange, handleReturnClick, handleFormInputChange}) => {
    return (
        <div className='Editting-Form-Wrapper'>
            <div
                className={`return-page-wrapper`}
                onClick={handleReturnClick}
            >
                <img src={backArrow} alt=''/>
                Go back
            </div>
            <div className='Editing-Form'>
                <h2>Edit <span>#</span>{form.id}</h2>
                <BillFrom editedForm={form} handleInputChange={handleInputChange}/>
                <BillTo editedForm={form} handleInputChange={handleInputChange}/>
                <ItemList form={form} handleFormInputChange={handleFormInputChange} />
            </div>
        </div>
    );
};

export const BillFrom = ({editedForm, handleInputChange}) => {
    return (
        <div className='Bill-From-Wrapper'>
            <h4 className='billing-header' id='bill-from'>Bill From</h4>
            <div className='Street-Address-Container form-container'>
                <label htmlFor='street'>Street Address</label>
                <input 
                    type='text' 
                    name='street' 
                    value={editedForm.senderAddress.street}
                    onChange={e => handleInputChange('senderAddress-street', e.target.value)}
                />
            </div>
            <div className='City-Postcode-Wrapper'>
                <div className='City-Container form-container'>
                    <label htmlFor='city'>City</label>
                    <input 
                        type='text' 
                        name='city' 
                        value={editedForm.senderAddress.city} 
                        onChange={e => handleInputChange('senderAddress-city', e.target.value)}
                    />
                </div>
                <div className='Postcode-Container form-container'>
                    <label htmlFor='postCode'>Post Code</label>
                    <input 
                        type='text' 
                        name='postCode' 
                        value={editedForm.senderAddress.postCode} 
                        onChange={e => handleInputChange('senderAddress-postCode', e.target.value)}
                    />
                </div>
            </div>
            <div className='Country-Container form-container'>
                <label htmlFor='country'>Country</label>
                <input 
                    type='text' 
                    name='country' 
                    value={editedForm.senderAddress.country}
                    onChange={e => handleInputChange('senderAddress-country', e.target.value)} 
                />
            </div>
        </div>
    );
};

export const BillTo = ({editedForm, handleInputChange}) => {


    return (
        <div className='Bill-To-Wrapper'>
            <h4 className='billing-header' id='bill-to'>Bill To</h4>
            <div className='Name-Container form-container'>
                <label htmlFor='clientName'>Client's Name</label>
                <input 
                    type='text' 
                    name='clientName' 
                    value={editedForm.clientName}
                    onChange={e => handleInputChange('clientName', e.target.value)}
                />
            </div>
            <div className='Email-Container form-container'>
                <label htmlFor='clientEmail'>Client's Email</label>
                <input 
                    type='text' 
                    name='clientEmail' 
                    value={editedForm.clientEmail}
                    onChange={e => handleInputChange('clientEmail', e.target.value)} 
                />
            </div>
            <div className='Street-Address-Container form-container'>
                <label htmlFor='street'>Street Address</label>
                <input 
                    type='text' 
                    name='street' 
                    value={editedForm.clientAddress.street}
                    onChange={e => handleInputChange('clientAddress-street', e.target.value)}
                />
            </div>
            <div className='City-Postcode-Wrapper'>
                <div className='City-Container form-container'>
                    <label htmlFor='city'>City</label>
                    <input 
                        type='text' 
                        name='city' 
                        value={editedForm.clientAddress.city}
                        onChange={e => handleInputChange('clientAddress-city', e.target.value)} 
                    />
                </div>
                <div className='Postcode-Container form-container'>
                    <label htmlFor='postCode'>Post Code</label>
                    <input type='text' 
                    name='postCode' 
                    value={editedForm.clientAddress.postCode}
                    onChange={e => handleInputChange('clientAddress-postCode', e.target.value)} 
                />
                </div>
            </div>
            <div className='Country-Container form-container'>
                <label htmlFor='country'>Country</label>
                <input 
                    type='text' 
                    name='country' 
                    value={editedForm.clientAddress.country} 
                    onChange={e => handleInputChange('clientAddress-country', e.target.value)}
                />
            </div>
            <div className='invoice-date-container form-container'>
                <label htmlFor='invoice-date' id='invoice-date-label'>Invoice Date</label>
                <input 
                    type='text' 
                    name='invoice-date'
                    value={editedForm.paymentDue}
                    onChange={e => handleInputChange('paymentDue', e.target.value)}
                />
            </div>
            <div className='payment-terms-container form-container'>
                <label htmlFor='payment-terms' id='payment-terms-label'>Payment Terms</label>
                <select
                    name='payment-terms'
                    value={editedForm.paymentTerms}
                    onChange={e => handleInputChange('paymentTerms', e.target.value)} 
                >
                    <option value='1'>Net 1 Day</option>
                    <option value='7'>Net 7 Days</option>
                    <option value='14'>Net 14 Days</option>
                    <option value='30'>Net 30 Days</option>
                </select>
            </div> 
            <div className='project-description-container form-container'>
                <label htmlFor='project-description' id='project-description-label'>Project Description</label>
                <input 
                    type='text' 
                    name='project-description' 
                    value={editedForm.description} 
                    onChange={e => handleInputChange('description', e.target.value)}
                />
            </div>
        </div>
    )
};

const ItemList = ({form, handleFormInputChange}) => {
    return (
        <div className='ItemList-Wrapper'>
            <h3 id='item-list'>Item List</h3>

            <div className='Items-ItemList'>
                {form.items.map((item, index) => {
                    return (
                        <NewItem 
                            index={index}
                            handleFormInputChange={handleFormInputChange}
                            itemInputs={item} 
                        />
                    )
                })}
            </div>
        </div>
    );
};

export const NewItem = ({index, handleFormInputChange, itemInputs}) => {
    return (
        <div className='Item-Wrapper'>
            <div className='Input-Wrapper'>
                <label htmlFor='item-name' id='item-name-label'>Item Name</label>
                <input 
                    type='text' 
                    name='item-name' 
                    value={itemInputs.name}
                    onChange={e => handleFormInputChange(index, 'name', e.target.value)} 
                />
            </div>
            <div className='Qty-Container item-container'>
                <label htmlFor='qty'>Qty</label>
                <input 
                    type='number' 
                    name='qty' 
                    value={itemInputs.quantity}
                    onChange={e => handleFormInputChange(index, 'quantity', e.target.value)}
                />
            </div>
            <div className='Price-Container item-container'>
                <label htmlFor='price'>Price</label>
                <input 
                    type='number' 
                    name='price' 
                    value={itemInputs.price}
                    onChange={e => handleFormInputChange(index, 'price', e.target.value)} 
                />
            </div>
            <div className='Total-Container item-container'>
                <label htmlFor='total'>Total</label>
                <p id='total-price'>{itemInputs.total}</p>
            </div>
            <button className='Button-Delete'><img src={deleteImg} alt=''/></button>
        </div>
    )
};




export default EditFormContainer;
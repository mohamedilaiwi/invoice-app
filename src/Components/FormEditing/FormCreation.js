import { useState, useEffect } from 'react';
import backArrow from '../../images/assets/icon-arrow-left.svg';
import arrowPlus from '../../images/assets/icon-plus.svg';
import {BillFrom, BillTo, NewItem} from './FormEditing';
import { NewInvoiceFooter } from '../InvoiceDetails/InvoiceDetails';
import { CreateNewInvoices, StoreNewInvoice } from '../InvoiceDetails/NewInvoices';
import { useNavigate } from 'react-router-dom';

const NewFormContainer = ({handleInputChange, handleNewItem, handleFormInputChange, editedForm, newItems, updateInvoiceData}) => {
    const [returnToMain, setReturnToMain] = useState(false);
    const [isReturnClicked, setIsReturnClicked] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = () => {
        CreateNewInvoices(newItems, editedForm, "Pending");
        StoreNewInvoice(editedForm);

        updateInvoiceData();
        setReturnToMain(true);

        setTimeout(() => {
            navigate('/');
        }, 1000);
    };  


    const handleReturnClick = () => {
        setIsReturnClicked(true);
        

        setTimeout(() => {
            navigate(-1);
        }, 1000)
    };

    return (
        <div className={`${returnToMain || isReturnClicked ? 'return-page-shifted' : ''}`}>
            <div className={`New-Form-Wrapper`}>
                <NewForm handleInputChange={handleInputChange} editedForm={editedForm}   newItems={newItems}  handleNewItem={handleNewItem} handleFormInputChange={handleFormInputChange} handleReturnClick={handleReturnClick} />
            </div>
            <NewInvoiceFooter handleSubmit={handleSubmit} />
        </div>
    );
};

const NewForm = ({handleInputChange, editedForm, newItems, handleNewItem, handleFormInputChange, handleReturnClick}) => {

    return (
        <div className='New-Form-Wrapper'>
            <div 
                className={`return-page-wrapper`}
                onClick={handleReturnClick}
            >
                <img src={backArrow} alt=''/>
                Go back
            </div>
            <div className='New-Form'>
                <h2>New Invoice</h2>
                <form>
                    <BillFrom editedForm={editedForm} handleInputChange={handleInputChange}/>
                    <BillTo editedForm={editedForm} handleInputChange={handleInputChange}/>
                    <NewBill newItems={newItems}  handleNewItem={handleNewItem} handleFormInputChange={handleFormInputChange} />
                </form>
            </div>
        </div>
    )
};


const NewBill = ({ newItems, handleFormInputChange, handleNewItem }) => {
    return (
        <div className='ItemList-Wrapper'>
            <h3 id='item-list'>Item List</h3>
            {newItems.map((item, index) => (
                <NewItemContainer
                    key={index}
                    index={index}
                    itemInputs={item}
                    handleFormInputChange={handleFormInputChange}
                />
            ))}
            <div className='Add-NewItem-Wrapper' onClick={handleNewItem}>
                <img src={arrowPlus} alt='' />
                Add New Items
            </div>
        </div>
    );
};

const NewItemContainer = ({ index, itemInputs, handleFormInputChange }) => {
    return (
        <NewItem
            index={index}
            itemInputs={itemInputs}
            handleFormInputChange={handleFormInputChange}
        />
    );
};


export default NewFormContainer;
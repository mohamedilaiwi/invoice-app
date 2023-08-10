import { useState, useEffect } from 'react';
import backArrow from '../../images/assets/icon-arrow-left.svg';
import arrowPlus from '../../images/assets/icon-plus.svg';
import {BillFrom, BillTo, NewItem} from './FormEditing';
import { NewInvoiceFooter } from '../InvoiceDetails/InvoiceDetails';
import { CreateNewInvoices, StoreNewInvoice } from '../InvoiceDetails/NewInvoices';

const NewFormContainer = () => {
    const [form, setForm] = useState({
        'id': '',
        'createdAt': '',
        'paymentDue': '',
        'description': '',
        'paymentTerms': null,
        'clientName': '',
        'clientEmail': '',
        'status': '',
        'senderAddress': {
            'street': '',
            'city': '',
            'postCode': '',
            'country': '',
        },
        'clientAddress': {
            'street': '',
            'city': '',
            'postCode': '',
            'country': ''
        },
        'items': [],
    });
    const [editedForm, setEditedForm] = useState(form);
    const [newItems, setNewItems] = useState([]);
    const [itemInputs, setItemInputs] = useState({name: '', qty: '', price: '', total: ''});

    const handleFormInputChange = (field, value) => {
        setItemInputs(prevInputs => ({
            ...prevInputs,
            [field]: value
        }));
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

    const handleSubmit = (e) => {
        CreateNewInvoices(newItems, editedForm, "Pending");
        StoreNewInvoice(editedForm);
    };

    return (
        <>
            <div className='New-Form-Wrapper'>
                <NewForm form={form} handleInputChange={handleInputChange} editedForm={editedForm} handleFormInputChange={handleFormInputChange} itemInputs={itemInputs} newItems={newItems} setNewItems={setNewItems}/>
            </div>
            <NewInvoiceFooter handleSubmit={handleSubmit} />
        </>
    );
};

const NewForm = ({form, handleInputChange, editedForm, handleFormInputChange, itemInputs, newItems, setNewItems}) => {

    return (
        <div className='New-Form-Wrapper'>
            <div className={`return-page-wrapper`}>
                <img src={backArrow} alt=''/>
                Go back
            </div>
            <div className='New-Form'>
                <h2>New Invoice</h2>
                <form>
                    <BillFrom editedForm={editedForm} handleInputChange={handleInputChange}/>
                    <BillTo editedForm={editedForm} handleInputChange={handleInputChange}/>
                    <NewBill items={form.items} handleFormInputChange={handleFormInputChange} itemInputs={itemInputs}  newItems={newItems} setNewItems={setNewItems}/>
                </form>
            </div>
        </div>
    )
};


const NewBill = ({ items, newItems, setNewItems }) => {


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
            return updatedItems;
        });
    };

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
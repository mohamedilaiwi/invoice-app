import { useState, useEffect } from 'react';
import backArrow from '../../images/assets/icon-arrow-left.svg';
import arrowPlus from '../../images/assets/icon-plus.svg';
import {BillFrom, BillTo, NewItem} from './FormEditing';
import { NewInvoiceFooter } from '../InvoiceDetails/InvoiceDetails';

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

    const handleSaveSend = () => {
        console.log('New form:', form);
    }

    return (
        <>
            <div className='New-Form-Wrapper'>
                <NewForm form={form} />
            </div>
            <NewInvoiceFooter handleSaveSend={handleSaveSend} />
        </>
    );
};

const NewForm = ({form}) => {
    const [editedForm, setEditedForm] = useState(form);

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

    const formSubmission = () => {
        editedForm.status = 'paid';
        editedForm.id = 'RT3080';
        localStorage.setItem(editedForm.id, JSON.stringify(editedForm));
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            // Check if any required fields are empty
            const requiredFields = ['clientName', 'clientEmail', 'street', 'city', 'postCode', 'country'];
            const anyEmpty = requiredFields.some(field => !editedForm[field]);

            if (anyEmpty) {
                console.log('Field is empty!');
            } else {
                formSubmission();
            }
        }
    };

    useEffect(() => {
        document.addEventListener('keypress', handleKeyPress);

        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, []);

    return (
        <div className='New-Form-Wrapper'>
            <div className={`return-page-wrapper`}>
                <img src={backArrow} alt=''/>
                Go back
            </div>
            <div className='New-Form'>
                <h2>New Invoice</h2>
                <form>
                    <BillFrom form={form} editedForm={editedForm} setEditedForm={setEditedForm} handleInputChange={handleInputChange}/>
                    <BillTo form={form}  editedForm={editedForm} setEditedForm={setEditedForm} handleInputChange={handleInputChange}/>
                    <NewBill items={form.items} />
                </form>
            </div>
        </div>
    )
};


const NewBill = ({items}) => {
    const [newItems, setNewItems] = useState([]);

    const handleNewItem = () => {
        setNewItems((prevItems) => [...prevItems, {}]);
        console.log(newItems);
    };

    return (
        <div className='ItemList-Wrapper'>
            <h3 id='item-list'>Item List</h3>
            {newItems.map((item, index) => (
                <NewItem key={index} item={item} />
            ))}
            <div className='Add-NewItem-Wrapper' onClick={handleNewItem}>
                <img src={arrowPlus} alt='' />
                Add New Items
            </div>
        </div>
    )
};


const CreateJSONInvoice = ({form}) => {

}


export default NewFormContainer;
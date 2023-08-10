import './InvoiceDetails.css';
import '../MainContent/MainContent.css';

import { useLocation, useNavigate } from "react-router-dom";

import dataJSON from '../../TEMP_DATA/data.json';
import backArrow from '../../images/assets/icon-arrow-left.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getID } from '../../utilities/utils';


const InvoiceDetails = ({formData, selectedInvoice, setSelectedInvoice}) => {
    const location = useLocation();
    const invoiceId = location.pathname.split('/invoice/')[1];
    const navigate = useNavigate();
    const [isReturnClicked, setIsReturnClicked] = useState(false);

    setSelectedInvoice(getID(formData, invoiceId));



    const handleReturnClick = () => {
        setIsReturnClicked(true);

        setTimeout(() => {
            navigate('/');
        }, 1000)
    };



    return (
        <>
            <div className={`InvoiceDetail-Wrapper ${isReturnClicked ? 'return-page-shifted' : ''}`}>
                {selectedInvoice ? 
                        <>
                            <div className='DisplayContents-Invoice'>
                                <DisplaySpecificInvoice item={selectedInvoice} handleReturnClick={handleReturnClick} />
                                <DisplayFullContents item={selectedInvoice} />
                            </div>
                        </>
                    :
                    <span>Loading...</span>
                }

            </div>
            {selectedInvoice ? <SelectInvoiceFooter invoiceId={selectedInvoice.id} /> : <span>Loading...</span>}
        </>
    )
};


const DisplaySpecificInvoice = ({item, handleReturnClick, handleDisplayFooter}) => {
    return (
        <>
            <div
                className={`return-page-wrapper`}
                onClick={handleReturnClick}
            >
                <img src={backArrow} alt=''/>
                Go back
            </div>
            <div className='InvoiceItem-subpage-status-wrapper'>
                Status
                <div className='InvoiceItem-Status-Wrapper' id={`status-wrapper-${item.status}`}>
                    <div className='status-Circle' id={`status-circle-${item.status}`}></div>
                    <div className='status-text' id={`status-text-${item.status}`}>{item.status}</div>
                </div>
            </div>
        </>
    );
}

const DisplayFullContents = ({item}) => {
    return (
        <section className='InvoiceItemBody-Wrapper'>
            <div className='InvoiceItemBody-Title'>
                <h1 className='InvoiceItem-ID header-subheading'>
                    <span>#</span>
                    {item.id}
                </h1>
                <span className='generic-font'>{item.description}</span>
            </div>
            <div className='InvoiceItemBody-Address'>
                <span className='generic-font' id='street'>{item.senderAddress.street}</span>
                <span className='generic-font' id='city'>{item.senderAddress.city}</span>
                <span className='generic-font' id='postCode'>{item.senderAddress.postCode}</span>
                <span className='generic-font' id='country'>{item.senderAddress.country}</span>
            </div>
            <div className='InvoiceItemBody-Dates-Wrapper'>
                <div className="InvoiceItemBody-InvoiceDate">
                    <span className='invoice-container-header generic-font'>Invoice Date</span>
                    <p>{formatDate(item.createdAt)}</p>
                </div>
                <div className='InvoiceItemBody-PaymentDate'>
                    <span className='invoice-container-header generic-font'>Payment Due</span>
                    <p>{formatDate(item.paymentDue)}</p>
                </div>
            </div>
            <div className='InvoiceItemBody-Billing-Wrapper'>
                <span className='invoice-container-header generic-font'>Bill To</span>
                <div className='InvoiceItemBody-BillTo'>
                    <p className='BillTo-User'>{item.clientName}</p>
                    <span className='generic-font'>{item.clientAddress.street}</span>
                    <span className='generic-font'>{item.clientAddress.city}</span>
                    <span className='generic-font'>{item.clientAddress.postCode}</span>
                    <span className='generic-font'>{item.clientAddress.country}</span>
                </div>
            </div>
            <div className='InvoiceItemBody-Email-Wrapper'>
                <span className='generic-font'>Sent to</span>
                <p>{item.clientEmail}</p>
            </div>
            <div className='Grand-Total-Wrapper'>
                <div className='DisplayItems-Wrapper'>
                    <DisplayItems item={item}/>
                </div>
                <div className='Items-GrandTotal'>
                    <p>Grand Total</p>
                    <span>$ {item.total}</span>
                </div>
            </div>
        </section>
    )
};


const DisplayItems = ({item}) => {
    return (
        <>
            {item.items.map((data, index) => {
                return (
                    <div className='DisplayItem' key={index}>
                        <p id='display-item-name'>{data.name}</p>
                        <span className='generic-font' id='display-item-totalPrice'>
                            $ {data.total}
                        </span>
                        <span className='generic-font' id='display-item-prices'>
                            {data.quantity} x $ {data.price}
                        </span>
                    </div>
                )
            })}
        </>
    )
};



const SelectInvoiceFooter = ({invoiceId}) => {
    return (
        <div className='Invoice-Options-Wrapper'>
            <Link to={`/invoice/edit/${invoiceId}`}>
                <button id='edit'>
                        Edit
                </button>
            </Link>
            <button id='delete'>Delete</button>
            <button id='paid'>Mark as Paid</button>
        </div>
    )    
};

export const EditInvoiceFooter = () => {
    return (
        <div className='Invoice-Options-Wrapper edit-footer-wrapper'>
            <button id='cancel'> Cancel </button>
            <button id='save-changes'> Save Changes </button>
        </div>
    )
}

export const NewInvoiceFooter = ({handleSubmit}) => {
    return (
        <form className='Invoice-Options-Wrapper' onClick={handleSubmit}>
            <button id='discard'>
                Discard
            </button>
            <button id='save-draft'>
                Save as Draft
            </button>
            <button type='submit' id='save-send'>
                Save & Send
            </button>
        </form>
    )
}




export function convertToTwoDecimalPoints(number) {
    if (!number) return null;
    if (Number.isInteger(number) || number.toFixed(2) === number.toString()) {
        return number.toFixed(2);
    } else {
        return number;
    }
}

export function formatDate(inputDate) {
    if (!inputDate) return '';
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const dateObject = new Date(inputDate);
    const day = dateObject.getDate();
    const month = months[dateObject.getMonth()];
    const year = dateObject.getFullYear();
  
    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
  }


export default InvoiceDetails;




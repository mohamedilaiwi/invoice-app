import './MainContent.css';
import dropDownArrow from '../../images/assets/icon-arrow-down.svg';
import iconPlus from '../../images/assets/icon-plus.svg';
import missingData from '../../images/assets/illustration-empty.svg';
import rightArrow from '../../images/assets/icon-arrow-right.svg';
import { formatDate } from '../InvoiceDetails/InvoiceDetails';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const MainContent = ({data}) => {
    return (
        <>
            {data ? 
                <main className='main-content-wrapper'>
                  <div className='Style-Wrapper'>
                    <Header amountInvoices={data.length} />
                    <InvoicesList data={data} />
                  </div>
                </main>
                : <div>Loading...</div>}
        </>
    )
}


const Header = ({amountInvoices}) => {
    return (
        <>
            <div className='Header-content-wrapper'>
                <div className='Header-text-wrapper'>
                    <h1 className='header-text'>Invoices</h1>
                    <p className='header-subheading total-invoices'>{amountInvoices === 0 ? 'No' : amountInvoices} invoices</p>
                </div>
                <div className='Dropdown_Wrapper'>
                    <button id='dropdown-filter-header' aria-controls='dropdown-filter-options'
                    className='dropdown-header'>
                        <span className='Filter-text'>
                            Filter 
                            <span> by status</span>    
                        </span>
                        <img src={dropDownArrow} alt=''/>
                    </button>
                </div>
                <div className='Buttons-New-Wrapper'>
                    <Link 
                        to='/invoice/new'
                    >
                        <span className='Buttons-Icon-Wrapper'>
                            <img src={iconPlus} alt=''/>
                        </span>
                        New 
                        <span className='btn-invoice-addition'> Invoice
                        </span>
                    </Link>
                </div>
            </div>
        </>
    )
}

const InvoicesList = ({data}) => {
    return (
        <div className='Invoice-Items-Wrapper'>
            {data.length === 0 ? 
                <DisplayMissingData /> :
                (data.map((item) => {
                    return <InvoiceItem row={item} />
                }))
            }
        </div>
    );
}

const InvoiceItem = ({ row }) => {
    const [shouldDisplayPaymentDue, setShouldDisplayPaymentDue] = useState(
        window.innerWidth >= 768
      );
    
      useEffect(() => {
        const handleResize = () => {
          setShouldDisplayPaymentDue(window.innerWidth >= 768);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
  
    return (
      <Link className={`InvoiceItem`} to={`/invoice/${row.id}`}>
        <h2 className='InvoiceItem-ID header-subheading'>
          <span>#</span>
          {row.id}
        </h2>
        {shouldDisplayPaymentDue && (
          <div className='InvoiceItem-PaymentDue'>
            Due {formatDate(row.paymentDue)}
          </div>
        )}
        <div className='InvoiceItem-ClientName'>{row.clientName}</div>
        <div className='InvoiceItem-Total'>
          <p>${row.total}</p>
        </div>
        <div
          className='InvoiceItem-Status-Wrapper'
          id={`status-wrapper-${row.status}`}
        >
          <div className='status-Circle' id={`status-circle-${row.status}`}></div>
          <div className='status-text' id={`status-text-${row.status}`}>
            {row.status}
          </div>
        </div>
        {shouldDisplayPaymentDue && (
            <div className='right-arrow'>
                <img src={rightArrow} alt=''/>
            </div>
        )}
      </Link>
    );
  };

const DisplayMissingData = () => {
    return (
        <div className='missing-information-wrapper'>
            <img src={missingData} alt='' />
            <div className='missing-text-wrapper'>
                <h2>There is nothing here</h2>
                <p>Create an invoice by clicking the New button and get started</p>
            </div>
        </div>
    );
}


export default MainContent;
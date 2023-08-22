function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function generateRandomID(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

function calcTotal (newItems) {
    let total = 0;
    
    newItems.forEach((item) => {
        total += item.total;
    })

    return total;
};

function getID(formData, invoiceId) {
    const item = formData.find(item => item.id === invoiceId);
    return item;
}


function cleanForm() {
    return {
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
    }
}


module.exports = {formatDate, generateRandomID, calcTotal, cleanForm, getID}
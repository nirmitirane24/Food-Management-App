// Invoice.js
import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import { useParams } from 'react-router-dom'; // If you're using React Router for navigation
import './Invoice.css';

const Invoice = () => {
  const { date } = useParams(); // Assuming you pass the date as a URL parameter
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    // Fetch invoice data based on the date
    const fetchInvoiceData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/invoice/${date}`);
        if (response.ok) {
          const data = await response.json();
          setInvoiceData(data);
        } else {
          console.error('Failed to fetch invoice data');
        }
      } catch (error) {
        console.error('Error fetching invoice data:', error);
      }
    };

    fetchInvoiceData();
  }, [date]);

  const downloadInvoice = () => {
    // Convert invoiceData to PDF format and download
    // This is just a placeholder, you'd need to implement PDF generation logic
    const invoiceContent = generatePDF(invoiceData);
    const blob = new Blob([invoiceContent], { type: 'application/pdf' });
    saveAs(blob, `invoice_${date}.pdf`);
  };

  if (!invoiceData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="invoice-container">
      <h1>Invoice - {date}</h1>
      <div className="customer-info">
        <p><strong>Name:</strong> {invoiceData.customer.name}</p>
        <p><strong>Email:</strong> {invoiceData.customer.email}</p>
      </div>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Size</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.orders.map((order, index) => (
            <tr key={index}>
              <td>{order.item}</td>
              <td>{order.quantity}</td>
              <td>{order.size}</td>
              <td>${order.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-amount">
        <p><strong>Total Amount:</strong> ${invoiceData.totalAmount}</p>
      </div>
      <button onClick={downloadInvoice}>Download Invoice</button>
    </div>
  );
};

export default Invoice;

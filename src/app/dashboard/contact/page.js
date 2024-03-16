'use client'
import React, { useState, useEffect } from 'react';
import style from './style.module.css';
import Header from '@/components/Header/Header';
import AdminSidebar from '@/components/Sidebar/AdminSidebar';

export default function Page() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    // Fetch contacts from the API
    const fetchContacts = async () => {
      try {
        const response = await fetch('/api/contact');
        const data = await response.json();
        setContacts(data.Contacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const openModal = (contact) => {
    setSelectedContact(contact);
  };

  const closeModal = () => {
    setSelectedContact(null);
  };

  return (
    <div>
      <Header />
      <div className={style.container}>
        <AdminSidebar />
        <div className={style.content}>
          <h1>All Messages</h1>
          <table className={style.table}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Help Topic</th>
                <th>Reason</th>
                <th>Description</th>
                <th>Screenshot</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact._id}>
                  <td>{contact.email}</td>

                  <td>{contact.heplTopic}</td>
                  <td>{contact.reson}</td>
                  <td>{contact.description}</td>
                  <td>{contact.screenShot}</td>
                  <td>
                    <button style={{ padding: "8px 17px" }} onClick={() => openModal(contact)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedContact && (
            <div className={style.modal}>
              <div className={style.modalContent}>
                <span className={style.close} onClick={closeModal}>&times;</span>
                <h2>Message Details</h2>
                <p><strong>Help Topic:</strong> {selectedContact.heplTopic}</p>
                <p><strong>Reason:</strong> {selectedContact.reson}</p>
                <p><strong>Description:</strong> {selectedContact.description}</p>
                <img src={selectedContact.screenShot} alt="Screenshot" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import {
  Content,
  ModalWrapper,
  TextInput,
  Accordion,
  AccordionItem,
} from 'carbon-components-react';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: '',
    lastName: '',
    mobile: '',
    landline: '',
    email: '',
  });

  const handleSaveNewContact = (e) => {
    const { id, value } = e.target;
    const contact = newContact;

    contact[id] = value;

    setNewContact({
      ...contact,
    });
  };

  const handleSubmit = () => {
    if (
      !Object.entries(newContact).length ||
      !newContact.name ||
      !newContact.lastName
    ) {
      return false;
    }

    setContacts([...contacts, newContact]);
    setNewContact({
      name: '',
      lastName: '',
      mobile: '',
      landline: '',
      email: '',
    });

    return true;
  };

  const renderAccordionItem = (contact, index) => {
    const { name, lastName, email, mobile, landline } = contact;
    const absence = 'Not registered for this contact';

    return (
      <AccordionItem title={`${name} ${lastName}`} key={index}>
        <div>
          <p>{`E-mail: ${email || absence}`}</p>
          <p>{`Mobile: ${mobile || absence}`}</p>
          <p>{`Landline: ${landline || absence}`}</p>
        </div>
      </AccordionItem>
    );
  };

  return (
    <div className="App">
      <Content>
        <h1 className="contacts__title">Contacts</h1>
        <Accordion align="end">
          {contacts.length > 0 && contacts.map(renderAccordionItem)}
        </Accordion>
        <ModalWrapper
          buttonTriggerText="Add new contact"
          shouldCloseAfterSubmit
          handleSubmit={handleSubmit}
          buttonTriggerClassName="contacts__button"
        >
          <TextInput
            id="name"
            labelText="Name"
            value={newContact.name}
            onChange={handleSaveNewContact}
            invalid={!newContact.name}
            invalidText="This field is required"
          />
          <TextInput
            id="lastName"
            labelText="Last Name"
            value={newContact.lastName}
            onChange={handleSaveNewContact}
            invalid={!newContact.lastName}
            invalidText="This field is required"
          />
          <TextInput
            id="email"
            labelText="Email"
            type="email"
            value={newContact.email}
            onChange={handleSaveNewContact}
          />
          <TextInput
            id="mobile"
            labelText="Mobile number"
            type="tel"
            value={newContact.mobile}
            onChange={handleSaveNewContact}
          />
          <TextInput
            id="landline"
            labelText="Home number"
            type="tel"
            value={newContact.landline}
            onChange={handleSaveNewContact}
          />
        </ModalWrapper>
      </Content>
    </div>
  );
}

export default App;

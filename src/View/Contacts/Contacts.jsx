import ContactsList from './ContactsList'
import './contacts.scss'

const Contacts = () => {
  return (
    <div className='container-fluid p-0 contactsContainer'>
      <ContactsList />
    </div>
  )
}

export default Contacts
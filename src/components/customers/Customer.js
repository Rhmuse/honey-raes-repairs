import { Link } from 'react-router-dom';

export const Customer = ({ customerData }) => {
    const customer = customerData;
    return (
        <section>
            <Link to={`/customers/${customer.userId}`}>{customer?.user?.fullName}</Link>
            <p>Email: {customer?.user?.email}</p>
            <p>Address: {customer.address}</p>
            <p>Phone number: {customer.phoneNumber}</p>
        </section>
    )
}


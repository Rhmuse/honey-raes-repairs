/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

export const CustomerDetails = () => {
    const params = useParams();
    const [customer, setCustomer] = useState();

    useEffect(() => {
        fetch(`http://localhost:8088/customers?_expand=user&userId=${params.customerId}`)
            .then(res => res.json())
            .then((data) => {
                setCustomer(data[0])
            })
    }, [])
    return (
        <section>
            <p>{customer?.user?.fullName}</p>
            <p>Email: {customer?.user?.email}</p>
            <p>Address: {customer.address}</p>
            <p>Phone number: {customer.phoneNumber}</p>
        </section>
    )
}
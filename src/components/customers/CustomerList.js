import { useEffect, useState } from 'react';
import { Customer } from './Customer';

export const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8088/customers?_expand=user')
            .then(res => res.json())
            .then(customers => {
                setCustomers(customers);
            })
    }, [])


    return (
        <article>
            {
                customers.map(c => {
                    return (
                        <Customer customerData={{ ...c }} key={`customer-${c.id}`} />
                    )
                })
            }
        </article>
    )
}
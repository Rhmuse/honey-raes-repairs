import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';

export const EmployeeDetails = () => {
    const { employeeId } = useParams()
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
            .then(res => res.json())
            .then((data) => {
                const singleEmployee = data[0]
                setEmployee(singleEmployee);
            })
    }, [employeeId])

    return (
        <section>
            <header>{employee?.user?.fullName}</header>
            <div>Email: {employee?.user?.email}</div>
            <div>Specialty: {employee.specialty}</div>
            <div>Rate: ${employee.rate}</div>
            <footer>Currently Working On: {employee?.employeeTickets?.length}</footer>
        </section>
    )
}
import { useEffect, useState } from 'react'
import { Employee } from './Employee'
export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        fetch('http://localhost:8088/users?isStaff=true')
            .then(res => res.json())
            .then((employeeArray) => {
                setEmployees(employeeArray);
            })
    }, [])
    return (
        <article className='employees'>
            {
                employees.map(employee => {
                    return <Employee
                        fullName={employee.fullName}
                        id={employee.id}
                        email={employee.email}
                        key={`employee--${employee.id}`}
                    />
                })
            }
        </ article>
    )
}

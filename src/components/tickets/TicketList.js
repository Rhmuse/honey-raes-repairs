/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useNavigate, Link } from 'react-router-dom';
import "./Tickets.css"

export const TicketList = ({ searchTerm }) => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFilteredTickets] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser);

    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets`)
                .then(response => response.json())
                .then((ticketArray) => {
                    setTickets(ticketArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFilteredTickets(emergencyTickets)
            } else {
                setFilteredTickets(tickets)
            }
        },
        [emergency, tickets]
    )


    useEffect(
        () => {
            if (honeyUserObject.staff) {
                setFilteredTickets(tickets);
            } else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFilteredTickets(myTickets);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [tickets]
    )

    useEffect(
        () => {
            if (openOnly) {
                const openTicketArray = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ''
                })
                setFilteredTickets(openTicketArray)
            } else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFilteredTickets(myTickets);
            }

        },
        [openOnly, tickets]
    )

    useEffect(() => {
        if (tickets.length > 0) {
            setFilteredTickets(tickets.filter(ticket => ticket.description.includes(searchTerm)))
        }

    }, [searchTerm])

    return <>
        {
            honeyUserObject.staff
                ? <>
                    <button
                        onClick={
                            () => {
                                setEmergency(true)
                            }
                        }
                    >Emergency Only</button>
                    <button
                        onClick={
                            () => {
                                setEmergency(false)
                            }
                        }
                    >Show All</button>
                </>
                : <>
                    <button onClick={() => navigate("/ticket/create")}
                    >Create Ticket</button>
                    <button onClick={() => updateOpenOnly(true)}
                    >Open Tickets</button>
                    <button onClick={() => updateOpenOnly(false)}
                    >All Tickets</button>
                </>


        }

        <h2>List of Tickets</h2>

        <article className='tickets'>
            {
                filteredTickets.map(
                    (ticket) => {
                        return <section className='ticket' key={"ticket" + ticket.id}>
                            <Link to={`/tickets/${ticket.id}/edit`}>Ticket {ticket.id}</Link>
                            <header>{ticket.description}</header>
                            <footer>Emergency: {ticket.emergency ? "Yes" : "No"}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}
import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'

export const TicketEdit = () => {
    // TODO: This state object should not be blank
    const [ticket, assignTicket] = useState({
        id: 0,
        userId: 0,
        description: '',
        emergency: false,
        dateCompleted: ''
    })

    // TODO: What is the variable in which you stored the route parameter?
    const { ticketId } = useParams()
    const navigate = useNavigate();

    // TODO: Get the ticket state from the API.
    useEffect(() => {
        fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
            .then(res => res.json())
            .then(data => {
                assignTicket(data)
            })
    }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })
            .then(res => res.json())
            .then((data) => {
                assignTicket(data)
                navigate("/tickets")
            })
    }


    return <form className="ticketForm">
        <h2 className="ticketForm__title">Service Ticket</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    value={ticket.description}
                    onChange={
                        (evt) => {
                            assignTicket({
                                ...ticket,
                                description: evt.target.value
                            })
                        }
                    }>{ticket.description}</textarea>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Emergency:</label>
                <input type="checkbox"
                    onChange={
                        (evt) => {
                            assignTicket({
                                ...ticket,
                                emergency: evt.target.checked
                            })
                        }
                    } />
            </div>
        </fieldset>
        <button
            onClick={(e) => handleSaveButtonClick(e)}
            className="btn btn-primary">
            Save Edits
        </button>
    </form>
}
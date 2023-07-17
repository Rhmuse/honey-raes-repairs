import { TicketList } from "./TicketList"
import { TicketSearchBar } from "./TicketSearchBar"
import { useState } from 'react'

export const TicketContainer = () => {
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <>
            <TicketSearchBar setSearchTerm={setSearchTerm} />
            <TicketList searchTerm={searchTerm} />
        </>
    )
}
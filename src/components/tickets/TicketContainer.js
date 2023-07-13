import { TicketList } from "./TicketList"
import { TicketSearchBar } from "./TicketSearchBar"

export const TicketContainer = () => {
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <>
            <TicketSearchBar setSearchTerm={setSearchTerm}/>
            <TicketList searchTerm={searchTerm}/>
        </>
    )
}
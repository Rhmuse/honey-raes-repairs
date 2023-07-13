export const TicketSearchBar = ({ setSearchTerm }) => {
    return (
        <div>
            <input 
                type="text"
                placeholder="Enter search term..."
                onChange={(e) => {
                    setSearchTerm(e.target.value); 
                }}
            />
        </div>
    )
}
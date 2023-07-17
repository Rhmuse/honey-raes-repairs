import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';

export const EmployeeForm = () => {
    // TODO: Provide initial state for profile
    const [profile, setProfile] = useState({
        specialty: '',
        rate: 0,
        userId: 0
    })
    const [feedback, setFeedback] = useState("")


    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser);

    const navigate = useNavigate();

    // TODO: Get employee profile info from API and update state
    useEffect(() => {
        fetch(`http://localhost:8088/employees?userId=${honeyUserObject.id}`)
            .then(res => res.json())
            .then((data) => {
                const employeeObj = data[0];
                setProfile(employeeObj);
            })
    }, [])

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */

        fetch(`http://localhost:8088/employees/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/profile")
            })
            .then(() => {
                setFeedback("Employee profile successfully saved")
            })
    }

    return (
        <>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            <form className="profile">
                <h2 className="profile__title">Your Profile</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="specialty">Specialty:</label>
                        <input
                            required autoFocus
                            id='specialty'
                            type="text"
                            className="form-control"
                            value={profile.specialty}
                            onChange={
                                (evt) => {
                                    // TODO: Update specialty property
                                    setProfile({
                                        ...profile,
                                        specialty: evt.target.value
                                    })
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Hourly rate:</label>
                        <input type="number"
                            id='name'
                            className="form-control"
                            value={profile.rate}
                            onChange={
                                (evt) => {
                                    // TODO: Update rate property
                                    setProfile({
                                        ...profile,
                                        rate: parseFloat(evt.target.value)
                                    })
                                }
                            } />
                    </div>
                </fieldset>
                <button
                    onClick={(e) => handleSaveButtonClick(e)}
                    className="btn btn-primary">
                    Save Profile
                </button>
            </form>
        </>
    )
}
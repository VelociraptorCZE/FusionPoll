/**
 * Fusion Poll
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

import { MiniComponentJsx } from "minicomponent";
import { DATE_SPECIFICATION, EMAIL_SEND_ERROR, ANSWERS_HAVE_BEEN_SENT } from "../containerIds";

export default function dateList() {
    const { days, selectedDays, name } = this.state;
    let dataWasSent;

    const getDayInfoFromDayNumber = dayNumber => {
        const selectedDay = selectedDays[dayNumber];
        const timeInformation = selectedDay
            ? `${selectedDay.earliest || "N/A"} - ${selectedDay.latest || "N/A"}`
            : "Can't make it.";

        return (
            <>
                <strong>{days[dayNumber]}</strong>: {timeInformation}
            </>
        );
    };

    const getDayNotesFromDayNumber = dayNumber => {
        const { notes } = selectedDays[dayNumber] || {};

        if (notes) {
            return <div className={"mt-3"}>{notes}</div>;
        }
    };

    const editDayCallback = dayNumber => () => {
        this.setState({
            currentContainer: DATE_SPECIFICATION,
            currentDay: dayNumber
        });
    };

    const sendEmail = async () => {
        if (dataWasSent) return;

        dataWasSent = true;
        const body = new FormData;
        body.append("days", JSON.stringify(selectedDays.filter(day => !!day)));
        body.append("name", name);

        try {
            const emailResponse = await fetch("backend/API/send-mail.php", { method: "POST", body });
            const { result } = await emailResponse.json();
            if (!result) throw new Error(EMAIL_SEND_ERROR);
            this.setState({ currentContainer: ANSWERS_HAVE_BEEN_SENT });
        } catch {
            this.setState({ currentContainer: EMAIL_SEND_ERROR });
        }
    };

    return (
        <div style={"edit-row-container"}>
            <h2 className={"header"}>{"Your answers"}</h2>

            {days.map((day, dayNumber) => (
                <div className="edit-row my-3">
                    <span>{getDayInfoFromDayNumber(dayNumber)}</span>
                    <div className="edit-row__edit-button" onClick={editDayCallback(dayNumber)}>Edit</div>
                    {getDayNotesFromDayNumber(dayNumber)}
                </div>
            ))}

            <div className={"position-fixed bottom-0 right-0 bg-white shadow-sm w-100 text-center"}>
                <button onClick={sendEmail} className={"btn-primary"}>
                    Submit answers
                </button>
            </div>
        </div>
    );
}
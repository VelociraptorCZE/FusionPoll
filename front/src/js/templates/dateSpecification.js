/**
 * Fusion Poll
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

import { MiniComponentJsx } from "minicomponent";
import { DATE_SELECTION, DATE_LIST } from "../containerIds";

export default function dateSpecification () {
    const { days, currentDay, selectedDays, allDaysWereSubmitted } = this.state;
    const selectedDay = days[currentDay];
    const { earliest = "", latest = "", notes = "" } = selectedDays[currentDay] || {};

    const getDayInformation = () => {
        const form = document.getElementById("date-information");
        return Object.fromEntries([...new FormData(form)]);
    };

    const setNextDay = () => {
        this.setState({
            currentDay: currentDay + 1,
            currentContainer: allDaysWereSubmitted ? DATE_LIST : DATE_SELECTION
        });
    };

    const cantMakeItCallback = () => {
        this.state.selectedDays[currentDay] = void 0;
        setNextDay();
    };

    const submitCallback = () => {
        const dayInformation = getDayInformation();
        this.state.selectedDays[currentDay] = { selectedDay, ...dayInformation };
        setNextDay();
    };

    return (
        <div>
            <h2 className={"header"}>{selectedDay}</h2>

            <form id={"date-information"} className={"text-center"}>
                <div className={"mt-2"}>{"The earliest you could be at Evropska 88:"}</div>
                <br />
                <input type={"text"} placeholder={"Earliest"} name={"earliest"} className={"text-input"} value={earliest} />

                <br />
                <div className={"mt-5"}>{"The latest you could end the rehearsal:"}</div>
                <br />
                <input type={"text"} placeholder={"Latest"} name={"latest"} className={"text-input"} value={latest} />

                <br />
                <textarea name={"notes"}
                          rows={"5"}
                          cols={"30"}
                          placeholder={"Your notes..."}
                          className={"generic-textarea mt-5 text-input"}
                >{notes}</textarea>
            </form>
            <div className={"text-center"}>
                <button className={"btn-primary mx-2"} onClick={submitCallback}>Next</button>
                <button className={"btn-primary mx-2"} onClick={cantMakeItCallback}>I can't make it after all</button>
            </div>
        </div>
    );
}
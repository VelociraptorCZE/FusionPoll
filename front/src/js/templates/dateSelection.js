/**
 * Fusion Poll
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

import { MiniComponentJsx } from "minicomponent";
import { DATE_SPECIFICATION, DATE_LIST } from "../containerIds";

export default function dateSelection () {
    const { days, currentDay, allDaysWereSubmitted } = this.state;
    const selectedDay = days[currentDay];

    const dayDoesntWorkCallback = () => {
        this.setState({ currentDay: currentDay + 1 });
    };

    const dayWorksCallback = () => {
        this.setState({ currentContainer: DATE_SPECIFICATION });
    };

    setTimeout(() => {
        if (!selectedDay && !allDaysWereSubmitted) {
            this.setState({
                currentContainer: DATE_LIST,
                allDaysWereSubmitted: true
            });
        }
    }, 10);

    return (
        selectedDay ? <div>
            <h2 className={"header"}>{`Does ${selectedDay} work for you?`}</h2>

            <div className={"text-center"}>
                <button className={"btn-primary mx-2"} onClick={dayWorksCallback}>Yes</button>
                <button className={"btn-primary mx-2"} onClick={dayDoesntWorkCallback}>No</button>
            </div>
        </div> : <span />
    );
}
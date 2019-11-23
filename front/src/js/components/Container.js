/**
 * Fusion Poll
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

import MiniComponent, { MiniComponentJsx } from "minicomponent";
import {
    NAME_INPUT,
    DATE_SELECTION,
    DATE_SPECIFICATION,
    FETCH_DAYS_ERROR,
    DATE_LIST,
    ANSWERS_HAVE_BEEN_SENT
} from "../containerIds";

import nameInput from "../templates/nameInput";
import dateSelection from "../templates/dateSelection";
import dateSpecification from "../templates/dateSpecification";
import dateList from "../templates/dateList";
import answersHaveBeenSent from "../templates/answersHaveBeenSent";

export default class extends MiniComponent {
    constructor () {
        super(document.body, {
            name: "",
            isNameValid: true,
            currentDay: 0,
            allDaysWereSubmitted: false,
            days: [],
            selectedDays: [],
            currentContainer: NAME_INPUT,
            containers: {}
        });
    }

    onMount () {
        this.setState({
            containers: {
                [NAME_INPUT]: nameInput.bind(this),
                [DATE_SELECTION]: dateSelection.bind(this),
                [DATE_SPECIFICATION]: dateSpecification.bind(this),
                [DATE_LIST]: dateList.bind(this),
                [ANSWERS_HAVE_BEEN_SENT]: answersHaveBeenSent.bind(this)
            }
        });

        this.fetchAllDays();
    }

    async fetchAllDays () {
        try {
            const daysResponse = await fetch("public/days.json");
            this.setState({ days: await daysResponse.json() });
        } catch {
            this.setState({ currentContainer: FETCH_DAYS_ERROR });
        }
    }

    getErrorContainer (currentContainer) {
        return (
            <div className={"text-center"}>
                <h2 className={"error-text"}>{"Something went wrong :/"}</h2>
                <strong className={"error-text"}>{currentContainer}</strong>
            </div>
        )
    }

    render ({ currentContainer, containers }) {
        const container = containers[currentContainer];
        return typeof container === "function" ? container() : this.getErrorContainer(currentContainer);
    }
}
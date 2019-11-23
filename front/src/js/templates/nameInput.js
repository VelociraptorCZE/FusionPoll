/**
 * Fusion Poll
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

import { MiniComponentJsx } from "minicomponent";
import { DATE_SELECTION } from "../containerIds";

export default function nameInput () {

    const INPUT_ERROR = "error";

    const getUsernameInput = () => document.getElementById("username");

    const getName = () => getUsernameInput()?.value || "";

    const isNameValid = () => /\w+/.test(getName());

    const enterNameCallback = () => {
        this.setState({ isNameValid: isNameValid(), name: getName() });

        if (isNameValid()) {
            this.setState({ currentContainer: DATE_SELECTION });
        }
    };

    const nameValidationCallback = () => {
        const usernameInput = getUsernameInput();

        if (isNameValid()) {
            return usernameInput.classList.remove(INPUT_ERROR);
        }

        usernameInput.classList.add(INPUT_ERROR);
    };

    return (
        <div className={"name-container"}>
            <h1 className={"header"}>{"Let's get started"}</h1>
            <input type={"text"}
                   id={"username"}
                   placeholder={"Your name"}
                   className={`text-input ${!this.state.isNameValid ? INPUT_ERROR : ""}`}
                   onKeyUp={nameValidationCallback}
                   value={this.state.name}
            />
            <button className={"btn-primary"} onClick={enterNameCallback}>Next</button>

            {this.state.isNameValid ? "" :
                <>
                    <br />
                    <small className={"error-text"}>{"Please enter your name."}</small>
                </>
            }
        </div>
    );
}
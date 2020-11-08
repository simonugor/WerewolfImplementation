import React from "react"
import ReactDOM from "react-dom"
import OkPopup from "./../OkPopup"

import { render, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

afterEach(cleanup)
it("redners without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<OkPopup></OkPopup>, div)
})

it("renders popup correctly", () => {
    const {getByTestId} = render(<OkPopup text="Testing Popup"></OkPopup>)
    expect(getByTestId("popup")).toHaveTextContent("Testing Popup")
})

it("renders popup correctly2", () => {
    const {getByTestId} = render(<OkPopup text="Passing different prop"></OkPopup>)
    expect(getByTestId("popup")).toHaveTextContent("Passing different prop")
})
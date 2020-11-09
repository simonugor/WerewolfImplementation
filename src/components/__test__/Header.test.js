import React from "react"
import ReactDOM from "react-dom"
import Header from "./../Header"

import { cleanup } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

afterEach(cleanup)
it("redners without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<Header></Header>, div)
})
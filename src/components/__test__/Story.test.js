import React from "react"
import ReactDOM from "react-dom"
import Story from "./../Story"

import { render, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

afterEach(cleanup)

it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<Story></Story>, div)
})

it("renders text correctly", () => {
    const {getByTestId} = render(<Story storyText="Testing text"></Story>)
    expect(getByTestId("story")).toHaveTextContent("Testing text")    
})

it("renders secondary text correctly", () => {
    const {getByTestId} = render(<Story secondaryText="Testing secondary text"></Story>)
    expect(getByTestId("story")).toHaveTextContent("Testing secondary text")
})
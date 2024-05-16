import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import Setting from "./Pages/Setting/Setting";
import { JSX } from "react/jsx-runtime";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

jest.mock("axios");

describe("Main App Routing", () => {
  const route = "/finance";
  test("Should change current route when clicked", () => {
    render(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId("location-display")).toHaveTextContent(route);
  });
});

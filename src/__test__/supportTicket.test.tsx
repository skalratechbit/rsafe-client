import React from "react";
import { render, screen } from "@testing-library/react";
import SupportTickets from "../Pages/Manage/SupportTickets";
import { Provider } from "react-redux";
import Store from "../Redux/Store";
import userEvent from "@testing-library/user-event";
import RequestSupport from "../Component/HeaderModal/RequestSupport";

test("renders without crashing", () => {
  render(
    <Provider store={Store}>
      <SupportTickets />
    </Provider>
  );
});

describe("SupportTickets Component", () => {
  test("renders Attachments div", () => {
    render(
      <Provider store={Store}>
        <SupportTickets />
      </Provider>
    );

    const attachmentsDiv = screen.getByTestId("attachments-div");

    expect(attachmentsDiv).toBeInTheDocument();
  });
});

describe("SupportTickets Component comments", () => {
  test("renders Attachments div", () => {
    render(
      <Provider store={Store}>
        <SupportTickets />
      </Provider>
    );

    const attachmentsDiv = screen.getByTestId("comment-div");

    expect(attachmentsDiv).toBeInTheDocument();
  });
});

describe("SupportTickets Component added comments", () => {
  test("renders Attachments div", () => {
    render(
      <Provider store={Store}>
        <SupportTickets />
      </Provider>
    );

    const attachmentsDiv = screen.getByTestId("addedcomments-div");

    expect(attachmentsDiv).toBeInTheDocument();
  });
});

describe("SupportTickets Component description", () => {
  test("renders Attachments div", () => {
    render(
      <Provider store={Store}>
        <SupportTickets />
      </Provider>
    );

    const attachmentsDiv = screen.getByTestId("description-div");

    expect(attachmentsDiv).toBeInTheDocument();
  });
});

describe("SupportTickets Component sidebar", () => {
  test("renders Attachments div", () => {
    render(
      <Provider store={Store}>
        <SupportTickets />
      </Provider>
    );

    const attachmentsDiv = screen.getByTestId("sidebar-div");

    expect(attachmentsDiv).toBeInTheDocument();
  });
});

test("Add a comment input field exists", () => {
  render(
    <Provider store={Store}>
      <SupportTickets />
    </Provider>
  );

  const addCommentInput = screen.getByPlaceholderText("Add a comment...");
  expect(addCommentInput).toBeInTheDocument();
});

test("renders title input in RequestSupport component", () => {
  render(
    <Provider store={Store}>
      <RequestSupport />
    </Provider>
  );

  const titleInput = screen.getByPlaceholderText("Enter Title");

  expect(titleInput).toBeInTheDocument();

  userEvent.type(titleInput, "Test Title");

  expect(titleInput).toHaveValue("Test Title");
});

describe("RequestSupport Component", () => {
  it("should render the status dropdown", () => {
    render(
      <Provider store={Store}>
        <RequestSupport />
      </Provider>
    );

    const statusDropdown = screen.getByPlaceholderText("Select Status");

    expect(statusDropdown).toBeInTheDocument();
  });
});

describe("RequestSupport component", () => {
  test("renders radio buttons", () => {
    render(
      <Provider store={Store}>
        <RequestSupport />
      </Provider>
    );

    const serviceRadioButton = screen.getByLabelText("Service");
    const disputeResolutionRadioButton =
      screen.getByLabelText("Dispute Resolution");

    expect(serviceRadioButton).toBeInTheDocument();
    expect(disputeResolutionRadioButton).toBeInTheDocument();
  });
});

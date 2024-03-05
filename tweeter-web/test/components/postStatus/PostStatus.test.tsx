import PostStatus from "../../../src/components/postStatus/PostStatus";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import React from "react";
import useUserInfo from "../../../src/components/userInfo/UserInfoHook";
import { anything, instance, mock, verify } from "ts-mockito";
import { AuthToken, User } from "tweeter-shared";
import { PostStatusPresenter } from "../../../src/presenter/PostStatusPresenter";

jest.mock("../../../src/components/userInfo/UserInfoHook", () => ({
  ...jest.requireActual("../../../src/components/userInfo/UserInfoHook"),
  __esModule: true,
  default: jest.fn(),
})); 

describe("PostStatus Component", () => {

  const mockUser = mock<User>();
  const mockAuthtoken = mock<AuthToken>();
  const mockUserInstance = instance(mockUser);
  const mockAuthTokenInstance = instance(mockAuthtoken);
    
  beforeAll(() => {
    (useUserInfo as jest.Mock).mockReturnValue({
      currentUser: mockUserInstance,
      authToken: mockAuthTokenInstance,
    }); 
  });

  it("starts with post and clear buttons disabled", () => {

    const { postStatusButton, clearButton } = renderPostAndGetElements();
    expect(postStatusButton).toBeDisabled();
    expect(clearButton).toBeDisabled();
  });

  it("enables the post and clear buttons if post field has text", async () => {
    const { postStatusButton, clearButton, postField, user } = renderPostAndGetElements();
  
    await user.type(postField, "a");
    expect(postStatusButton).toBeEnabled();
    expect(clearButton).toBeEnabled();
  });

  it("disables each button when the text field is cleared", async () =>{
    const { postStatusButton, clearButton, postField, user } = renderPostAndGetElements();

    await user.type(postField, "a");
    expect(postStatusButton).toBeEnabled();
    expect(clearButton).toBeEnabled();

    await user.clear(postField);
    expect(postStatusButton).toBeDisabled();
    expect(clearButton).toBeDisabled();
  });

  it("calls the presenter's submitPost method with correct parameters when the Post Status button is pressed", async () =>{
    const mockPresenter = mock<PostStatusPresenter>();
    const mockPresenterInstance = instance(mockPresenter);

    const { postStatusButton, clearButton, postField, user } = renderPostAndGetElements(mockPresenterInstance);

    await user.type(postField, "a");
    await user.click(postStatusButton);

    verify(mockPresenter.submitPost(anything(), "a", mockUserInstance, mockAuthTokenInstance)).once();
  });
});


const renderPostStatus = (presenter?: PostStatusPresenter) => {
  return render(<PostStatus presenter={presenter}/>);
};

const renderPostAndGetElements = (presenter?: PostStatusPresenter) => {
  const user = userEvent.setup();

  renderPostStatus(presenter);

  const postStatusButton = screen.getByRole("button", { name: /Post Status/i });
  const clearButton = screen.getByRole("button", { name: /Clear/i });
  const postField = screen.getByLabelText("postField");

  return { postStatusButton, clearButton, postField, user };
};



import { MemoryRouter } from "react-router-dom";
import Login from "../../../../src/components/authentication/login/Login";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React, { MutableRefObject } from "react";
import { LoginPresenter, LoginView } from "../../../../src/presenter/LoginPresenter";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { instance, mock, verify } from "ts-mockito";

library.add(fab);


describe("Login Component", () => {

  it("starts with sign-in button disabled", () => {
    const { signInButton } = renderLoginAndGetElements("/");
    expect(signInButton).toBeDisabled();
  });

  it("enables the sign-in button if both alias and password fields have text", async () => {
    const { signInButton, aliasField, passwordField, user } = renderLoginAndGetElements("/");

    await user.type(aliasField, "a");
    await user.type(passwordField, "b");

    expect(signInButton).toBeEnabled();
  });

  it("disables the sign-in button if either field is cleared", async () => {

    const { signInButton, aliasField, passwordField, user } = renderLoginAndGetElements("/");

    //Fill field
    await user.type(aliasField, "a");
    await user.type(passwordField, "b");
    expect(signInButton).toBeEnabled();

    //Clear password
    await user.clear(passwordField);
    expect(signInButton).toBeDisabled();

    //Reset fields
    await user.type(passwordField, "b");
    expect(signInButton).toBeEnabled();

    //clear alias
    await user.clear(aliasField);
    expect(signInButton).toBeDisabled();
  });

  it("calls the presenters login method with the correct parameters when the sign-in button is pressed", async () => {
    const mockPresenter = mock<LoginPresenter>();
    const mockPresenterInstance = instance(mockPresenter);
    const originalUrl = "http://someurl.com";
    const alias = "@somealias";
    const password = "myPassword";
    const rememberMe: MutableRefObject<boolean> = { current: false };
    const { signInButton, aliasField, passwordField, user } = 
      renderLoginAndGetElements(originalUrl, mockPresenterInstance);

    await user.type(aliasField, alias);
    await user.type(passwordField, password);

    await user.click(signInButton);

    verify(mockPresenter.doLogin(alias, password, rememberMe, originalUrl))
  });
});

const renderLogin = (originalUrl: string, presenter?: LoginPresenter) => {
  return render(
    <MemoryRouter>
      {
        !!presenter ? (<Login originalUrl={originalUrl} presenterGenerator={(view: LoginView) => new LoginPresenter(view)} presenter={presenter}/>
                      ) : (
                      <Login originalUrl={originalUrl} presenterGenerator={(view: LoginView) => new LoginPresenter(view)}/>
        )}
    </MemoryRouter>
    );
};

const renderLoginAndGetElements = (originalUrl: string, presenter?: LoginPresenter) =>{
  const user = userEvent.setup();

  renderLogin(originalUrl);

  const signInButton = screen.getByRole("button", { name: /Sign in/i });
  const aliasField = screen.getByLabelText("alias");
  const passwordField = screen.getByLabelText("password");

  return { signInButton, aliasField, passwordField, user };
}
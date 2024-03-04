import { AuthToken } from "tweeter-shared";
import { AppNavbarView, AppNavbarPresenter } from "../../src/presenter/AppNavbarPresenter";
import { anything, capture, instance, mock, spy, verify, when} from "ts-mockito";
import { UserService } from "../../src/model/service/UserService";

describe("AppNavbarPresenter", () => {

  let mockAppNavbarView: AppNavbarView;
  let appNavbarPresenter: AppNavbarPresenter;
  let mockUserService: UserService;

  const authtoken = new AuthToken("abc123", Date.now());

  beforeEach(() => {
    mockAppNavbarView = mock<AppNavbarView>();
    const mockAppNavbarViewInstance = instance(mockAppNavbarView);

    const appNavbarPresenterSpy = spy(new AppNavbarPresenter(mockAppNavbarViewInstance));
    appNavbarPresenter = instance(appNavbarPresenterSpy);

    mockUserService = mock<UserService>();
    const mockUserServiceInstance = instance(mockUserService);

    when(appNavbarPresenterSpy.service).thenReturn(mockUserServiceInstance);
  });

  it("tells the view to display a logging out message", async () => {

      await appNavbarPresenter.logout(authtoken);
      verify(mockAppNavbarView.displayInfoMessage("Logging Out...", 0)).once();
  });

  it("calls logOut on the user service with the correct authtoken", async () =>{

    await appNavbarPresenter.logout(authtoken);
    verify(mockUserService.logout(authtoken)).once();
  });

  it("tells the view to clear the last info message and clear the user info", async () => {

    await appNavbarPresenter.logout(authtoken);
    verify(mockAppNavbarView.clearLastInfoMessage()).once();
    verify(mockAppNavbarView.clearUserInfo()).once();
    verify(mockAppNavbarView.displayErrorMessage(anything())).never();

  });

  it("displays an error message and does not clear the last info message and clear the user info when logout fails", async () =>{

    const error = new Error("An error occurred");
    when(mockUserService.logout(authtoken)).thenThrow(error);

    await appNavbarPresenter.logout(authtoken);
    verify(mockAppNavbarView.displayErrorMessage("Failed to log user out because of exception: An error occurred")).once();
    verify(mockAppNavbarView.clearLastInfoMessage()).never();
    verify(mockAppNavbarView.clearUserInfo()).never();
  });
});

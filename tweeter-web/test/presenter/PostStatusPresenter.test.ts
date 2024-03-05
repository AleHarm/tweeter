import { AuthToken, Status, User } from "tweeter-shared";
import { PostStatusView, PostStatusPresenter } from "../../src/presenter/PostStatusPresenter";
import { anything, capture, instance, mock, spy, verify, when } from "ts-mockito";
import { StatusService } from "../../src/model/service/StatusService";

describe("PostStatusPresenter", () => {
  let mockPostStatusView: PostStatusView;
  let postStatusPresenter: PostStatusPresenter;
  let mockStatusService: StatusService;
  let mouseEventMock: React.MouseEvent;
  let authtoken: AuthToken;


  const post = "This is a post";
  const user = new User("Bill", "Testman", "Me", "");

  beforeEach(() => {
    authtoken = new AuthToken("abc123", Date.now());

    mockPostStatusView = mock<PostStatusView>();
    const mockPostStatusViewInstance = instance(mockPostStatusView);

    const postStatusPresenterSpy = spy(new PostStatusPresenter(mockPostStatusViewInstance));
    postStatusPresenter = instance(postStatusPresenterSpy);

    mockStatusService = mock<StatusService>();
    const mockStatusServiceInstance = instance(mockStatusService);

    when(postStatusPresenterSpy.service).thenReturn(mockStatusServiceInstance);

    mouseEventMock = ({ preventDefault: jest.fn() } as unknown) as React.MouseEvent;
  });

  it("tells the view to display a submitting post message", async () => {
    await postStatusPresenter.submitPost(mouseEventMock, post, user, authtoken);
    verify(mockPostStatusView.displayInfoMessage("Posting status...", 0)).once();
  });

  it("calls postStatus on the post status service with the correct status string and auth token", async () => {
    await postStatusPresenter.submitPost(mouseEventMock, post, user, authtoken);
    const [capturedAuthToken, capturedStatus, ...rest]: [AuthToken, Status, ...unknown[]] = capture(mockStatusService.postStatus).first();
    verify(mockStatusService.postStatus(authtoken, capturedStatus)).once();
  });

  it("tells the view to clear the last info message, clear the post, and display a status posted message", async () =>{

    await postStatusPresenter.submitPost(mouseEventMock, post, user, authtoken);
    verify(mockPostStatusView.clearLastInfoMessage()).once();
    verify(mockPostStatusView.setPost("")).once();
    verify(mockPostStatusView.displayErrorMessage(anything())).never();
  });

  it("tells the view to display an error message and does not tell it to do the following: clear the last info message, " +
      "clear the post, and display a status posted message when fails to submit a post", async () =>{

    const error = new Error("An error occurred");
    when(mockStatusService.postStatus(authtoken, anything())).thenThrow(error);

    await postStatusPresenter.submitPost(mouseEventMock, post, user, authtoken);
    verify(mockPostStatusView.displayErrorMessage("Failed to post the status because of exception: An error occurred")).once();
    verify(mockPostStatusView.clearLastInfoMessage()).never();
    verify(mockPostStatusView.setPost("")).never();
  });
});

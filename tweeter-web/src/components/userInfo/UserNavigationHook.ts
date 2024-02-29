import useToaster from "../toaster/ToastHook";
import useUserInfo from "./UserInfoHook";
import { UserNavigationView, UserNavigationPresenter } from "../../presenter/UserNavigationPresenter";
import { useState } from "react";
import useToastListener from "../toaster/ToastListenerHook";


const useUserNavigation = (/*props: Props*/) => {
  const { updateUserInfo, setDisplayedUser, currentUser, authToken } =
    useUserInfo();

    const { displayErrorMessage, } =
    useToastListener();

  const listener: UserNavigationView = {
    displayErrorMessage: displayErrorMessage,
    setDisplayedUser: setDisplayedUser,
  }

  const [presenter] = useState(new UserNavigationPresenter(listener));

  const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();
    presenter.navigateToUser(authToken!, currentUser!, event.target.toString());
  };

  return navigateToUser;
};

export default useUserNavigation;

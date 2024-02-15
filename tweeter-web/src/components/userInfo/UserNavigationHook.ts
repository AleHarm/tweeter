import useToaster from "../toaster/ToastHook";
import useUserInfo from "./UserInfoHook";
import { UserNavigationView, UserNavigationPresenter } from "../../presenter/UserNavigationPresenter";
import { useState } from "react";

// interface Props {
//   // presenterGenerator: (view: UserNavigationView) => UserNavigationPresenter;
// }

const useUserNavigation = (/*props: Props*/) => {
  const { updateUserInfo, setDisplayedUser, currentUser, authToken } =
    useUserInfo();

  const { displayErrorToast } = useToaster(); // Destructure the necessary method

  
  

  const listener: UserNavigationView = {
    displayErrorToast: displayErrorToast,
    setDisplayedUser: setDisplayedUser,
  }

  const [presenter] = useState(new UserNavigationPresenter(listener));

  const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();
    presenter.navigateToUser(authToken!, currentUser!, event.target.toString());
  };

  // const getUser = async (
  //   authToken: AuthToken,
  //   alias: string
  // ): Promise<User | null> => {
  //   return FakeData.instance.findUserByAlias(alias);
  // };

  return navigateToUser;
};

export default useUserNavigation;

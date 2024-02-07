import { AuthToken, User, FakeData} from "tweeter-shared";
import useToaster from "../toaster/ToastHook";
import useUserInfo from "./UserInfoHook";


const useUserNavigation = () => {
  const { updateUserInfo, setDisplayedUser, currentUser, authToken } =
    useUserInfo();

  const { displayErrorToast } = useToaster(); // Destructure the necessary method

  const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();

    try {
      let alias = extractAlias(event.target.toString());
      let user = await getUser(authToken!, alias);

      if (!!user) {
        if (currentUser!.equals(user)) {
          setDisplayedUser(currentUser!);
        } else {
          setDisplayedUser(user);
        }
      }
    } catch (error) {
      displayErrorToast(`Failed to get user because of exception: ${error}`, 0);
    }
  };

  const extractAlias = (value: string): string => {
    let index = value.indexOf("@");
    return value.substring(index);
  };

  const getUser = async (
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> => {
    return FakeData.instance.findUserByAlias(alias);
  };

  return navigateToUser;
};

export default useUserNavigation;

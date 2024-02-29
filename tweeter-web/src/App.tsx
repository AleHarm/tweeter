import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./components/authentication/login/Login";
import Register from "./components/authentication/register/Register";
import MainLayout from "./components/mainLayout/MainLayout";
import Toaster from "./components/toaster/Toaster";
import useUserInfo from "./components/userInfo/UserInfoHook";
import { FollowingPresenter } from "./presenter/FollowingPresenter";
import { UserItemView } from "./presenter/UserItemPresenter";
import { FollowersPresenter } from "./presenter/FollowersPresenter";
import { FeedPresenter } from "./presenter/FeedPresenter";
import { StatusItemView } from "./presenter/StatusItemPresenter";
import { StoryPresenter } from "./presenter/StoryPresenter";
import { RegisterPresenter, RegisterView } from "./presenter/RegisterPresenter";
import { LoginView, LoginPresenter } from "./presenter/LoginPresenter";
import ItemScroller from "./components/mainLayout/ItemScroller";
import { Status, User } from "tweeter-shared";
import UserItem from "./components/userItem/UserItem";
import StatusItem from "./components/statusItem/StatusItem";


const App = () => {
  const { currentUser, authToken } = useUserInfo();

  const isAuthenticated = (): boolean => {
    return !!currentUser && !!authToken;
  };

  return (
    <div>
      <Toaster position="top-right" />
      <BrowserRouter>
        {isAuthenticated() ? (
          <AuthenticatedRoutes />
        ) : (
          <UnauthenticatedRoutes />
        )}
      </BrowserRouter>
    </div>
  );
};

const AuthenticatedRoutes = () => {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/feed" />} />
        <Route path="feed" element={<ItemScroller
        key={1}
        presenterGenerator={(view: StatusItemView) => new FeedPresenter(view)}
        itemGenerator={(item: Status) => <StatusItem item={item}/>} />} />
        <Route path="story" element={<ItemScroller
        key={2}
        presenterGenerator={(view: StatusItemView) => new StoryPresenter(view)}
        itemGenerator={(item: Status) => <StatusItem item={item}/>} />} />
        <Route path="following" element={<ItemScroller
        key={3}
        presenterGenerator={(view: UserItemView) => new FollowingPresenter(view)}
        itemGenerator={(item: User) => <UserItem item={item}/>} />} />
        <Route path="followers" element={<ItemScroller
        key={4}
        presenterGenerator={(view: UserItemView) => new FollowersPresenter(view)}
        itemGenerator={(item: User) => <UserItem item={item}/>} />} />
        <Route path="logout" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/feed" />} />
      </Route>
    </Routes>
  );
};

const UnauthenticatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/login" element={<Login presenterGenerator={(view: LoginView) => new LoginPresenter(view)}/>} />
      <Route path="/register" element={<Register presenterGenerator={(view: RegisterView) => new RegisterPresenter(view)}/>} />
      <Route path="*" element={<Login originalUrl={location.pathname} presenterGenerator={(view: LoginView) => new LoginPresenter(view)}/>} />
    </Routes>
  );
};

export default App;

import { useEffect, useMemo, useState } from "react";
import "./App.css";
import "./style.scss";
import "./modal.scss";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PublicRoute from "./Routes/Public.Route";
import ProtectedRoute from "./Routes/Private.Routes";
import Layout from "./Component/Layout/Layout";
import PublicLayout from "./Component/Layout/PublicLayout";
import Login from "./Pages/Login/Login";
import authSlice from "./Redux/Feature/Auth-slice";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getDesignTokens } from "./Theme";
import { CssBaseline } from "@mui/material";
import { updateTheme } from "./Redux/Feature/Theme-slice";
import MyAccount from "./Pages/MyAccount/MyAccount";
import Setting from "./Pages/Setting/Setting";
import { ModalContext } from "./Component/Context/RequestSupportContext";
import RequestSupportModal from "./Component/HeaderModal/RequestSupport";
import SupportTickets from "./Pages/Manage/SupportTickets";
import SignupAssociation from "./Pages/Signup/SignUp";
import AddBuilding from "./Pages/Directory/AddBuilding";
import NewUnitActivation from "./Pages/StatusRegistration/NewUnitActivation";
import BuildingDetail from "./Pages/Directory/BuildingDirectory";
import { LoadScript } from "@react-google-maps/api";
import Board from "./Pages/Manage/Board";
import UnAuthVerifyEmail from "./Pages/UnAuth/ForgotPassword/UnAuthVerifyEmail";
import UnAuthVerifyOTP from "./Pages/UnAuth/ForgotPassword/UnAuthVerifyOtp";
import UnAuthUpdatePass from "./Pages/UnAuth/ForgotPassword/UnAuthUpdatePass";
import Unsubscribe from "./Pages/Manage/Unsubscribe";
import SetActivationPassword from "./Pages/UnAuth/SetActivationPassword/SetActivationPassword";
import NoAssociation from "./Pages/NoAssociation/NoAssociation";
import Documents from "./Pages/Help/Documents";
import Ccrs from "./Pages/Governance/Ccrs";
import ByLaws from "./Pages/Governance/ByLaws";
import RulesAndRegulations from "./Pages/Governance/RulesAndRegulations";
import Chat from "./Pages/MyAccount/Chat";

const publicPage = [
  "/",
  "/login",
  "/un-auth-verify-email",
  "/un-auth-verify-otp",
  "/un-auth-update-pass",
  "/set-password",
];

const GoogleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_KEY as string;

function App() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { pathname } = useLocation();
  const [mode, setMode] = useState<string>("dark");
  const darkMode = useSelector((state: any) => state.Theme.darkMode);
  const [show, setShow] = useState({ hideDialog: false });

  const checkUserToken = async () => {
    const userToken = localStorage.getItem("user");
    if (userToken) {
      dispatch(authSlice.actions.updateUser());
    } else {
      localStorage.clear();
      return navigation("/login");
    }
  };
  useEffect(() => {
    const isPublicPage = publicPage.includes(pathname);
    if (!isPublicPage) {
      checkUserToken();
    }
    if (localStorage.getItem("zayukTheme")) {
      dispatch(updateTheme());
    } else {
      localStorage.setItem("zayukTheme", "dark");
    }
  });

  useMemo(() => {
    const body = document.body;
    if (darkMode === "dark") {
      setMode("dark");
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
    } else {
      setMode("light");
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
    }
  }, [darkMode]);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const authorizationToken = localStorage.getItem("safe-token");

  let personAssociation = localStorage.getItem("persontAssociation");
  let personAssociationLength = personAssociation
    ? JSON.parse(personAssociation).length
    : 0;
  if (
    personAssociationLength === 0 &&
    pathname !== "/no-association" &&
    !publicPage.includes(pathname) &&
    pathname !== "/activation" &&
    pathname !== "/setting"
  ) {
    return <Navigate to="/no-association" />;
  } else if (personAssociationLength > 0 && pathname === "/no-association") {
    return <Navigate to="/account" />;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ModalContext.Provider value={{ show, setShow }}>
          <LoadScript
            googleMapsApiKey={GoogleMapsApiKey}
            libraries={["places"]}
          >
            <Routes>
              <Route element={<PublicLayout />}>
                <Route element={<PublicRoute />}>
                  <Route path="/" element={<SignupAssociation />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/un-auth-verify-email"
                    element={<UnAuthVerifyEmail />}
                  />
                  <Route
                    path="/un-auth-verify-otp"
                    element={<UnAuthVerifyOTP />}
                  />
                  <Route
                    path="/un-auth-update-pass"
                    element={<UnAuthUpdatePass />}
                  />
                  <Route
                    path="/set-password"
                    element={<SetActivationPassword />}
                  />
                  <Route path="/unsubscribe" element={<Unsubscribe />} />
                </Route>
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                  {authorizationToken && authorizationToken.length ? (
                    <Route path="/activation" element={<NewUnitActivation />} />
                  ) : null}
                  <Route path="/">
                    <Route index path="account" element={<MyAccount />}></Route>
                    <Route index path="chat" element={<Chat />}></Route>
                  </Route>
                  <Route path="/no-association" element={<NoAssociation />} />
                  {/* <Route path="/finances">
                      <Route
                          index={false}
                          path="budgets"
                          element={<Budgets />}
                        />
                        <Route
                          index={true}
                          path="transactions"
                          element={<Transactions />}
                        />
                    </Route> */}
                  <Route path="/manage">
                    <Route
                      path=""
                      index={false}
                      element={<Navigate to="/manage/supporttickets" replace />}
                    />
                    <Route
                      index={false}
                      path="supporttickets"
                      element={<SupportTickets />}
                    />
                    <Route
                      index={false}
                      path="directory"
                      element={<BuildingDetail />}
                    />
                    <Route
                      index={false}
                      path="documents"
                      element={<Documents />}
                    />
                    <Route index={false} path="board" element={<Board />} />
                  </Route>
                  <Route path="/setting">
                    <Route index element={<Setting />}></Route>
                  </Route>
                  <Route path="/signup-association">
                    <Route index element={<SignupAssociation />}></Route>
                  </Route>
                  <Route path="/building" element={<AddBuilding />} />
                  <Route
                    path="/edit-building/:buildingId"
                    element={<AddBuilding />}
                  />
                  <Route path="/governance">
                    <Route index={false} path="ccrs" element={<Ccrs />} />
                    <Route index={false} path="bylaws" element={<ByLaws />} />
                    <Route
                      index={false}
                      path="rulesandregulations"
                      element={<RulesAndRegulations />}
                    />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </LoadScript>
          <RequestSupportModal />
        </ModalContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;

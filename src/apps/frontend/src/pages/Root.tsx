import { Outlet } from "react-router-dom";
import AppContainer from "../components/common/AppContainer";
import Input from "../components/common/Input";

export default function Root() {
  return (
    <AppContainer>
      <Input />
      <Outlet />
    </AppContainer>
  )
}


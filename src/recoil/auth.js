import { atom, useResetRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { PUBLIC_ROUTE } from "../routes/routes.constants";

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

export const refreshTokenState = atom({
  key: "refreshTokenState",
  default: "",
});

//로그아웃 함수
export const useLogout = () => {
  const history = useHistory();

  const resetAccessToken = useResetRecoilState(accessTokenState);
  const resetRefreshToken = useResetRecoilState(refreshTokenState);

  return () => {
    resetAccessToken();
    resetRefreshToken();
    localStorage.clear();
    history.push(PUBLIC_ROUTE.LANDING);
  };
};

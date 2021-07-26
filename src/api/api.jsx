import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { accessTokenState, refreshTokenState, useLogout } from "../recoil/auth";
const customAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const useAxios = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [refreshToken] = useRecoilState(refreshTokenState);
  const logout = useLogout();

  useEffect(() => {
    const interceptor = customAxios.interceptors.request.use((config) => {
      return {
        ...config,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
          ...config.headers,
        },
      };
    });
    return () => {
      customAxios.interceptors.request.eject(interceptor);
    };
  }, [accessToken]);

  useEffect(() => {
    const interceptor = customAxios.interceptors.response.use(
      (res) => res,
      async (err) => {
        if (err.response?.status !== 401) return Promise.reject(err);

        try {
          const res = await axios.post("/auth/refresh", { refreshToken });
          setAccessToken(res.data.access_token);
          localStorage.setItem("token", res.data.access_token);
          err.config.headers[
            "Authorization"
          ] = `Bearer ${res.data.access_token}`;
          return await axios(err.config);
        } catch (err) {
          if (err.response?.status === 401) {
            logout();
          }
          return Promise.reject(err);
        }
      }
    );
    return () => {
      customAxios.interceptors.response.eject(interceptor);
    };
  }, [refreshToken, logout, setAccessToken]);

  return customAxios;
};

export default useAxios;

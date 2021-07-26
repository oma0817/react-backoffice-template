import React from "react";
import { useHistory } from "react-router";
import { Button, Form, Input, message } from "antd";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { accessTokenState, refreshTokenState } from "../../recoil/auth";
import useAxios from "../../api/api";
import Background from "../../assets/login-background.png";

const Login = () => {
  const history = useHistory();

  const setAccessToken = useSetRecoilState(accessTokenState);
  const setRefreshToken = useSetRecoilState(refreshTokenState);
  const axios = useAxios();

  const handleFinish = async (values) => {
    try {
      const {
        data: { data, success, alert },
      } = await axios.post("/login", { type: 1, ...values });

      if (success) {
        setAccessToken(data?.token?.access_token);
        setRefreshToken(data?.token?.refresh_token);
        localStorage.setItem("token", data?.token?.access_token);

        history.push("/main");
        window.location.reload();
      } else {
        message.error(alert);
      }
    } catch ({
      response: {
        data: { message: errorMessage },
      },
    }) {
      message.error(errorMessage);
    }
  };

  return (
    <LoginContainer>
      <LoginAbsolute />
      <LoginBox>
        <StyledForm onFinish={handleFinish}>
          <StyledFormItem
            name="email"
            rules={[{ required: true, message: "이메일을 입력해주세요." }]}
          >
            <Input placeholder="이메일" size="large" />
          </StyledFormItem>
          <StyledFormItem
            name="password"
            rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
          >
            <Input.Password placeholder="비밀번호" size="large" />
          </StyledFormItem>
          <Button type="primary" htmlType="submit" style={{ height: 40 }}>
            로그인
          </Button>
        </StyledForm>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${Background}) no-repeat center/cover;
`;

//반투명 배경
const LoginAbsolute = styled.div`
  display: block;
  position: absolute;
  background-color: black;
  opacity: 0.7;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

const LoginBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 50px;
  box-sizing: border-box;
  z-index: 200;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;

  & button {
    background: #b37feb;
    border-color: #b37feb;
  }
`;

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 20px;
`;

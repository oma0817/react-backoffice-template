import styled from "styled-components";

export default styled.h1`
  font-size: 19px;
  font-weight: 500;
  width: 100%;
  margin-right: 17px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  white-space: nowrap;

  @media only screen and (max-width: 767px) {
    margin: 0 10px;
    margin-bottom: 30px;
  }
  &:before {
    content: "";
    width: 5px;
    height: 40px;
    background-color: #303030c2;
    display: flex;
    margin: ${(props) =>
      props["data-rtl"] === "rtl" ? "0 0 0 15px" : "0 15px 0 0"};
  }
  &:after {
    content: "";
    width: 100%;
    height: 1px;
    background-color: #30303047;
    display: flex;
    margin: ${(props) =>
      props["data-rtl"] === "rtl" ? "0 15px 0 0" : "0 0 0 15px"};
  }
`;

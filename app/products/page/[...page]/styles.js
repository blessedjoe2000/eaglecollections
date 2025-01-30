import { Button } from "@mui/material";
import { Box, styled } from "@mui/system";

export const SpinnerContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  gap: 1rem;
`;
export const CardContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;

  @media (max-width: 479px) {
    gap: 5px;
  }

  @media (max-width: 380px) {
    gap: 2px;
  }
`;

export const CardDetails = styled(Box)`
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;
  padding: 1rem;
  background-color: #01204e;
`;

export const ImageContainer = styled(Box)`
  width: 200px;

  @media (max-width: 479px) {
    width: 170px;
  }
  @media (max-width: 430px) {
    width: 150px;
  }
  @media (max-width: 380px) {
    width: 130px;
  }
  @media (max-width: 326px) {
    width: 200px;
  }
`;

export const PrevNextButton = styled(Button)`
  background-color: #01204e !important;
  background-image: none;
  padding: 0.5rem 3rem;
  color: #fff;
  border-radius: 5px;
  font-size: 1rem;

  @media (max-width: 479px) {
    padding: 1px 5px;
  }

  :hover {
    background-color: #01579b !important;
  }
`;

export const PrevNextDisabledButton = styled(Box)`
  background-color: #d1d5db !important;
  color: #ffffff !important;
  padding: 0.5rem 2rem;
  border-radius: 5px;
  cursor: not-allowed !important;

  @media (max-width: 479px) {
    padding: 1px 5px;
  }
`;

import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";

export const SliderContainer = styled(Box)`
  display: grid;
  grid-template-columns: 40% 60%;
  color: #fff;

  @media (max-width: 1080px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 1rem;
  }
`;

export const SliderTextContainer = styled(Box)`
  padding: 0 2rem;
`;
export const SliderTitle = styled(Box)`
  font-size: 2.5rem;
  font-weight: 700;

  @media (max-width: 1200px) {
    font-size: 2rem;
  }

  @media (max-width: 458px) {
    font-size: 1.5rem;
  }
`;

export const SliderBrief = styled(Typography)`
  font-size: 1.2rem;
  padding: 1rem 0;

  @media (max-width: 1200px) {
    padding: 0.5rem 0;
  }

  @media (max-width: 458px) {
    font-size: 1rem;
  }
`;

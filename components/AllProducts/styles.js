import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
export const CardContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
`;

export const CardDetails = styled(Box)`
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;
  padding: 1rem;
  background-color: #01204e;
`;

export const ImageContainer = styled(Box)`
  width: 200px;
`;

export const Title = styled(Typography)``;

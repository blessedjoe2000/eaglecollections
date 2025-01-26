import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";

export const SavedProducts = styled(Box)`
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  text-align: center;
`;

export const FavContainer = styled(Box)`
  display: flex;
  margin: 2rem 0;
  position: relative;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;
  padding: 1rem;
  background-color: #01204e;
  color: #fff;
`;
export const DescContainer = styled(Typography)`
  font-size: 1.2rem;
`;
export const PriceContainer = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 500;
  color: #f72585;
`;

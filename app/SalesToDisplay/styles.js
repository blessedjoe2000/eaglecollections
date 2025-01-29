import { Box, styled } from "@mui/system";

export const ImageContainer = styled(Box)`
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 1rem;
  width: 350px;

  @media (max-width: 400px) {
    width: 80vw;
  }
`;

export const SalesTitle = styled(Box)`
  font-size: 2.5rem;
  font-weight: 700;
  color: #01579b;
  text-align: center;
`;

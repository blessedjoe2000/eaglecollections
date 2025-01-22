import { Button } from "@mui/material";
import { styled } from "@mui/system";

export const MenuButton = styled(Button)`
  font-size: 1rem;
  font-weight: 700;
  padding: 0;
  position: relative;
  color: inherit;
  transition: all 0.3s ease-in-out;

  ::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #006bff;
    transition: width 0.3s ease-in-out;
  }

  :hover::after {
    width: 100%;
  }
`;

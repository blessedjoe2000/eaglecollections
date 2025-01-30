import { Box, styled } from "@mui/system";

export const ScrollContainer = styled(Box)`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  gap: 1rem;
  padding: 1px 0;
  white-space: nowrap;
  cursor: pointer;

  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #01579b;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #01204e;
  }
`;

export const PhotoWrapper = styled(Box)`
  flex: 0 0 auto;
  scroll-snap-align: start;
`;

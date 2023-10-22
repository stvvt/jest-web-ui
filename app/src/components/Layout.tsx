import AppBar from '@/components/Layout/AppBar';
import {
  Box,
  Container,
  Stack
} from "@mui/material";
import { FC, PropsWithChildren } from 'react';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack height="100%">
      <AppBar />
      <Box sx={{ mt: 2, flex: 1, overflow: 'auto', scrollbarGutter: 'stable' }}>
        <Container>
          {children}
        </Container>
      </Box>
    </Stack>    
  );
}

export default Layout;

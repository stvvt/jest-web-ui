import { useTestRun } from "@/context/TestRunContext";
import useTestStats from '@/hooks/useTestStats';
import {
  Box,
  LinearProgress,
  AppBar as MUIAppBar,
  Stack,
  Toolbar,
  Typography} from "@mui/material";
import { FC } from "react";

const AppBar: FC = () => {
  const {
    isRunning,
  } = useTestRun();
  const { percentages } = useTestStats();

  return (
    <MUIAppBar position="static">
      <Toolbar>
        <Stack direction="row" gap={3} alignItems="center" flex="1">
          <Typography
            variant="h4"
            sx={{ display: { xs: "none", sm: "inline" } }}
          >
            Monitor Tool
          </Typography>
          <Box flex={1}>
            {isRunning && (
              <Stack direction="row" alignItems="center" gap={1}>
                <Box flex="1">
                  <LinearProgress
                    variant="determinate"
                    value={percentages?.tests.completed}
                    color="success"
                  />
                </Box>
                <Typography variant="body2">{percentages?.tests.completed} %</Typography>
              </Stack>
            )}
          </Box>
        </Stack>
      </Toolbar>
    </MUIAppBar>
  );
};

export default AppBar;

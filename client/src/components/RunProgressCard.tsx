import TestProgressItem from "@/components/TestProgressItem";
import TestRunDetailsCard from '@/components/TestRunDetailsCard';
import { useTestRun } from "@/context/TestRunContext";
import useTestStats from '@/hooks/useTestStats';
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { LoadingButton } from '@mui/lab';
import { Box, Card, CardHeader, List, Stack, Typography, useTheme } from "@mui/material";
import { ComponentProps, FC } from "react";

type Props = ComponentProps<typeof Card>;

const RunProgressCard: FC<Props> = (cardProps) => {
  const { mainStatus, run } = useTestRun();
  const { counters, percentages } = useTestStats();
  const theme = useTheme();

  const mainTitle = () => {
    const status = mainStatus;

    switch (status) {
      case "preparing":
        return (
          <Typography variant="h5" color={theme.palette.grey[500]}>
            Preparing ...
          </Typography>
        );
      case "running":
        return (
          <Typography variant="h5" color={theme.palette.warning.main}>
            Running ...
          </Typography>
        );
      case "ready":
        return <Typography variant="h5">Ready</Typography>;
      case "finished":
        return <Typography variant="h5">Finished.</Typography>;
    }
  };

  return (
    <Card {...cardProps}>
      <CardHeader
        title={
          <Stack direction="row" gap={1} alignItems="center">
            <Box flex="1">{mainTitle()}</Box>
            <LoadingButton
              loading={mainStatus === 'running' || mainStatus === 'preparing'}
              loadingPosition="end"
              endIcon={<PlayArrowIcon />}
              color="success"
              variant="contained"
              onClick={run}
            >
              <Box
                display="inline"
                sx={{ display: { xs: "none", sm: "inline" } }}
              >
                Start
              </Box>
            </LoadingButton>
          </Stack>
        }
        subheader={
          <Box>
            {counters?.tests.total ? `${counters?.tests.total} test(s)` : undefined}
          </Box>
        }
      />
      <List disablePadding dense>
        <TestProgressItem
          title="Passed"
          currentValue={counters?.tests.passed}
          total={counters?.tests.total}
          color="success"
        />
        <TestProgressItem
          title="Skipped"
          currentValue={counters?.tests.skipped}
          total={counters?.tests.total}
          color="warning"
        />
        <TestProgressItem
          title="Failed"
          currentValue={counters?.tests.failed}
          total={counters?.tests.total}
          color="error"
        />
      </List>
      <TestRunDetailsCard />
    </Card>
  );
};

export default RunProgressCard;

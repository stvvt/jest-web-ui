import { NextPage } from "next";
import {
  Box,
  Divider,
  Stack,
} from "@mui/material";
import { useTestRun } from "@/context/TestRunContext";
import Layout from "@/components/Layout";
import RunProgressCard from '@/components/RunProgressCard';
import TestProjectCard from '@/components/TestProjectCard';

const Index: NextPage = () => {
  const {
    aggregatedResult,
    failedTestCases,
    mainStatus,
  } = useTestRun();
  const { openHandles, snapshot, testResults, ...aggregatedStats } =
    aggregatedResult ?? {};

  return (
    <Layout>
      <Stack direction="row" gap={2} alignItems="start">
        <Box sx={{ flex: 2 }}>
          <TestProjectCard />
          {mainStatus === "finished" && (
            <>
              {failedTestCases.length > 0 && <Divider sx={{ mb: 2 }} />}
              <pre>{JSON.stringify(aggregatedStats, null, 2)}</pre>
            </>
          )}
        </Box>
        <Stack gap={2} flex="1">
          <RunProgressCard />
        </Stack>
      </Stack>
    </Layout>
  );
};

export default Index;

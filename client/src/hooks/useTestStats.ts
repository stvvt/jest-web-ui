import { useTestRun } from '@/context/TestRunContext';

const useTestStats = () => {
  const { inspectResult, aggregatedResult, passedTestCases, failedTestCases, skippedTestCases } = useTestRun();

  const counterSource = aggregatedResult ?? inspectResult;

  const counters = counterSource 
    ? {
        tests: {
          total: inspectResult?.numTotalTests ?? counterSource.numTotalTests,
          passed: counterSource.numPassedTests,
          skipped: skippedTestCases?.length ?? 0,
          failed: counterSource.numFailedTests,
          pending: counterSource.numPendingTests,
        },
        suites: {
          total: inspectResult?.numTotalTestSuites ?? counterSource.numTotalTestSuites,
          passed: counterSource.numPassedTestSuites,
          failed: counterSource.numFailedTestSuites,
          pending: counterSource.numPendingTestSuites,
        }
      }
    : undefined;

  if (counters) {
    if (passedTestCases) {
      counters.tests.passed = passedTestCases.length;
    }
    if (failedTestCases) {
      counters.tests.failed = failedTestCases.length;
    }
  }

  const percentages = counters
    ? {
      tests: {
        completed: Math.round((counters.tests.failed + counters.tests.passed) / counters.tests.total * 100),
        passed: Math.round(counters.tests.passed / counters.tests.total * 100),
        skipped: Math.round(counters.tests.skipped / counters.tests.total * 100),
        failed: Math.round(counters.tests.failed / counters.tests.total * 100),
        pending: Math.round(counters.tests.pending / counters.tests.total * 100),
      },
      suites: {
        completed: Math.round((counters.suites.failed + counters.suites.passed) / counters.suites.total * 100),
        passed: Math.round(counters.suites.passed / counters.suites.total * 100),
        failed: Math.round(counters.suites.failed / counters.suites.total * 100),
        pending: Math.round(counters.suites.pending / counters.suites.total * 100),
      }
    }
    : undefined;

  return {
    counters,
    percentages,
  }
}

export default useTestStats;
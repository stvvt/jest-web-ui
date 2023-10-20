import useInspect from '@/hooks/useInspect';
import useListTests from '@/hooks/useLIstTests';
import { TestCaseResultEvent, TestCaseStartEvent, TestProgressEvent } from '@/types';
import { AggregatedResult, Test } from '@jest/reporters';
import { FormattedTestResults } from '@jest/test-result';
import { FC, PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

type MainStatusType = "running" | "preparing" | "finished" | "ready";
type TestResultStatusType = 'ready' | 'running' | 'passed' | 'skipped' | 'failed';

interface TestRunContext {
  run: () => void;
  messages: TestProgressEvent[];
  isRunning: boolean;
  lastMessage?: TestProgressEvent | undefined;
  aggregatedResult?: AggregatedResult | undefined;
  percentCompleted?: number | undefined;
  allTestCases: TestCase[];
  runningTestCases: TestCase[];
  finishedTestCases: FinishedTestCase[];
  passedTestCases: FinishedTestCase[];
  skippedTestCases: FinishedTestCase[];
  failedTestCases: FinishedTestCase[];
  allTestFiles?: string[] | undefined;
  numCompletedTestFiles: number;
  inspectResult?: FormattedTestResults;
  fetchInspect: () => void;
  inspectIsLoading: boolean;
  mainStatus: MainStatusType;
  testFileStatus: (file: string) => TestResultStatusType;
  testCaseStatus: (file: string, caseFullName: string) => TestResultStatusType;
  findTestCase: (file: string, caseFullName: string) => TestCase | undefined;
}

const TestRunContext = createContext<TestRunContext>({
  run() {},
  messages: [],
  isRunning: false,
  allTestCases: [],
  runningTestCases: [],
  finishedTestCases: [],
  passedTestCases: [],
  skippedTestCases: [],
  failedTestCases: [],
  numCompletedTestFiles: 0,
  fetchInspect() {},
  inspectIsLoading: false,
  mainStatus: 'ready',
  testFileStatus: () => 'ready',
  testCaseStatus: () => 'ready',
  findTestCase: () => { return undefined; },
});

export interface TestCase {
  test: Test,
  testCaseStartInfo: TestCaseStartEvent['testCaseStartInfo'],
  testCaseResult?: TestCaseResultEvent['testCaseResult'],
}

type FinishedTestCase = Required<TestCase>;

type FailedTestCase = FinishedTestCase & {
  testCaseResult: FinishedTestCase['testCaseResult'] & { status: 'failed' }
}

const TestRunContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [messages, setMessages] = useState<TestProgressEvent[]>([]);
  const [aggregatedResult, setAggregatedResult] = useState<AggregatedResult>();
  const [allTestCases, setAllTestCases] = useState<TestCase[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const processedMessages = useRef(0);
  const { allTestFiles } = useListTests();
  const [numCompletedTestFiles, setNumCompletedTestFiles] = useState(0);
  const { inspectResult, fetchInspect, isLoading: inspectIsLoading } = useInspect();

  const resetState = () => {
    processedMessages.current = 0;
    setNumCompletedTestFiles(0);
    setMessages([]);
    setAggregatedResult(undefined);
    setAllTestCases([]);
  };

  const run = () => {
    setIsRunning(true);
    resetState();
 
    const evtSource = new EventSource("/api/events");
    evtSource.onmessage = (event) => {
      const data: TestProgressEvent = JSON.parse(event.data);
  
      setMessages((msgs) => [...msgs, data]);

      if (data.event === 'onRunComplete') {
        evtSource.close();
        setIsRunning(false);
      }
    }

    fetch('/api/start');
  };

  const processMessage = useCallback((msg: TestProgressEvent) => {
    console.log(msg);
    if (msg.event === 'onTestCaseStart') {
      setAllTestCases((atc) => {
        return [
            ...atc, {
            test: msg.test,
            testCaseStartInfo: msg.testCaseStartInfo,
          }
        ]
      });
    } else if (msg.event === 'onTestCaseResult') {
      setAllTestCases((atc) => {
        const testCase = atc.find((tc) => (
          tc.testCaseStartInfo.fullName === msg.testCaseResult.fullName
          && tc.test.path === msg.test.path
          && tc.testCaseResult === undefined
        ));
        if (testCase) {
          testCase.testCaseResult = msg.testCaseResult;
          return [...atc];
        } else {
          console.log(msg);
          return atc;
        }
      });
    } else if (msg.event === 'onTestFileResult') {
      setAggregatedResult(msg.aggregatedResult);
      const skipped = msg.testResult.testResults.filter(assertionResult => assertionResult.status === 'pending');
      if (skipped.length > 0) {
        setAllTestCases((atc) => {
          for (const assertionResult of skipped) {
            atc.push({
              test: msg.test,
              testCaseStartInfo: {
                ...assertionResult,
                mode: 'skip'
              },
              testCaseResult: assertionResult,
            });
          }
  
          return [...atc];
        });
      }

      setNumCompletedTestFiles((c) => c + 1);
    } else if (msg.event === 'onRunComplete') {
      setAggregatedResult(msg.results);
    } else if (msg.event === 'onTestResult') {
      setAggregatedResult(msg.aggregatedResult)
    }
  }, []);

  useEffect(() => {
    const newTypes: string[] = [];
    for (let i = processedMessages.current; i < messages.length; i++) {
      processMessage(messages[i]);
      newTypes.push(messages[i].event);
    }
    processedMessages.current = messages.length;
  }, [messages, processMessage]);

  const runningTestCases = useMemo(() => {
    return allTestCases.filter((tc) => tc.testCaseResult === undefined);
  }, [allTestCases]);

  const finishedTestCases = useMemo(() => {
    return allTestCases.filter((tc) => tc.testCaseResult !== undefined) as FinishedTestCase[];
  }, [allTestCases]);

  const failedTestCases = useMemo(() => {
    return finishedTestCases.filter((tc) => tc.testCaseResult.status === 'failed') as FinishedTestCase[];
  }, [finishedTestCases]);

  const passedTestCases = useMemo(() => {
    return finishedTestCases.filter((tc) => tc.testCaseResult.status === 'passed') as FinishedTestCase[];
  }, [finishedTestCases]);

  const skippedTestCases = useMemo(() => {
    return finishedTestCases.filter((tc) => tc.testCaseResult.status === 'pending') as FinishedTestCase[];
  }, [finishedTestCases]);

  const percentCompleted = allTestFiles?.length ?
    Math.round(numCompletedTestFiles / allTestFiles.length * 100)
    : undefined;

  const mainStatus = (() => {
    if (isRunning) {
      if (allTestCases.length > 0) {
        return "running";
      }
      return "preparing";
    } else {
      if (allTestCases.length > 0) {
        return "finished";
      }
      return "ready";
    }
  })();

  const testFileStatus: (file: string) => TestResultStatusType = (file: string) => {
    const testFile = inspectResult?.testResults.find(result => result.name === file);
    if (!testFile) {
      return 'ready';
    }
    const lastRun = allTestCases.filter(testCase => testCase.test.path === file);

    if (lastRun.length === 0) {
      return 'ready';
    }

    if (testFile.assertionResults.length > lastRun.length) {
      return 'running';
    }

    if (lastRun.some(testCase => testCase.testCaseResult?.status === 'failed')) {
      return 'failed';
    }

    return 'passed';
  }

  const testCaseStatus: (file: string, caseFullName: string) => TestResultStatusType = (file: string, caseFullName: string) => {
    const testCase = findTestCase(file, caseFullName);
  
    if (!testCase) {
      return 'ready';
    }

    if (!testCase.testCaseResult) {
      return 'running';
    }

    if (testCase.testCaseResult.status === 'failed' || testCase.testCaseResult.status === 'passed') {
      return testCase.testCaseResult.status;
    }
    if (testCase.testCaseResult.status === 'pending') {
      return 'skipped';
    }

    return 'ready';
  }  
  
  const findTestCase = (file: string, caseFullName: string) => {
    const testCase = allTestCases.find(result => result.test.path === file && result.testCaseStartInfo.fullName ===caseFullName);
    return testCase;
  }

  return (<TestRunContext.Provider value={{
    run,
    messages,
    isRunning,
    aggregatedResult,
    percentCompleted,
    allTestCases,
    runningTestCases,
    finishedTestCases,
    passedTestCases,
    skippedTestCases,
    failedTestCases,
    allTestFiles,
    numCompletedTestFiles,
    inspectResult, 
    fetchInspect,
    inspectIsLoading,
    mainStatus,
    testFileStatus,
    testCaseStatus,
    findTestCase,
  }}>
    {children}
  </TestRunContext.Provider>);
}

export default TestRunContextProvider;

export const useTestRun = () => useContext(TestRunContext);
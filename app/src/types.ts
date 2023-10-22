import { Reporter } from '@jest/reporters';

export type RunStartEvent = {
  event: 'onRunStart',
  results: Parameters<NonNullable<Reporter['onRunStart']>>[0],
  options: Parameters<NonNullable<Reporter['onRunStart']>>[1]
}

export type TestResultEvent = {
  event: 'onTestResult',
  test: Parameters<NonNullable<Reporter['onTestResult']>>[0],
  testResult: Parameters<NonNullable<Reporter['onTestResult']>>[1],
  aggregatedResult: Parameters<NonNullable<Reporter['onTestResult']>>[2]
}

export type TestFileResultEvent = {
  event: 'onTestFileResult',
  test: Parameters<NonNullable<Reporter['onTestFileResult']>>[0],
  testResult: Parameters<NonNullable<Reporter['onTestFileResult']>>[1],
  aggregatedResult: Parameters<NonNullable<Reporter['onTestFileResult']>>[2]
}

export type TestCaseStartEvent = {
  event: 'onTestCaseStart',
  test: Parameters<NonNullable<Reporter['onTestCaseStart']>>[0],
  testCaseStartInfo: Parameters<NonNullable<Reporter['onTestCaseStart']>>[1],
}

export type TestCaseResultEvent = {
  event: 'onTestCaseResult',
  test: Parameters<NonNullable<Reporter['onTestCaseResult']>>[0],
  testCaseResult: Parameters<NonNullable<Reporter['onTestCaseResult']>>[1],
}

export type TestStartEvent = {
  event: 'onTestStart',
  test: Parameters<NonNullable<Reporter['onTestStart']>>[0],
}

export type TestFileStartEvent = {
  event: 'onTestFileStart',
  test: Parameters<NonNullable<Reporter['onTestFileStart']>>[0],
}

export type RunCompleteEvent = {
  event: 'onRunComplete',
  testContexts: Parameters<NonNullable<Reporter['onRunComplete']>>[0],
  results: Parameters<NonNullable<Reporter['onRunComplete']>>[1],
}

export type TestProgressEvent = RunStartEvent
  | TestResultEvent
  | TestFileResultEvent
  | TestCaseStartEvent
  | TestCaseResultEvent
  | TestStartEvent
  | TestFileStartEvent
  | RunCompleteEvent
  ;

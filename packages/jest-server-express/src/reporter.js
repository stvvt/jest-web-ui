const { BaseReporter } = require('@jest/reporters');

class MyReporter extends BaseReporter {
  async onRunStart(
    results,
    options
  ) {
    console.log(JSON.stringify({
      event: 'onRunStart',
      results,
      options,
    }));
  }

  async onRunComplete(
    testContexts,
    results
  ) {
    console.log(JSON.stringify({
      event: 'onRunComplete',
      results
    }));
  }

  async onTestStart(test) {
    throw new Error('onTestStart');
    // console.log('onTestStart', test.path);
  }

  async onTestResult(
    test,
    testResult,
    aggregatedResult
  ) {
    throw new Error('onTestResult');
    // console.log('onTestResult', stripPath(test.path));
  }

  async onTestFileStart(test) {
    console.log(JSON.stringify({
      event: 'onTestFileStart',
      test,
    }));
  }

  async onTestFileResult(
    test,
    testResult,
    aggregatedResult
  ) {
    console.log(JSON.stringify({
      event: 'onTestFileResult',
      test,
      testResult,
      aggregatedResult,
    }));
  }

  /**
   * Called before running a spec (prior to `before` hooks)
   * Not called for `skipped` and `todo` specs
   */
  async onTestCaseStart(
    test,
    testCaseStartInfo
  ) {
    console.log(JSON.stringify({
      event: 'onTestCaseStart',
      test,
      testCaseStartInfo,
    }));
  }

  async onTestCaseResult(
    test,
    testCaseResult
  ) {
    console.log(JSON.stringify({
      event: 'onTestCaseResult',
      test,
      testCaseResult,
    }));
  }
}

module.exports = MyReporter;

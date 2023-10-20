import { useTestRun } from '@/context/TestRunContext';
import { FormattedTestResults, Test } from '@jest/test-result';

type GetStatusArg = {
  file: FormattedTestResults['testResults'][number]['name'],
  fullName: FormattedTestResults['testResults'][number]['assertionResults'][number]['fullName'],
}

const useTestStatus = () => {
  const {} = useTestRun();

  const getStatus = (test: GetStatusArg) => {
    
  };

  return {
    getStatus,
  }

};

export default useTestStatus;
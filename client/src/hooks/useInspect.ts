import { FormattedTestResults } from '@jest/test-result';
import { useState } from 'react'

const useInspect = () => {
  const [inspectResult, setInspectResult] = useState<FormattedTestResults>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchInspect = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/inspect')
      const data = await response.json() as FormattedTestResults;
      setInspectResult(data);
    } finally {
      setIsLoading(false);
    }
  }

  return { inspectResult, fetchInspect, isLoading };
}

export default useInspect;

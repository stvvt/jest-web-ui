import { useEffect, useState } from 'react'

const useListTests = () => {
  const [allTestFiles, setAllTestFiles] = useState<string[]>();

  const fetchAllTestFiles = async () => {
    const response = await fetch('/api/listTests')
    const data = await response.json() as string[];
    setAllTestFiles(data);
  }

  useEffect(() => {
    fetchAllTestFiles();
  }, []);

  return { allTestFiles };
}

export default useListTests;

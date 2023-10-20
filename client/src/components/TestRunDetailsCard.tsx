import TestListItem from "@/components/TestCase/TestCaseListItem";
import { useTestRun } from "@/context/TestRunContext";
import { Card, Collapse, List } from "@mui/material";
import { FC } from "react";

const TestRunDetailsCard: FC = () => {
  const {
    allTestCases,
  } = useTestRun();

  return (
      <List dense  sx={{overflow: 'auto', scrollbarGutter: 'stable', height: '20em'}}>
        {allTestCases.map((testCase, idx) => (
          <Collapse
            in={testCase.testCaseResult?.status !== "passed"}
            timeout={{ exit: 1000 }}
            key={idx}
            unmountOnExit
          >
            <TestListItem testCase={testCase} />
          </Collapse>
        ))}
      </List>
  );
};

export default TestRunDetailsCard;

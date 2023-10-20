import { FC } from "react";
import { TestCase } from "@/context/TestRunContext";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Stack,
  useTheme,
} from "@mui/material";

interface Props {
  testCase: TestCase;
}

const TestListItem: FC<Props> = ({ testCase }) => {
  const theme = useTheme();

  return (
    <ListItem>
      <Stack direction="row" gap={1}>
        <Box>
          <ListItemText
            secondary={testCase.testCaseStartInfo.title}
            primary={testCase.testCaseStartInfo.ancestorTitles.join(" » ")}
            primaryTypographyProps={{
              color: testCase.testCaseResult
                ? testCase.testCaseResult.status === 'failed'
                  ? theme.palette.error.main
                  : testCase.testCaseResult.status === 'passed'
                    ? theme.palette.success.main
                    : theme.palette.warning.main
                : theme.palette.warning.main,
            }}
          />
        </Box>
        <Box flex="1">
          {testCase.testCaseResult?.status === "failed" && (
            <List disablePadding dense>
              {/* <pre>{JSON.stringify(testCase.testCaseResult, null, 2)}</pre> */}
              {testCase.testCaseResult.failureDetails.map((detail: any, idx) => (
                <ListItem key={idx}>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: "body2",
                      color: theme.palette.error.main,
                      // fontFamily: "monospace",
                    }}
                    primary={detail?.matcherResult?.message ?? detail?.message ?? <code>matcherResult.message!?!?</code>}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Stack>
    </ListItem>
  );
};

export default TestListItem;

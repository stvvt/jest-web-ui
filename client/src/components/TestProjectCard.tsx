import { useTestRun } from "@/context/TestRunContext";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { ComponentProps, FC, Fragment, useState } from "react";
import ScienceIcon from "@mui/icons-material/Science";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import RefreshIcon from '@mui/icons-material/Refresh';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DoneAllIcon from '@mui/icons-material/DoneAll';

type Props = ComponentProps<typeof Card>;

const TestProjectCard: FC<Props> = (cardProps) => {
  const { inspectResult, fetchInspect, inspectIsLoading, testFileStatus, testCaseStatus, findTestCase } = useTestRun();
  const [isOpen, setIsOpen] = useState<{ [file: string]: boolean }>({});
  const theme = useTheme();

  const toggleIsOpen = (file: string) => {
    setIsOpen({ ...isOpen, [file]: (isOpen[file] ?? true) ? false : true });
  };

  const getTestFileStatusIcon = (file: string) => {
    const status = testFileStatus(file);
    switch (status) {
      case 'ready':
        return <TextSnippetOutlinedIcon color="primary" fontSize="small" />;
      case 'running':
        return <CircularProgress size="0.8rem" color="inherit" sx={{mt: 0.5}} />;
      case 'failed':
        return <CloseIcon color="error" fontSize="small" />;
      default:
        return <DoneAllIcon color="success" fontSize="small" />;
    }
  }

  const getTestCaseStatusIcon = (file: string, fullName: string) => {
    const status = testCaseStatus(file, fullName);
    switch (status) {
      case 'ready':
        return <ScienceIcon color="primary" fontSize="small" />;
      case 'running':
        return <CircularProgress size="0.8rem" color="inherit" sx={{mt: 0.5}} />;
      case 'failed':
        return <CloseIcon color="error" fontSize="small" />;
      case 'skipped':
        return <ScienceIcon color="warning" fontSize="small" />;
      default:
        return <DoneIcon color="success" fontSize="small" />;
    }
  }

  return (
    <Card {...cardProps}>
      <CardHeader
        title="Tests"
        action={
          <LoadingButton
            variant="text"
            size="small"
            loading={inspectIsLoading}
            onClick={fetchInspect}
            sx={{ minWidth: 0 }}
          >
            <RefreshIcon />
          </LoadingButton>
        }
      />
      <CardContent>
      <List disablePadding>
        {inspectResult?.testResults.map((testResult, idx) => {
          const file = testResult.name.split(/\/_+tests_+\//)[1];
          return (
            <Fragment key={idx}>
              <ListItemButton disableGutters
                onClick={() =>
                  toggleIsOpen(file)
                }
                alignItems="flex-start"
              >
                <ListItemIcon sx={{ minWidth: theme.spacing(2.5), mt: 1.2 }}>
                  {getTestFileStatusIcon(testResult.name)}
                  {/* <TextSnippetOutlinedIcon color="primary" fontSize="small" /> */}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <code>{file}</code>
                  }
                  secondary={testFileStatus(testResult.name)}
                />
                {isOpen[file] !== false ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItemButton>
              <Collapse in={isOpen[file] !== false}>
                <List disablePadding dense>
                  {testResult.assertionResults.map((assertionResult, aidx) => (
                    <ListItemButton
                      key={aidx}
                      sx={{ pl: 2, alignItems: 'start' }}
                      disableGutters
                    >
                      <ListItemIcon sx={{ minWidth: theme.spacing(2.5), mr: 0.5 }}>
                        {getTestCaseStatusIcon(testResult.name, assertionResult.fullName)}
                      </ListItemIcon>
                      <ListItemText
                        sx={{ margin: 0 }}
                        secondary={assertionResult.title}
                        primary={assertionResult.ancestorTitles.join(" » ")}
                      />
                      <Box>{findTestCase(testResult.name, assertionResult.fullName)?.testCaseResult?.duration}</Box>
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Fragment>
          );
        })}
      </List>
      {/* <pre>{JSON.stringify(inspectResult, null, 2)}</pre> */}
      </CardContent>
    </Card>
  );
};

export default TestProjectCard;

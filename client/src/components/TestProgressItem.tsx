import { Box, LinearProgress, LinearProgressProps, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

interface Props {
  title: ReactNode;
  currentValue: number | undefined;
  total: number | undefined;
  color?: LinearProgressProps['color'];
}

const TestProgressItem: FC<Props> = ({ title, currentValue, total, color }) => {
  const value = currentValue !== undefined && total !== undefined 
    ? total !== 0 ? Math.round(currentValue / total * 100) : 0
    : -1;

  return (
    <ListItem>
      <ListItemText 
        primary={
          <Stack direction="row">
            <Typography flex="1" variant="body2" color={currentValue ?'inherit' : 'GrayText'}>{title}</Typography>
            {currentValue ? currentValue : ''}
          </Stack>
        }
        secondary={<LinearProgress variant="determinate" value={value} color={value > 0 ? color : 'inherit'} />} 
      />
    </ListItem>
  );
}

export default TestProgressItem;

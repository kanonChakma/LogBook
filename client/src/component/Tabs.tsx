import { Box, Tab, Tabs } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import { SetStateAction, useState } from 'react';

const Tabss = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: any, newTabIndex: SetStateAction<number>) => {
    setTabIndex(newTabIndex);
  };

  return (
    <Box>
      <Box>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons={true}
        textColor="secondary"
        indicatorColor="primary"
        >
        <Tab label="Tab 1" />
        <Tab label="Tab 2" />
        <Tab label="Tab 3" />
        <Tab label="Tab 4" />
        <Tab label="Tab 5" />
        <Tab label="Tab 6" />
        <Tab label="Tab 7" />
        <Tab label="Tab 8" />
        <Tab label="Tab 9" />
        <Tab label="Tab 10" />
        </Tabs>
      </Box>
      <hr/>
    </Box>
  );
}

export default Tabss;
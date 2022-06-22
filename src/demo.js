import * as React from 'react';
import copy from 'copy-to-clipboard';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { isMobile } from 'react-device-detect';

export default function TriggersTooltips() {
  const [copied, setCopy] = useCopyClipboard(1000);

  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item>
          <Tooltip disableFocusListener title="Add">
            <Button>Hover or touch</Button>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip disableHoverListener title="Add">
            <Button>Focus or touch</Button>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip disableFocusListener disableTouchListener title="Add">
            <Button>Hover</Button>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip
            disableFocusListener
            disableTouchListener
            title={copied || isMobile ? 'copied' : 'clip'}
            {...(isMobile && { open: copied })}
          >
            <Button onClick={() => setCopy('content ..... abc')}>Click</Button>
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );
}

function useCopyClipboard(timeout = 500) {
  const [isCopied, setIsCopied] = React.useState(false);

  const staticCopy = React.useCallback((text) => {
    const didCopy = copy(text);
    setIsCopied(didCopy);
  }, []);

  React.useEffect(() => {
    if (isCopied) {
      const hide = setTimeout(() => setIsCopied(false), timeout);

      return () => clearTimeout(hide);
    }
    return undefined;
  }, [isCopied, setIsCopied, timeout]);

  return [isCopied, staticCopy];
}

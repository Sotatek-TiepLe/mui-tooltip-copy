import * as React from 'react';
import copy from 'copy-to-clipboard';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';

export default function TriggersTooltips() {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState('text');
  const [copied, setCopy] = useCopyClipboard(2000);
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    // alert('click')
    setOpen(true);
    setText('copyed');
    setCopy('adfs');
  };

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
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                disableFocusListener
                disableTouchListener
                title={copied ? 'copied' : 'clip'}
              >
                <Button onClick={handleTooltipOpen}>Click</Button>
              </Tooltip>
            </div>
          </ClickAwayListener>
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

import { Container, Box, Drawer, Button, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import * as React from 'react'
import { Inbox, Mail } from '@mui/icons-material'
type Anchor = 'left';


export default function Home() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['TextField', 'Select', 'Radio Button', 'Picker', 'Autocomplete'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );


  return (
    <>
      <Container>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} >
          <Box sx={{ alignContent: 'center', display: 'blockyarn add formik' }}>
            {(['left'] as const).map((anchor) => (
              <React.Fragment key={anchor}>
                <Button variant="contained" onClick={toggleDrawer(anchor, true)}> { 'Agregar Campo' } </Button>
                <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
          </Box>
        </Box>
      </Container>
    </>
  )
}

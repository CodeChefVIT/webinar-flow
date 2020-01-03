import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Collapse from '@material-ui/core/Collapse'
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SimpleMenu from "./dev";

const drawerWidth = 220;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',

    },
    button:{
        color:"#b2fcff",
        marginRight:theme.spacing(2),

      borderColor:
          "#b2fcff",


        marginLeft: "auto",




    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        width:'100%',
        display: 'flex',
        flexDirection:'row-reverse',
        justifyContent:'space-between',

        zIndex: theme.zIndex.drawer + 1,

        backgroundColor:
            "#536dfe",
        [theme.breakpoints.up('sm')]: {
            width: `100%`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {

       justifySelf:'flex-end',
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function ResponsiveDrawer(props) {
    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />

            <List>
              <ListItem button ><ListItemIcon onClick={props.prop3}><HomeIcon/></ListItemIcon>
              <ListItemText onClick={props.prop3}>Dashboard</ListItemText>
              </ListItem>
                <ListItem button >
                    <ListItemIcon onClick={props.prop2}><AddCircleOutlineIcon/></ListItemIcon>
                   <ListItemText onClick={props.prop2}>Add Webinar</ListItemText>

                </ListItem>
<ListItem style={{alignSelf:'flex-end'}}><SimpleMenu/></ListItem>
            </List>


        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>

                    <Button variant="outlined" onClick={props.prop} className={classes.button}>
                        SIGN OUT
                    </Button>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>

                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden mdDown Down implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden mdDown Down implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>

        </div>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default ResponsiveDrawer;
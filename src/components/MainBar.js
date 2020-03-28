import React from 'react'
import AppBar from '@material-ui/core/AppBar'; 
import Toolbar from '@material-ui/core/Toolbar'; 
import IconButton from '@material-ui/core/IconButton'; 
import Typography from '@material-ui/core/Typography'; 
import { makeStyles }  from '@material-ui/core'; 
import Tooltip from '@material-ui/core/Tooltip'; 
import Link from '@material-ui/core/Link'; 
import MenuIcon from '@material-ui/icons/Menu';
import { useRouteMatch } from 'react-router-dom'; 
import clsx from 'clsx'; 
import { switchRouterLinkProps } from '../utils/common'

const Mainbar = ({
  title = 'title', 
  links = [], 
  className, 
  menuClick, 
  ...other
}) => {
  const match = useRouteMatch();
  const classes = useStyles();

  return (
    <AppBar 
      position="fixed" 
      className={clsx(classes.root, className)}
      {...other}
    >
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={menuClick}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          <Link 
            color="inherit"
            underline="none"
            {...switchRouterLinkProps(`${match.url}`)} 
          >
            {title}
          </Link>
        </Typography>
        <div className={classes.grow} />
        {links.map(({ name, title, icon, to }) => (
          <Tooltip key={name} title={title}>
            <IconButton 
              color="inherit"
              {...switchRouterLinkProps(to)}
            >
              {icon}
            </IconButton>
          </Tooltip>
        ))}
      </Toolbar>
    </AppBar>
  )
}

export default Mainbar;

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1, 
  }, 
}));

import React, { useState } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import GitHubIcon from '@material-ui/icons/GitHub';
import GridOffIcon from '@material-ui/icons/GridOff';
import GridOnIcon from '@material-ui/icons/GridOn';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core';
import MainBar from '../components/MainBar';
import SideMenu from '../components/SideMenu';
import Tables from '../components/Tables';
import Sales from '../components/Sales';
import ThemeProvider from '../components/ThemeProvider'; 


const Main = () => {
  const match = useRouteMatch();

  const mainBarLinks = [
    {
      name: 'github', 
      title: 'Gitリポジトリ', 
      icon: <GitHubIcon />, 
      to: 'https://github.com/a-nakajima-at-shokuryu/daikyo-kai2', 
    }, 
    {
      name: 'home', 
      title: 'ホーム', 
      icon: <HomeIcon />, 
      to: '/', 
    }, 
  ]; 

  const sideMenuLinks = [
    {
      name: 'tables', 
      title: 'テーブル定義書', 
      icon: <GridOffIcon />, 
      to: `${match.url}/tables`
    }, 
    {
      name: 'sales', 
      title: '売上伝票入力', 
      icon: <GridOnIcon />, 
      to: `${match.url}/sales`
    }, 
  ];

  const [topLayout, sideLayout, contentsLayout] = useLayout();

  return (
    <ThemeProvider>
      <div style={{
        display: 'flex', 
      }}>
        <MainBar 
          title="株式会社ショクリュー" 
          links={mainBarLinks} 
          {...topLayout}
        />
        <SideMenu 
          links={sideMenuLinks} 
          {...sideLayout}
        />
        <Contents {...contentsLayout}>
          <Route exact path={`${match.url}/`} component={Tables} />
          <Route path={`${match.url}/tables`} component={Tables} />
          <Route path={`${match.url}/sales`} component={Sales} />
        </Contents>
      </div>
    </ThemeProvider>
  )
}

export default Main;

const Contents = ({
  contentsLayout, 
  children, 
  ...other 
}) => {
  return (
    <main {...other}>
      {children}
    </main>
  )
};
  // Drawer（左サイドバー）伸縮レイアウトのためのフック関数
const useLayout = () => {
  const [open, setOpen] = useState(false);
  const classes = useLayoutStyle(open);

  const toggleOpen = () => {
    setOpen(!open);
  };
  const topLayout = {
    open, 
    menuClick: toggleOpen, 
    className: classes.top, 
  };
  const sideLayout = {
    open, 
    chevronClick: toggleOpen, 
    className: classes.side, 
  };
  const contentsLayout = {
    className: classes.contents, 
  }; 
  return [
    topLayout, 
    sideLayout, 
    contentsLayout, 
  ];
};

// トップバーとサイドバーのスタイル設定
const drawerWidth = 240;
const drawerWidthMin = theme => theme.spacing(7);

const useLayoutStyle = makeStyles(theme => ({
  // トップバーのスタイル
  top: {
    width: open => (open 
      ? `calc(100% - ${drawerWidth}px)` 
      : `calc(100% - ${drawerWidthMin(theme)}px)`
    ), 
    transition: theme.transitions.create(['width'], {
      duration: theme.transitions.duration.enterScreen, 
      easing: theme.transitions.easing.sharp, 
    }), 
  }, 
  // サイドバーのスタイル
  side: {
    width: open => (open 
      ? drawerWidth 
      : drawerWidthMin(theme)
    ), 
    transition: theme.transitions.create(['width'], {
      duration: theme.transitions.duration.enterScreen, 
      easing: theme.transitions.easing.sharp, 
    }), 

    whiteSpace: 'nowrap', 
    overflow: 'hidden', 
  }, 
  // メインコンテンツのスタイル
  contents: {
    marginTop: theme.mixins.toolbar.minHeight, 
    padding: theme.spacing(2), 
    flexGrow: 1, 
  }, 
}));
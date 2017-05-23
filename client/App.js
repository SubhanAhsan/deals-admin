
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

import IconSocialNotifications from 'material-ui/svg-icons/social/notifications';
import IconNavBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconNavMenu from 'material-ui/svg-icons/navigation/menu';

import Home from './scenes/Home';
import Locations from './scenes/Locations';
import LocationAddEdit from './scenes/LocationAddEdit';
import Vendors from './scenes/Vendors';
import VendorAddEdit from './scenes/VendorAddEdit';
import Offers from './scenes/Offers';
import OfferAddEdit from './scenes/OfferAddEdit';
import Categories from './scenes/Categories';
import CategoryAddEdit from './scenes/CategoryAddEdit';
import SubCategories from './scenes/SubCategories';
import SubCategoryAddEdit from './scenes/SubCategoryAddEdit';

import './styles/App.css';
const styles = {
  title: {
    cursor: 'pointer',   
  }, 
};

const history = createBrowserHistory();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false
    };
  }

  handleDrawerToggle = () => this.setState((prevState, props) => ({drawerOpen: !prevState.drawerOpen}));
  handleDrawerClose = () => this.setState({drawerOpen: false});

  routeToLatestDeals(){

  }

  render() {
    return (
      <Router history={history}>
      <div className="App">
        <div className="appBarContainer">
         <AppBar
            title={<span style={styles.title}>Deals Admin</span>}
            iconElementLeft={<IconButton><IconNavMenu /></IconButton>}
            onLeftIconButtonTouchTap={this.handleDrawerToggle}
            iconElementRight={<IconButton><IconSocialNotifications /></IconButton>}
            />
        </div>
       <div className="drawerContainer">
          <Drawer open={this.state.drawerOpen}  docked={false} onRequestChange={(open) => this.setState({drawerOpen: open})}>
            <MenuItem></MenuItem>
            <Link to="/locations"><MenuItem onTouchTap={this.handleDrawerClose}>Locations</MenuItem></Link>
            <Link to="/vendors"><MenuItem onTouchTap={this.handleDrawerClose}>Vendors</MenuItem></Link>
            <Link to="/offers"><MenuItem onTouchTap={this.handleDrawerClose}>Offers</MenuItem></Link>
            <Link to="/categories"><MenuItem onTouchTap={this.handleDrawerClose}>Categories</MenuItem></Link>            
            <Link to="/subcategories"><MenuItem onTouchTap={this.handleDrawerClose}>SubCategories</MenuItem></Link>
          </Drawer>
       </div>

       
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/locations" component={Locations}>            
          </Route>
          <Route path="/locations/add" component={LocationAddEdit}/>
          <Route path="/locations/:id" component={LocationAddEdit}/>
          <Route exact path="/vendors" component={Vendors}>            
          </Route>
            <Route path="/vendors/add" component={VendorAddEdit}/>
          <Route path="/vendors/:id" component={VendorAddEdit}/>
          <Route exact path="/offers" component={Offers}>            
          </Route>
            <Route path="/offers/add" component={OfferAddEdit}/>
          <Route path="/offers/:id" component={OfferAddEdit}/>
          <Route exact path="/categories" component={Categories}>            
          </Route>
           <Route path="/categories/add" component={CategoryAddEdit}/>
          <Route path="/categories/:id" component={CategoryAddEdit}/>
          <Route exact path="/subcategories" component={SubCategories}>            
          </Route>
           <Route path="/subcategories/add" component={SubCategoryAddEdit}/>
          <Route path="/subcategories/:id" component={SubCategoryAddEdit}/>


        </Switch>
       

      </div>
      </Router>
    );//.return
  }//.render

}//.class App

export default App;

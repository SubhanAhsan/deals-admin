
import React, {Component} from 'react';
import {
  Link
} from 'react-router-dom';

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';


import IconDeals from 'material-ui/svg-icons/maps/local-offer';
import IconVendors from 'material-ui/svg-icons/action/account-circle';
import IconLocations from 'material-ui/svg-icons/maps/place';

import PromoImg from '../images/bghome1.jpg';



const styles = {
  sceneHome:{

  },
  promoWrapper:{
    height: '100vh',
    width: '100%',
    position: 'fixed',
    top: '50px',
    left: '0px',
    backgroundImage: 'url(' + PromoImg + ')',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  },
  homeFootNav:{
    position: 'fixed',
    bottom: '0',
    left: '0',    
    width: '100%',
 
  },
};


class Home extends Component{


render(){

return(
<div id="sceneHome" style={styles.sceneHome}>  
<div id="promoWrapper" style={styles.promoWrapper}>         

</div>

<div id="homeFootNav" style={styles.homeFootNav}>
    <Paper zDepth={1}>
        <BottomNavigation >
          
          <BottomNavigationItem
            label="Locations"
            icon={<IconLocations />}
            containerElement={<Link to="/locations" />}
          />
          
          <BottomNavigationItem
            label="Vendors"
            icon={<IconVendors />}
            containerElement={<Link to="/vendors" />}
           
          />
           <BottomNavigationItem
            label="Categories"
            icon={<IconDeals />}
            containerElement={<Link to="/categories" />}
          />

          <BottomNavigationItem
            label="SubCategories"
            icon={<IconDeals />}
            containerElement={<Link to="/subcategories" />}
          />
          <BottomNavigationItem
            label="Deals"
            icon={<IconDeals />}
            containerElement={<Link to="/offers" />}
          />
        </BottomNavigation>
        
  </Paper>
</div>
</div>
);//.return

}//.render

}//.class

export default Home;
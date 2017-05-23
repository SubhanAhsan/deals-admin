
import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

import axios from 'axios';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconAdd from 'material-ui/svg-icons/content/add-circle';
import IconEdit from 'material-ui/svg-icons/content/create';


const styles = {
  scene: {
    position: 'absolute',
   right:'0', left: '0',
   top: '50px',
   bottom: '0',
overflow: 'hidden',
  },
  contentWrapper: {
    width: '100%',
    top: '0px',
    bottom: '60px',
    position: 'absolute',
    overflowY: 'auto',
  },
  bottomFootNav: {
    position: 'absolute',
    bottom: '0',
 
    width: '100%',
  right:'0', left: '0',
  },

};


class Categories extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selected: [],

    }

  
  }

  componentDidMount() {
    //TODO
    this.getContent();

  }

  componentWillUnmount() {

  }

  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1;
  };

  handleRowSelection = (selectedRows, evt) => {
    this.setState({
      selected: selectedRows,
    });
    console.log(this.state.categories[selectedRows]);
  };

  

  getContent() {
    let sourceUrl = location.hostname === 'localhost' ?
      'http://localhost:8080/api/categories' :
      '/api/categories'; //path based on environment (development/production)

    axios.get(sourceUrl)
      .then(response => {
        if (response.data && response.data.length === 0) {

          return;
        }
        this.setState({
          categories: response.data
        })

      })
      .catch(function (error) { // TODO error handling
        console.log(error);
      });

  }

  render() {
    var tableRows = this.state.categories.map((data, index) => {
      //console.log("index " + index);
      return (
        <TableRow key={data._id} selected={this.isSelected({ index })}>
          <TableRowColumn>{data._id}</TableRowColumn>
          <TableRowColumn><Link to={'/categories/' + data._id}>{data.name}</Link></TableRowColumn>
          <TableRowColumn>{data.active.toString()}</TableRowColumn>
        </TableRow>
      )
    }, this);


    return (
      <div id="sceneLocation" style={styles.scene}>
        <div style={styles.contentWrapper}>


          <div>
            <Table onRowSelection={this.handleRowSelection}>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>ID</TableHeaderColumn>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Active</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableRows}
              </TableBody>
            </Table>
          </div>
        </div>


        <div id="bottomFootNav" style={styles.bottomFootNav}>
          <Paper zDepth={1}>
            <BottomNavigation >

              <BottomNavigationItem
                containerElement={<Link to="/categories/add" />}
                icon={<IconAdd />}
                label="Add New"
              />

             

            </BottomNavigation>
          </Paper>
        </div>

      </div>
    );//.return

  }//.render

}//.class

export default Categories;
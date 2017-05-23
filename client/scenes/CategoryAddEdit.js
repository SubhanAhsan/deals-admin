
import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';

import axios from 'axios';

import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Snackbar from 'material-ui/Snackbar';

import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconSave from 'material-ui/svg-icons/content/save';
import IconDelete from 'material-ui/svg-icons/content/remove-circle';
import IconUpdate from 'material-ui/svg-icons/action/update';



const styles = {
    scene: {

    },
    contentWrapper: {
        height: '100vh',
        width: '100%',
        position: 'fixed',
        top: '50px',
        left: '0px',

        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
    },
    toggle: {
        marginLeft: '50px',
        width: '250px'
    },
    bottomFootNav: {
        position: 'fixed',
        bottom: '0',
        left: '0',
        width: '100%',

    },
}

class CategoryAddEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            active: true,

            snackbar: {
                open: false,
                message: "nothing",
            },
            isNew: true,
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleActiveChange = this.handleActiveChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }



    componentDidMount() {
        //TODO
        console.log(this.props.location);

        if (this.props.location.pathname === "/categories/add") { // if Add New
            this.setState({ isNew: true });
        }
        else { // if existing record

            this.setState({ isNew: false });

            let sourceUrl = location.hostname === 'localhost' ?
                'http://localhost:8080/api/categories/' + this.props.match.params.id :
                '/api/categories/' + this.props.match.params.id; //path based on environment (development/production)

            console.log(sourceUrl);
            axios.get(sourceUrl)
                .then(response => {
                    if (response.data && response.data.length === 0) {
                        //TODO error handling
                        return;
                    }
                    //console.log(response.data);
                    this.setState({ id: response.data._id, name: response.data.name, active: response.data.active });
                })
                .catch(function (error) { // TODO error handling
                    console.log(error);
                });

        }

    }

    handleNameChange = (event) => {

        this.setState({
            name: event.target.value,
        });
        //console.log(event.target.value);
    };

    handleActiveChange = (event) => {
        console.log(event.target.checked);
        this.setState({
            active: event.target.checked ? true : false,
        });
    };




    handleSave(event) {
        if (this.state.name === "") {
            this.setState({ snackbar: { open: true, message: "Please enter the category name" } });
            return false;
        }

        //POST the data
        let sourceUrl = location.hostname === 'localhost' ?
            'http://localhost:8080/api/categories/' :
            '/api/categories/';

        axios.post(sourceUrl, { name: this.state.name, active: this.state.active })
            .then(response => {
                console.log(response);
                history.back();
            })
            .catch(function (error) { // TODO error handling
                console.log(error);
            });
    }

    handleUpdate(event) {
        if (this.state.name === "") {
            this.setState({ snackbar: { open: true, message: "Please enter the category name" } });
            return false;
        }

        //PUT the data
       
            let sourceUrl = location.hostname === 'localhost' ?
                'http://localhost:8080/api/categories/' + this.props.match.params.id :
                '/api/categories/' + this.props.match.params.id; //path based on environment (development/production)

        axios.put(sourceUrl, { name: this.state.name, active: this.state.active })
            .then(response => {
                console.log(response);
                history.back();
            })
            .catch(function (error) { // TODO error handling
                console.log(error);
            });

    }

    handleSnackbarClose = () => { this.setState({ snackbar: { open: false, } }) }


    render() {
        return (
            <div id="sceneLocationAddEdit" style={styles.scene}>
                <div style={styles.contentWrapper}>
                    <form>
                        <TextField
                            id="locName"
                            hintText="Category Name"
                            value={this.state.name}
                            onChange={this.handleNameChange}
                        /><br />
                        <Toggle
                            id="locActive"
                            label="Active"
                            style={styles.toggle}
                            labelPosition="right"
                            defaultToggled={true}
                            toggled={this.state.active}
                            onToggle={this.handleActiveChange}
                        /><br />
                    </form>


                </div>

                <div id="bottomFootNav" style={styles.bottomFootNav}>
                    <Paper zDepth={1}>
                        <BottomNavigation >

                            <BottomNavigationItem

                                icon={<IconSave />}
                                label="Save"
                                onTouchTap={this.handleSave}
                                disabled={!this.state.isNew}
                            />

                            <BottomNavigationItem

                                icon={<IconUpdate />}
                                label="Update"
                                onTouchTap={this.handleUpdate}
                                disabled={this.state.isNew}
                            />

                            <BottomNavigationItem
                                label="Delete"
                                icon={<IconDelete />}
                                disabled={this.state.isNew}
                            />

                        </BottomNavigation>
                    </Paper>
                </div>
                <Snackbar
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.message}
                    autoHideDuration={4000}
                    onRequestClose={this.handleSnackbarClose}
                />
            </div>
        );
    }

}

export default CategoryAddEdit;

import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';

import axios from 'axios';

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';

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
import IconSave from 'material-ui/svg-icons/content/save';
import IconDelete from 'material-ui/svg-icons/content/remove-circle';
import IconUpdate from 'material-ui/svg-icons/action/update';



const styles = {
    scene: {

    },
    contentWrapper: {
        display: 'block',
        height: '100vh',

        position: 'fixed',
        top: '50px',
        left: '0px',
        padding: '20px',

        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',

        overflowY: 'auto',
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

class OfferAddEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            desc: "",
            offer_start: new Date(),
            offer_end: null,
            vendor_name: "",
            vendor_id: "",
            vendor_logo_url: "",
            categories: [],
            subcategories: [],
            locationsSelected: [],
            location_id: "",
            location_name: "",
            vendors: [],
            locations: [],
           
            subcategoryList: [],
            snackbar: {
                open: false,
                message: "nothing",
            },
            isNew: true,

        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleOfferStartChange = this.handleOfferStartChange.bind(this);
        this.handleOfferEndChange = this.handleOfferEndChange.bind(this);
        this.handleVendorChange = this.handleVendorChange.bind(this);
        this.handleLocationSelect = this.handleLocationSelect.bind(this);
        this.handleSubCategorySelect = this.handleSubCategorySelect.bind(this);
        //this.handleCategoryChange = this.handleCategoryChange.bind(this);
        //this.handleSubCategoryChange = this.handleSubCategoryChange.bind(this);

        this.handleSave = this.handleSave.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }



    componentDidMount() {
        //TODO
        console.log(this.props.location);

        if (this.props.location.pathname === "/offers/add") { // if Add New
            this.setState({ isNew: true });
        }
        else { // if existing record

            this.setState({ isNew: false });

            let sourceUrl = location.hostname === 'localhost' ?
                'http://localhost:8080/api/offers/' + this.props.match.params.id :
                '/api/offers/' + this.props.match.params.id; //path based on environment (development/production)

            console.log(sourceUrl);
            axios.get(sourceUrl)
                .then(response => {
                    if (response.data && response.data.length === 0) {
                        //TODO error handling
                        return;
                    }
                    console.log(response.data);
                    this.setState({
                        id: response.data._id,
                        name: response.data.name,
                        desc: response.data.desc,
                        offer_start: response.data.offer_start == "" || response.data.offer_start == null ? "" : new Date(response.data.offer_start),
                        offer_end: response.data.offer_end == "" || response.data.offer_end == null ? "" : new Date(response.data.offer_end),
                        vendor_name: response.data.vendor.name,
                        vendor_id: response.data.vendor.vendorid,
                        vendor_logo_url: response.data.vendor.logo,
                        locationsSelected: response.data.locations,
                        categories: response.data.categories,
                        subcategories: response.data.subcategories,
                    });
                })
                .catch(function (error) { // TODO error handling
                    console.log(error);
                });

        }

        this.getContentLocations();
        this.getContentVendors();
        this.getContentSubCategory();

    }



    getContentLocations() {
        let sourceUrl = location.hostname === 'localhost' ?
            'http://localhost:8080/api/locations' :
            '/api/locations'; //path based on environment (development/production)

        axios.get(sourceUrl)
            .then(response => {
                if (response.data && response.data.length === 0) {

                    return;
                }
                this.setState({
                    locations: response.data
                })

            })
            .catch(function (error) { // TODO error handling
                console.log(error);
            });

    }

    getContentVendors() {
        let sourceUrl = location.hostname === 'localhost' ?
            'http://localhost:8080/api/vendors/' :
            '/api/vendors/'; //path based on environment (development/production)

        axios.get(sourceUrl)
            .then(response => {
                if (response.data && response.data.length === 0) {

                    return;
                }
                this.setState({
                    vendors: response.data
                })

            })
            .catch(function (error) { // TODO error handling
                console.log(error);
            });

    }

    getContentSubCategory() {
        let sourceUrl = location.hostname === 'localhost' ?
            'http://localhost:8080/api/subcategories/' :
            '/api/subcategories/'; //path based on environment (development/production)

        axios.get(sourceUrl)
            .then(response => {
                if (response.data && response.data.length === 0) {
                    return;
                }
                this.setState({
                    subcategoryList: response.data
                });
            })
            .catch(function (error) { // TODO error handling
                console.log(error);
            });
    }


    handleNameChange = (event) => {

        this.setState({
            name: event.target.value,
        });
        //console.log(event.target.value);
    };

    handleDescChange = (event) => {

        this.setState({
            desc: event.target.value,
        });
        //console.log(event.target.value);
    };

    handleOfferStartChange = (event, date) => {

        this.setState({
            offer_start: date,
        });
        console.log(date);
    };

    handleOfferEndChange = (event, date) => {

        this.setState({
            offer_end: date == "" ? null : date,
        });
        console.log(date);
    };

    handleVendorChange = (event, key) => {

        this.setState((pervState, props) => ({
            vendor_id: pervState.vendors[key]._id,
            vendor_name: pervState.vendors[key].name,
            vendor_logo_url: pervState.vendors[key].logo_url,
        }));
        console.log(this.state.vendors[key]);
    };

    handleSubCategorySelect = (selectedRows) => {
        console.log(selectedRows);
        this.setState((pervState, props) => {
            let currentSelectedCategories = [];
            let currentSelectedSubCategories = [];
            for (let i = 0; i < selectedRows.length; i++) {
                 currentSelectedCategories.push({                    
                    _id: pervState.subcategoryList[selectedRows[i]].parentCategory._id, name: pervState.subcategoryList[selectedRows[i]].parentCategory.name, 
                });
                currentSelectedSubCategories.push({
                    _id: pervState.subcategoryList[selectedRows[i]]._id, name: pervState.subcategoryList[selectedRows[i]].name,                   
                });

            }
            return { categories: currentSelectedCategories,  subcategories: currentSelectedSubCategories };
        });

    };

 

    isLocationSelected = (data) => {

        let retVal = false;
        for (let i = 0; i < this.state.locationsSelected.length; i++) {
            //console.log(data._id)
            if (this.state.locationsSelected[i].locationid == data._id) {
                console.log(this.state.locationsSelected[i].locationid);
                retVal = true;
                //return true;
            }

        }
        return retVal;
    }

    handleLocationSelect = (selectedRows) => {
        //console.log(selectedRows);
        this.setState((pervState, props) => {
            let currentSelectedLocations = [];
            for (let i = 0; i < selectedRows.length; i++) {
                currentSelectedLocations.push({ locationid: pervState.locations[selectedRows[i]]._id, name: pervState.locations[selectedRows[i]].name })
            }
            return { locationsSelected: currentSelectedLocations };
        });

    };



    handleSave(event) {
        if (this.state.name === "" || this.state.desc === "") {
            this.setState({ snackbar: { open: true, message: "Please enter the offer title / desc" } });
            return false;
        }

        if (this.state.offer_start === "" || this.state.offer_end === "") {
            this.setState({ snackbar: { open: true, message: "Please enter the offer dates" } });
            return false;
        }
        if (this.state.vendor_id === "" || this.state.locationsSelected.length === 0 || this.state.subcategories.length === 0) {
            this.setState({ snackbar: { open: true, message: "Please enter the vendor / locations / subcategories" } });
            return false;
        }

        //POST the data
        let sourceUrl = location.hostname === 'localhost' ?
            'http://localhost:8080/api/offers/' :
            '/api/offers/';

        axios.post(sourceUrl, {
            name: this.state.name, desc: this.state.desc,
            offer_start: this.state.offer_start, offer_end: this.state.offer_end,
            vendor: { vendorid: this.state.vendor_id, name: this.state.vendor_name, logo: this.state.vendor_logo_url, },
            //location: { locationid: this.state.location_id, name: this.state.location_name, },
            locations: this.state.locationsSelected,
            categories:  this.state.categories,
            subcategories: this.state.subcategories,

        })
            .then(response => {
                console.log(response);
                history.back();
            })
            .catch(function (error) { // TODO error handling
                console.log(error);
            });
    }

    handleUpdate(event) {
        if (this.state.name === "" || this.state.desc === "") {
            this.setState({ snackbar: { open: true, message: "Please enter the offer title / desc" } });
            return false;
        }

        if (this.state.offer_start === "" || this.state.offer_end === "") {
            this.setState({ snackbar: { open: true, message: "Please enter the offer dates" } });
            return false;
        }
        if (this.state.vendor_id === "" || this.state.locationsSelected.length === 0 || this.state.subcategories.length === 0) {
            this.setState({ snackbar: { open: true, message: "Please enter the vendor / location /subcategories" } });
            return false;
        }

        //PUT the data
        let sourceUrl = location.hostname === 'localhost' ?
            'http://localhost:8080/api/offers/' + this.props.match.params.id :
            '/api/offers/' + this.props.match.params.id; //path based on environment (development/production)

        axios.put(sourceUrl, {
            name: this.state.name, desc: this.state.desc,
            offer_start: this.state.offer_start, offer_end: this.state.offer_end,
            vendor: { vendorid: this.state.vendor_id, name: this.state.vendor_name, logo: this.state.vendor_logo_url, },         
            locations: this.state.locationsSelected,
            categories:  this.state.categories,
            subcategories: this.state.subcategories,
        })
            .then(response => {
                console.log(response);
                history.back();
            })
            .catch(function (error) { // TODO error handling
                console.log(error);
            });

    }

    handleDelete(event) {
        let sourceUrl = location.hostname === 'localhost' ?
            'http://localhost:8080/api/offers/' + this.props.match.params.id :
            '/api/offers/' + this.props.match.params.id; //path based on environment (development/production)
        axios.delete(sourceUrl)
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

        const vendorItems = this.state.vendors.map((data, index) => {
            //console.log("index " + index);
            //console.log(data._id);
            return (
                <MenuItem value={data.name} key={data._id} primaryText={data.name} />
            )
        }, this);

        const tableRowsSubCategory = this.state.subcategoryList.map((data, index) => {
            //console.log("index " + index);
            return (
                <TableRow key={data._id} selected={true}>
                    <TableRowColumn>{data.parentCategory._id}</TableRowColumn>
                    <TableRowColumn><Link to={'/categories/' + data.parentCategory._id}>{data.parentCategory.name}</Link></TableRowColumn>

                    <TableRowColumn>{data._id}</TableRowColumn>
                    <TableRowColumn><Link to={'/subcategories/' + data._id}>{data.name}</Link></TableRowColumn>

                </TableRow>
            )
        }, this);

        const tableRowsLocations = this.state.locations.map((data, index) => {
            //console.log("index " + index);
            return (
                <TableRow key={data._id} selected={true}>
                    <TableRowColumn>{data._id}</TableRowColumn>
                    <TableRowColumn><Link to={'/locations/' + data._id}>{data.name}</Link></TableRowColumn>

                </TableRow>
            )
        }, this);


        return (
            <div id="sceneOfferAddEdit" style={styles.scene}>
                <div style={styles.contentWrapper}>
                    <form>
                        <TextField
                            id="offerName"
                            hintText="Offer Title"
                            value={this.state.name}
                            onChange={this.handleNameChange}
                        /><br />
                        <TextField
                            id="vendorDesc"
                            hintText="Description "
                            multiLine={true}
                            fullWidth={true}
                            rows={3}
                            rowsMax={7}
                            value={this.state.desc}
                            onChange={this.handleDescChange}
                        /><br />
                        <DatePicker hintText="Offer Start"
                            value={this.state.offer_start}
                            onChange={this.handleOfferStartChange}
                            autoOk={true}
                        /><br />
                        <DatePicker hintText="Offer Ends"
                            value={this.state.offer_end}
                            onChange={this.handleOfferEndChange}
                            autoOk={true}
                        /><br />
                        <SelectField
                            hintText="Vendor"
                            value={this.state.vendor_name}
                            onChange={this.handleVendorChange}
                            maxHeight={200}
                        >
                            {vendorItems}
                        </SelectField><br />

                    </form>

                    <div>
                        <Table onRowSelection={this.handleSubCategorySelect} multiSelectable={true}>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Category</TableHeaderColumn>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Sub Category</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody deselectOnClickaway={false}>
                                {tableRowsSubCategory}
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                        <Table onRowSelection={this.handleLocationSelect} multiSelectable={true}>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody deselectOnClickaway={false}>
                                {tableRowsLocations}
                            </TableBody>
                        </Table>
                    </div>


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
                                onTouchTap={this.handleDelete}
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

export default OfferAddEdit;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import 'font-awesome/css/font-awesome.min.css';
import authService from './api-authorization/AuthorizeService'

export class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    label: 'Action',
                    field: 'actionBy',
                    width: 100
                },
                {
                    label: 'Order Date',
                    field: 'orderDate',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Order Number',
                    field: 'orderNumber',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Cutomer Name',
                    field: 'cutomerName',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Address',
                    field: 'address',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Tracking Status',
                    field: 'trackingStatus',
                    width: 100
                },
                {

                    field: 'stockKeepingUnit',
                    label: 'Sku',
                    minWidth: 150,
                    align: 'center'
                },
                {
                    field: 'carrier',
                    label: 'Carrier',
                    minWidth: 100,
                    align: 'center'
                },
                {
                    field: 'trackingNumber',
                    label: 'TrackingNumber',
                    minWidth: 100,
                    align: 'center'
                },
                {
                    field: 'shipDate',
                    label: 'Ship Date',
                    minWidth: 100,
                    align: 'center'
                }
            ],
            rows: [],
            loading: true
        };
    }

    componentDidMount() {
        this.populateData();
    }

    async populateData() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/Order/GetAll', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const records = await response.json();
        if (records.success === true) {
            let theRows = [];
            records.data.forEach(item => {
                var obj = {
                    actionBy: <Link to={'/orderdetails/edit/' + item.id} className="btn btn-primary btn-sm" href="#"><span className="fa fa-pencil-square-o">&nbsp;Edit</span></Link>,
                    orderDate: item.orderDate,
                    orderNumber: item.orderNumber,
                    cutomerName: item.cutomerName,
                    address: item.address,
                    trackingStatus: item.trackingStatus,
                    stockKeepingUnit: item.stockKeepingUnit,
                    carrier: item.carrier,
                    trackingNumber: item.trackingNumber,
                    shipDate: item.shipDate
                };
                theRows.push(obj);
            });
            this.setState({ rows: theRows });
        }
    }

    render() {
        let data = {
            columns: this.state.columns,
            rows: this.state.rows
        };       
        return (
            <React.Fragment>
                <div className="card border-primary bg-light mb-10">
                    <div className="card-header">Order Listing</div>
                    <div className="card-body text-primary">
                        <MDBDataTable
                            bordered
                            hover
                            data={data}
                            entriesOptions={[5, 10, 15, 30, 50, 100]}
                            theadColor="table-background-head"
                            tbodyColor="table-background-body"
                            responsive
                            responsiveSm
                            responsiveMd
                            responsiveLg
                            responsiveXl
                        />
                    </div>
                </div>               
            </React.Fragment>
        );
    }
}

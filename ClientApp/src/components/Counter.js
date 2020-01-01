import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

export class Counter extends Component {
    static displayName = Counter.name;

    constructor(props) {
        super(props);
        this.state = {
            currentCount: 0,
            columns: [
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
                },
                {
                    label: 'Action',
                    field: 'actionBy',
                    width: 100
                }
            ],
            rows: []
        };
        this.incrementCounter = this.incrementCounter.bind(this);
    }

    componentDidMount() {
        //axios.get(this.props.BaseUrl() + 'api/OrderTest/GetAll')
        //    .then(response => {
        //        if (response.data.success === true) {
        //            this.setState({ rows: response.data.data });
        //        }
        //    });
        this.populateData();
    }

    async populateData() {
        const response = await fetch('api/OrderTest/GetAll');
        const records = await response.json();
        console.log(records);
        //this.setState({ rows: records.data});
        if (records.success === true) {
            let theRows = [];
            records.data.forEach(item => {
                var obj = {
                    orderDate: item.orderDate,
                    orderNumber: item.orderNumber,
                    cutomerName: item.cutomerName,
                    address: item.address,
                    trackingStatus: item.trackingStatus,
                    stockKeepingUnit: item.stockKeepingUnit,
                    carrier: item.carrier,
                    trackingNumber: item.trackingNumber,
                    shipDate: item.shipDate,
                    actionBy: <Link to={'/orderdetails/edit/' + item.id} className="link" href="#"><span className="fa fa-pencil-square-o">&nbsp;Edit</span></Link>
                };
                theRows.push(obj);
            });
            this.setState({ rows: theRows });
        }
    }
    
    incrementCounter() {
        this.setState({
            currentCount: this.state.currentCount + 1
        });
    }

    render() {
        let data = {
            columns: this.state.columns,
            rows: this.state.rows
        };

        return (
            <React.Fragment>
                <fieldset>
                    <legend>
                       Counter
                    </legend>
                </fieldset>
                <div className="row">
                    <div className="col-md-12">
                        <p>This is a simple example of a React component.</p>
                        <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>
                        <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
                    </div>
                </div>  
                <div className="row">
                    <div className="col-md-12">
                        <MDBDataTable
                            striped
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

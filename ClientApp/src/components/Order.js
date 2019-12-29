import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authService from './api-authorization/AuthorizeService'

export class Order extends Component {
    constructor(props) {
        super(props);
        this.state = { orders: [], loading: true };
    }

    componentDidMount() {
        this.populateOrderData();
    }

    async populateOrderData() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/Order/GetAll', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const records = await response.json();
        console.log(records.data);
        this.setState({ orders: records.data, loading: false });
    }

    static renderOrderTable(orders) {
        return (
            orders.map((item, index) => {
                return (<tr key={index + 1}>
                    <td className="align-middle" style={{ width: '10%' }}>
                        <Link to={'/management/clientdetails/' + item.id} className="btn btn-primary btn-sm" href="#"><span className="glyphicon glyphicon-edit" aria-hidden="true"></span>&nbsp;Edit</Link>
                    </td>
                    <td className="align-middle">{item.orderDate}</td>
                    <td className="align-middle">{item.orderNumber}</td>
                    <td className="align-middle">{item.cutomerName}</td>
                    <td className="align-middle">{item.address}</td>
                    <td className="align-middle">{item.trackingStatus}</td>
                    <td className="align-middle">{item.stockKeepingUnit}</td>
                    <td className="align-middle">{item.carrier}</td>
                    <td className="align-middle">{item.trackingNumber}</td>
                    <td className="align-middle">{item.shipDate}</td>
                </tr>);
            })
        );
    }

    render() {
        let contents = this.state.loading
            ? <tr><td colSpan="10" className="text-center text-success"><p><em>Loading...</em></p></td></tr>
            : Order.renderOrderTable(this.state.orders);

        return (
            <React.Fragment>
                <fieldset>
                    <legend>
                        Order Listing
                    </legend>
                </fieldset>
                <div className="row">
                    <div className="col-md-12">
                        <table className='table table-bordered table-responsive font-size-12' aria-labelledby="tabelLabel">
                            <thead>
                                <tr>
                                    <th className="text-nowrap"></th>
                                    <th className="text-nowrap">Order Date</th>
                                    <th className="text-nowrap">Order Number</th>
                                    <th className="text-nowrap">Cutomer Name</th>
                                    <th className="text-nowrap">Address</th>
                                    <th className="text-nowrap">Tracking Status</th>
                                    <th className="text-nowrap">Stock Keeping Unit</th>
                                    <th className="text-nowrap">Carrier</th>
                                    <th className="text-nowrap">Tracking Number</th>
                                    <th className="text-nowrap">Ship Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contents}
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

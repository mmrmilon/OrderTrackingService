import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'

export class Order extends Component {
    static displayName = Order.name;

    constructor(props) {
        super(props);
        this.state = { orders: [], loading: true };
    }

    componentDidMount() {
        this.populateOrderData();
    }

    static renderOrderTable(orders) {
        return (
            <table className='table table-bordered table-responsive' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Order Date</th>
                        <th>Order Number</th>
                        <th>Cutomer Name</th>
                        <th>Address</th>
                        <th>Tracking Status</th>
                        <th>Stock Keeping Unit</th>
                        <th>Carrier</th>
                        <th>Tracking Number</th>
                        <th>Ship Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(item =>
                        <tr key={item.UniqueKey}>
                            <td>{item.OrderDate}</td>
                            <td>{item.OrderNumber}</td>
                            <td>{item.CutomerName}</td>
                            <td>{item.Address}</td>
                            <td>{item.TrackingStatus}</td>
                            <td>{item.StockKeepingUnit}</td>
                            <td>{item.Carrier}</td>
                            <td>{item.TrackingNumber}</td>
                            <td>{item.ShipDate}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Order.renderOrderTable(this.state.orders);

        return (
            <div>
                <h1 id="tabelLabel" >Order Listing</h1>
                {contents}
            </div>
        );
    }

    async populateOrderData() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/Order/GetAll', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();

        this.setState({ orders: data, loading: false });
    }
}

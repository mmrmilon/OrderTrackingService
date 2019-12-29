import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import authService from './api-authorization/AuthorizeService'

export class OrderEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderdetails: {}, loading: true
        };
    }

    componentDidMount() {
        const param = this.props.match.params;
        console.log(param.id);
        this.populateOrderData(param.id);
    }

    async populateOrderData(orderId) {
        const token = await authService.getAccessToken();
        const response = await fetch('api/Order/GetBy/' + orderId, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        console.log(data);
        this.setState({ orderdetails: data, loading: false });
    }

    static renderFormWithData(data) {
        return (<form>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputCutomerName">Cutomer Name</label>
                    <input type="text" className="form-control" id="inputCutomerName" value={data.cutomerName} placeholder="Cutomer Name" readOnly />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputOrderNumber">Order Number</label>
                    <input type="text" className="form-control" id="inputOrderNumber" value={data.orderNumber} placeholder="Order Number" readOnly />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="inputAddress">Address</label>
                <input type="text" className="form-control" id="inputAddress" value={data.address} placeholder="1234 Main St" readOnly />
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputStockKeepingUnit">Stock Keeping Unit</label>
                    <input type="text" className="form-control" value={data.stockKeepingUnit} id="inputStockKeepingUnit || ''" readOnly />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="inputTrackingNumber">Tracking Number</label>
                    <input type="text" className="form-control" id="inputTrackingNumber" value={data.trackingNumber || ''} readOnly />
                </div>
                <div className="form-group col-md-2">
                    <label htmlFor="inputTrackingStatus">Tracking Status</label>
                    <input type="text" className="form-control" id="inputTrackingStatus" value={data.trackingStatus || ''} readOnly />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputOrderDate">Order Date</label>
                    <input type="text" className="form-control" value={data.orderDate} id="inputOrderDate || ''" readOnly />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="inputShipDate">Ship Date</label>
                    <input type="text" className="form-control" id="inputShipDate" value={data.shipDate || ''} readOnly />
                </div>
                <div className="form-group col-md-2">
                    <label htmlFor="inputCarrier">Carrier</label>
                    <input type="text" className="form-control" id="inputCarrier" value={data.carrier || ''} readOnly />
                </div>
            </div>
            <div className="form-group">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="gridCheck" readOnly />
                    <label className="form-check-label" htmlFor="gridCheck">
                        Shipped
                    </label>
                </div>
            </div>
            <hr />
            <button type="submit" className="btn btn-primary text-uppercase"><i className="fa fa-save"></i>&nbsp;Update</button>&nbsp;&nbsp;
            <Link to={'/order'} className="btn btn-danger text-uppercase" href="#"><i className="fa fa-window-close-o"></i>&nbsp;Cancel</Link>
        </form>);
    }

    render() {
        let contents = this.state.loading
            ? <p className="text-center text-success"><em>Loading...</em></p>
            : OrderEdit.renderFormWithData(this.state.orderdetails);

        return (
            <React.Fragment>
                <fieldset>
                    <legend>
                        Order Details
                    </legend>
                </fieldset>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        {contents}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

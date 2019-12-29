import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'

export class SyncData extends Component {
    constructor(props) {
        super(props);
        this.state = { syncresult: [], loading: true };
    }

    componentDidMount() {
        this.syncSpreadsheetData();
    }

    async syncSpreadsheetData() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/Spreadsheet/SyncToDb', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        //console.log(data);
        this.setState({ syncresult: data, loading: false });
    }

    static renderOrderTable(syncresult) {
        return (<tbody>
            <tr key="1">
                <td className="align-middle">Total Fetch</td>
                <td className="align-middle">{syncresult.totalFetch - 1}</td>
            </tr>
            <tr key="2">
                <td className="align-middle">Total Sync</td>
                <td className="align-middle">{syncresult.totalSync}</td>
            </tr>
            <tr key="3">
                <td className="align-middle">Status</td>
                <td className="align-middle">{syncresult.status}</td>
            </tr>
            <tr key="4">
                <td className="align-middle">Message</td>
                <td className="align-middle">{syncresult.errorMessage}</td>
            </tr>
        </tbody>);
    }

    render() {
        let contents = this.state.loading
            ? <tbody><tr><td colSpan="2" className="text-center text-success"><p><em>Processing...</em></p></td></tr></tbody>
            : SyncData.renderOrderTable(this.state.syncresult);

        return (
            <React.Fragment>
                <fieldset>
                    <legend>
                        Sync Spreadsheet Data
                    </legend>
                </fieldset>
                <div className="row">
                    <div className="col-md-12">
                        <table className='table table-bordered' aria-labelledby="tabelLabel">
                            <thead>
                                <tr>
                                    <th className="text-nowrap">Title</th>
                                    <th className="text-nowrap">Result</th>
                                </tr>
                            </thead>
                            {contents}
                        </table>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

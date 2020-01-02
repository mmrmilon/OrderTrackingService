import React, { Component } from 'react';
import Chart from "chart.js";

export class Home extends Component {
    static displayName = Home.name;
    chartRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            chartData: [
                { data: [65, 59, 80, 81, 56, 55], label: 'Received' },
                { data: [28, 48, 40, 19, 86, 27], label: 'Scanned' },
                { data: [18, 48, 77, 9, 100, 37], label: 'Shipped' },
                { data: [40, 28, 70, 40, 85, 27], label: 'Delivered' }
            ],
            chartLabels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            data: {},
            notifications: [
                {
                    "id": 1,
                    "date": "10:29 PM on Sunday, 28th May 2019",
                    "notification": "20 new 'BMW M6' were added to your stock by 'administrator' on 5/28/2019 4:54:13 PM"
                },
                {
                    "id": 2,
                    "date": "5:13 PM on Tuesday, 30th May 2019",
                    "notification": "Guys, tomorrow we close by midday. Please check in your sales before noon. Thanx. Alex."
                },
                {
                    "id": 3,
                    "date": "1:54 AM on Monday, 29th May 2019",
                    "notification": "You are running low on 'Nissan Patrol'. 2 Items remaining"
                }
            ]
        };
    }

    componentDidMount() {
        this.setState({
            data: {
                labels: this.state.chartLabels,
                datasets: [
                    {
                        label: 'My First dataset',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: [65, 59, 80, 81, 56, 55]
                    }
                ]
            }
        });

        const myChartRef = this.chartRef.current.getContext("2d");

        new Chart(myChartRef, {
            type: "line",
            data: {
                labels: this.state.chartLabels,
                datasets: [
                    {
                        label: "Received",
                        backgroundColor: 'rgba(189,183,107,0.2)',
                        borderColor: 'rgba(189,183,107,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(148,159,177,0.8)',
                        hoverBorderColor: 'rgba(148,159,177,0.8)',
                        data: [65, 59, 80, 81, 56, 55]
                    },
                    {
                        label: "Scanned",
                        backgroundColor: 'rgba(128,128,0,0.2)',
                        borderColor: 'rgba(128,128,0,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(77,83,96,1)',
                        hoverBorderColor: 'rgba(77,83,96,1)',
                        data: [28, 48, 40, 19, 86, 27]
                    },
                    {
                        label: "Shipped",
                        backgroundColor: 'rgba(102,205,170,0.2)',
                        borderColor: 'rgba(102,205,170,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(128,128,128,0.8)',
                        hoverBorderColor: 'rgba(128,128,128,0.8)',
                        data: [18, 48, 77, 9, 100, 37]
                    },
                    {
                        label: "Delivered",
                        backgroundColor: 'rgba(0,128,0,0.2)',
                        borderColor: 'rgba(0,128,0,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(64,64,64,0.8)',
                        hoverBorderColor: 'rgba(64,64,64,0.8)',
                        data: [40, 28, 70, 40, 85, 27]
                    }
                ]
            },
            options: {
                //Customize chart options
            }
        });
    }
    
    render() {
        return (
            <React.Fragment>
                <h3><i className="fa fa-dashboard">&nbsp;Dashboard</i></h3>
                <div class="card mb-3 bg-light">
                    <div class="card-body text-primary">
                        <div className="row">
                            <div className="col-md-6">
                                <canvas
                                    id="myChart"
                                    ref={this.chartRef}
                                />
                            </div>
                            <div className="col-md-6">
                                <table class="table table-sm">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0"></th>
                                            {this.state.chartLabels.map(item =>
                                                <th class="border-top-0">{item}</th>
                                             )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.chartData.map(row =>
                                            <tr key={row.label}>
                                                <td>{row.label}</td>
                                                {row.data.map(innerItem =>
                                                    <td>{innerItem}</td>
                                                )}
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mb-10 mr-b-10">
                    <div class="col-md-12">
                        <table class="table table-sm font-size-12">
                            <thead className="bg-color-1">
                                <tr>
                                    <th class="border-top-0"><i className="fa fa-bullhorn text-white"></i></th>
                                    <th class="border-top-0">Date</th>
                                    <th class="border-top-0">Notification</th>
                                    <th class="border-top-0"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.notifications.map(row =>
                                    <tr key={row.id}>
                                        <td class="border-top-0"></td>
                                        <td className="border-top-0 text-left">{row.date}</td>
                                        <td className="border-top-0 text-left">{row.notification}</td>
                                        <td className="border-top-0 text-center"><i className="fa fa-thumb-tack"></i></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <hr />
                        <p className="text-muted">3 Total</p>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

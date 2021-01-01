import React, { Component } from 'react';
import axios from 'axios'
import ClipLoader from 'react-spinners/ClipLoader';
import 'font-awesome/css/font-awesome.min.css';
import AddModal from './AddModel';
const override = {


}
class DataTable extends Component {

    constructor(prop) {
        super(prop);
        this.state = {
            employee: [],
            from: '',
            per_page: '',
            last_page: '',
            current_page: '',
            next_page_url: '',
            first_page_url: '',
            last_page_url: '',
            prev_page_url: '',
            searchQuery: '',
            test_type: '',
            sortColumn: '',
            sortOrder: '',
            loading: true
        };
        this.pagination = this.pagination.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.sortTable = this.sortTable.bind(this);

    }
    componentWillReceiveProps(nextProps, nextState) {
        console.log(nextProps, nextState);

    }
    componentWillMount() {
    }
    componentWillUnmount() {
    }
    componentDidMount() {
        let url = 'http://127.0.0.1:8000/api/allemployee';
        this.getCallApi(url);
    }

    getCallApi(url) {

        axios.get(url)
            .then(json => {

                let response = json.data;
                let data = response.data;

                this.setState({
                    employee: data,
                    from: response.from,
                    per_page: response.per_page,
                    last_page: response.last_page,
                    current_page: response.current_page,
                    next_page_url: response.next_page_url,
                    first_page_url: response.first_page_url,
                    last_page_url: response.last_page_url,
                    prev_page_url: response.prev_page_url,
                    path: response.path,
                    loading: false
                });

            });
    }

    pagination(target, e, i = null) {
        e.preventDefault();
        this.setState({
            loading: true
        });
        let url;
        switch (target) {
            case 'pre':
                if (this.state.prev_page_url != null) {
                    this.getCallApi(this.state.prev_page_url);
                }
                break;
            case 'next':
                if (this.state.next_page_url != null) {
                    this.getCallApi(this.state.next_page_url);
                }
                break;
            case 'btn-click':
                url = this.state.path + '?page=' + i;
                this.getCallApi(url);
                break;

        }
        this.setState({
            loading: false
        });
    }

    sortTable(key, e) {
        e.preventDefault();
        this.state.sortColumn = key;
        this.state.sortOrder = this.state.sortOrder == '' || this.state.sortOrder == 'asc' ? 'desc' : 'asc';
        let url = 'http://127.0.0.1:8000/api/allemployee?sortOrder=' + this.state.sortOrder;
        this.getCallApi(url);
    }

    keyPress(e) {
        
            this.setState({
                loading: true
            });
            this.setState({
                searchQuery: e.target.value
            });

            let url = 'http://127.0.0.1:8000/api/allemployee?searchQuery=' + e.target.value;
            this.getCallApi(url);

            this.setState({
                loading: false
            });
        
    }

    render() {
        let table_row;

        if (this.state.employee.length > 0) {
            let tr;
            table_row = this.state.employee.map((data, index) => {

                return <tr key={index}>
                    <td>{data.id}</td>
                    <td>{data.emp_name}</td>
                    <td>{data.team_lead}</td>
                    <td>{data.last_login}</td>
                    <td>{data.user_id}</td>
                    <td>{data.status}</td>
                    <td>{data.role}</td>
                    <td><i className="fa fa-edit"></i>&nbsp;&nbsp;<i className="fa fa-key"></i>&nbsp;&nbsp;
                    <i className="fa fa-ban"></i></td>
                </tr>;

            });
        } else {
            table_row = null
        }

        let rows = [];
        for (let i = 1; i <= this.state.last_page; i++) {
            rows.push(<li className="page-item" key={i}><a className="page-link" href="#" onClick={(e) => this.pagination('btn-click', e, i)}>{i}</a></li>);
        }

        return (

            <div className="page-wrapper">

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="card card-default">
                                <div className="card-header">
                                    <div className="card-actions">
                                        <a className="" data-action="collapse"><i className="ti-minus"></i></a>
                                    </div>
                                    <h4 className="card-title m-b-0">Employees List</h4>
                                </div>
                                <div className="card-body collapse show">
                                    <div className="d-flex no-block">
                                    <AddModal />
                                        <div className="ml-auto" style={{ 'display': 'inherit' }}>
                                            <input type="text" name={"search"} placeholder='Search'
                                            onKeyDown={(e) => { this.keyPress(e) }} className="form-control" />
                                        </div>
                                    </div><br></br>

                                    <div className="table-responsive">

                                        {!this.state.loading ?
                                            <div>
                                                <table className="table product-overview">
                                                    <thead>
                                                        <tr>
                                                            <th>Sr.</th>
                                                            <th onClick={(e) => { this.sortTable('emp_name', e) }}>Employee Name</th>
                                                            <th>Team Lead</th>
                                                            <th>Last Login</th>
                                                            <th onClick={(e) => { this.sortTable('user_id', e) }}>User id</th>
                                                            <th>Status</th>
                                                            <th>Role</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>

                                                        {table_row}

                                                    </tbody>
                                                </table>

                                                <div className="dataTables_paginate paging_simple_numbers" id="example23_paginate">
                                                    <ul className="pagination justify-content-end">
                                                        <li className="page-item"><a className="page-link" href="#" onClick={(e) => this.pagination('pre', e)}>Previous</a></li>
                                                        {rows}
                                                        <li className="page-item"><a className="page-link" href="#" onClick={(e) => this.pagination('next', e)}>Next</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            :
                                            <div className='sweet-loading' style={{ 'textAlign': 'center' }}>
                                                <ClipLoader
                                                    className={override}
                                                    sizeUnit={"px"}
                                                    size={50}
                                                    color={'#123abc'}
                                                    loading={this.state.loading}
                                                />
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default DataTable;
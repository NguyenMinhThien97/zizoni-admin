import React, { Component } from 'react';
import AccountList from './../../component/AccountList/AccountList';
import AccountItem from './../../component/AccountItem/AccountItem';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAccRequest, deleteAccRequest } from './../../actions/index';

class Account extends Component {

    componentDidMount() {
        this.props.fetchAllAccount();
    }

    onDelete = (id) => {
        this.props.onDeleteAccount(id);
    }

    render() {
        var { accounts } = this.props;
        return (
            <div className="all-content-wrapper">
                <div className="product-status mg-tb-15">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="product-status-wrap">
                                    <h4>Danh Sách Tài Khoản</h4>
                                    <div className="add-product">
                                        <Link to='/admin/account/add'>Tạo tài khoản mới</Link>
                                    </div>
                                    <AccountList>
                                        {this.showaccount(accounts)}
                                    </AccountList>
                                    <div className="custom-pagination">
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">
                                        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                        </ul>
                                    </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    showaccount(accounts) {
        var result = null;
        if (accounts.length > 0) {
            result = accounts.map((account, index) => {
                return (
                    <AccountItem
                        key={index}
                        account={account}
                        index={index}
                        onDelete={this.onDelete}
                    />
                );
            });
        }
        return result;
    }

}

const mapStateToProps = state => {
    return {
        accounts: state.accounts
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllAccount : () => {
            dispatch(fetchAccRequest());
        },
        onDeleteAccount : (id) => {
            dispatch(deleteAccRequest(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);

import React, { Component } from 'react';
import OrderList from './../../component/OrderList/OrderList';
import OrderItem from './../../component/OrderItem/OrderItem';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actFetchOrderRequest, actDeleteOrderRequest } from './../../actions/index';

class Order extends Component {

    componentDidMount() {
        this.props.fetchAllOrder();
    }

    onDelete = (id) => {
        this.props.onDeleteOrder(id);
    }

    render() {
        var { order } = this.props;
        return (
            <div className="all-content-wrapper">
                <div className="product-status mg-tb-15">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="product-status-wrap">
                                    <h4>Danh Sách Đơn Hàng</h4>
                                    <div className="add-product">
                                        <Link to='/admin/order/add'>Tạo Đơn Hàng Mới</Link>
                                    </div>
                                    <OrderList>
                                        {this.showOrder(order)}
                                    </OrderList>
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

    showOrder(order) {
        var result = null;
        if (order.length > 0) {
            result = order.map((order, index) => {
                return (
                    <OrderItem
                        key={index}
                        order={order}
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
        order: state.order
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllOrder : () => {
            dispatch(actFetchOrderRequest());
        },
        onDeleteOrder : (id) => {
            dispatch(actDeleteOrderRequest(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);

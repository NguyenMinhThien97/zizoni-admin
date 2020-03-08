import React, { Component } from 'react';

class OrderList extends Component {
    render() {
        return (
            <table>
                <tbody><tr>
                    <th>Sản phẩm</th>
                    <th>Tên Khách Hàng</th>
                    <th>Số điện thoại</th>
                    <th>Địa chỉ</th>
                    <th>Tổng tiền</th>
                    <th>Ngày mua</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                    </tr>
                        {this.props.children}
                </tbody>
            </table>
        );
    }
}

export default OrderList;

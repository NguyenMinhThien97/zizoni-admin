import React, { Component } from 'react';

class AccountList extends Component {
    render() {
        return (
            <table>
                <tbody><tr>
                    <th>Mã KH</th>
                    <th>Tên khách hàng</th>
                    <th>Tổng số tiền đã mua</th>
                    <th>Số điện thoại</th>
                    <th>Địa chỉ</th>
                    <th>Thao tác</th>
                    </tr>
                        {this.props.children}
                </tbody>
            </table>
        );
    }
}

export default AccountList;

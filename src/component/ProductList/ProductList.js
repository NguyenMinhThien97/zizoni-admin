import React, { Component } from 'react';

class ProductList extends Component {
    render() {
        return (
            <table>
                <tbody><tr>
                    <th>Hình</th>
                    <th>Tên sản phẩm</th>
                    <th>Danh mục</th>
                    <th>Giá</th>
                    <th>Giảm giá</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                    </tr>
                        {this.props.children}
                </tbody>
            </table>
        );
    }
}

export default ProductList;

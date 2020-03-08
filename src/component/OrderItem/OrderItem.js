import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class OrderItem extends Component {

    onDelete = (id) => {
        if (window.confirm('Bạn chắc chắn muốn xóa ?')) { 
            this.props.onDelete(id);
        }
    }

    render() {
        var { order } = this.props;
        var statusName = order.payment  == 'Thanh toán khi nhận hàng' ? 'COD' : order.payment ;
        var statusClass = order.payment == 'Thanh toán khi nhận hàng' ? 'default' : 'warning';
        return (
            <tr>
                <td>Thêm Sau</td>
                <td>{order.user_name}</td>
                <td>{order.user_phone}</td>
                <td>{order.user_address}</td>
                <td>{this.format_money(order)} ₫</td>
                <td>{order.created}</td>

                <td>
                    <span className={`label label-${statusClass}`}>
                        {statusName}
                    </span>
                    <p>{order.message}</p>
                </td>
                <td>
                    <Link to={`/admin/order/${order.id}/edit`}>
                    <button data-toggle="tooltip" title="Sửa" className="pd-setting-ed">
                    <i className="fa fa-pencil-square-o" aria-hidden="true" />
                    </button>
                    </Link>
                    <button
                        data-toggle="tooltip" 
                        title="Xóa" 
                        className="pd-setting-ed"
                        onClick={() => this.onDelete(order.id)}
                    >
                    <i className="fa fa-trash-o" aria-hidden="true" />
                    </button>
                    <button type="button" className="btn btn-custon-four btn-success">
                        <i className="fa fa-check adminpro-checked-pro" aria-hidden="true" /> 
                         Xác nhận đã giao
                    </button>
                </td>
            </tr>
        );
    }
    format_money(order){
        var v = Number(order.amount);
        if (isNaN(v)) 
            { 
                return order.amount; 
            }
        var sign = (v < 0) ? '-' : '';
        var res = Math.abs(v).toString().split('').reverse().join('').replace(/(\d{3}(?!$))/g, '$1,').split('').reverse().join('');
        return sign + res;
    }
}

export default OrderItem;

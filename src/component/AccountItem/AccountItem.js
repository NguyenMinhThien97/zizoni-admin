import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductItem extends Component {

    onDelete = (id) => {
        if (window.confirm('Bạn chắc chắn muốn xóa ?')) { //eslint-disable-line
            this.props.onDelete(id);
        }
    }

    render() {
        var { account } = this.props;
        return (
            <tr>
                <td>{account.id}</td>
                <td>{account.name}</td>
                <td>0</td>
                <td>{account.phone}</td>
                <td>{account.address}</td>
                <td>
                    <Link to={`/admin/account/${account.id}/edit`}>
                    <button data-toggle="tooltip" title="Sửa" className="pd-setting-ed">
                    <i className="fa fa-pencil-square-o" aria-hidden="true" />
                    </button>
                    </Link>
                    <button
                        data-toggle="tooltip" 
                        title="Xóa" 
                        className="pd-setting-ed"
                        onClick={() => this.onDelete(account.id)}
                    >
                    <i className="fa fa-trash-o" aria-hidden="true" />
                    </button>
                </td>
            </tr>
        );
    }
}

export default ProductItem;

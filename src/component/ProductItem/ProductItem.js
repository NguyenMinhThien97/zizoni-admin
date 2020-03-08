import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductItem extends Component {


    onDelete = (id) => {
        if (window.confirm('Bạn chắc chắn muốn xóa ?')) { //eslint-disable-line
            this.props.onDelete(id);
        }
    }

    render() {
        var { product } = this.props;
        var statusName = product.status ? 'Còn Hàng' : 'Hết Hàng';
        var statusClass = product.status ? 'warning' : 'default';
        return (
            <tr>
                <td><img src={product.image_link} alt="IMG-PRODUCT" /></td>
                <td>{product.name}</td>
                <td>{this.showCatalog(product.catalogID)}</td>
                <td>{this.format_money(product)} ₫</td>
                <td>{product.discount}</td>

                <td>
                    <span className={`label label-${statusClass}`}>
                        {statusName}
                    </span>
                </td>
                <td>
                    <Link to={`/admin/product/${product.id}/edit`}>
                        <button data-toggle="tooltip" title="Sửa" className="pd-setting-ed">
                            <i className="fa fa-pencil-square-o" aria-hidden="true" />
                        </button>
                    </Link>
                    <button
                        data-toggle="tooltip"
                        title="Xóa"
                        className="pd-setting-ed"
                        onClick={() => this.onDelete(product.id)}
                    >
                        <i className="fa fa-trash-o" aria-hidden="true" />
                    </button>
                </td>
            </tr>
        );
    }
    format_money(product) {
        var v = Number(product.price);
        if (isNaN(v)) {
            return product.price;
        }
        var sign = (v < 0) ? '-' : '';
        var res = Math.abs(v).toString().split('').reverse().join('').replace(/(\d{3}(?!$))/g, '$1,').split('').reverse().join('');
        return sign + res;
    };
    showCatalog(catalogID) {
        switch (catalogID) {
            case 1:
                return "Quần dài";
            case 2:
                return "Quần short";
            case 3:
                return "Áo sơ mi";
            case 4:
                return "Áo thun";
            case 5:
                return "Áo khoác";
            default:
                return "Không xác định";
        }
    }
}

export default ProductItem;

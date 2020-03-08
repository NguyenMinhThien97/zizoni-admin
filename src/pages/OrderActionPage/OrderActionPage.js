import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { actAddOrderRequest , actGetOrderRequest , actUpdateOrderRequest , actGetProductNameRequest , actGetColorRequest , actGetSizeRequest } from './../../actions/index';
import { connect } from 'react-redux';
import Select from 'react-select';

class OrderActionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtAddress: '',
            txtPhone: '',
            selectPayment: '',
            selectedProduct: '',
            selectedColor: '',
            txtSize: '',
            txtQuantity: '',

        };
        this.displayData1 = [];
        this.displayData2 = [];
        this.productNumber = 1;
        // this.selectedColor = [];
        this.quantity = null;

      this.state = {
        showdata : this.displayData1,
        showdata : this.displayData2,
      }

      this.onAddForm = this.onAddForm.bind(this);
    }

    componentDidMount() {
        this.props.getProductsName();
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            this.props.onEditOrder(id);
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.itemEditing){
            var {itemEditing} = nextProps;
            this.setState({
                id : itemEditing.id,
                txtName : itemEditing.user_name,
                txtAddress : itemEditing.user_address,
                txtPhone:  itemEditing.user_phone,
                selectPayment :itemEditing.payment,
            });
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    onSave = (e) => {
        e.preventDefault();
        var { id, txtName , txtAddress , txtPhone , selectPayment } = this.state;
        var { history } = this.props;
        var order = {
            id : id,
            amount: 0,
            created : new Date(),
            message : '',
            payment: selectPayment,
            status : 'false',
            user_name : txtName,
            user_address : txtAddress,
            user_phone : txtPhone,
        };
        if (id) {
            this.props.onUpdateOrder(order);
        } else {
            this.props.onAddOrder(order);
        }
        history.goBack();
    }

    onAddForm = () => {
        var { selectedProduct , selectedColor , txtSize, txtQuantity } = this.state;
        // var selectedColor = [];
        // var selectedSize = [];
        // var selectedQuantity = [];
        if(this.productNumber){
            var productID = "product_" + this.productNumber;
            var detailID = "detail_" + this.productNumber;
            // var product = "product" + this.productNumber;
            // var color = "color" + this.productNumber;
            // var size = "size" + this.productNumber;
            this.displayData1.push(<div id={productID} className="input-group mg-b-pro-edt"><span className="input-group-addon"><i className="fa fa-ticket" aria-hidden="true" /></span><Select type="text"  options={this.onGetProductsName()} value={selectedProduct} onChange={this.changeProductName.bind(this)} name="txtProductName" placeholder="Sản Phẩm" /></div>);
            this.displayData2.push(
                <div id={detailID} className="input-group mg-b-pro-edt">
                    <span className="input-group-addon"><i className="fa fa-ticket" aria-hidden="true" /></span>
                    <Select type="text" options={this.onGetColor()} value={selectedColor} onChange={this.changeColor.bind(this)}  name="txtColor" placeholder="Màu"/>
                    <span className="input-group-addon"><i className="fa fa-ticket" aria-hidden="true" /></span>
                    <Select type="text"
                            name="txtSize"
                            options={this.onGetSize()}
                            value={txtSize}
                            onChange={this.changeSize.bind(this)}
                            placeholder="Size">
                    </Select>
                    <span className="input-group-addon"><i className="fa fa-ticket" aria-hidden="true" /></span>
                    <Select type="text" options={this.selectedQuantity} value={txtQuantity} onChange={this.changeQuantity.bind(this)} name="txtQuantity" placeholder="Số lượng" />
                    <span className="input-group-addon"> 
                        <button id={this.productNumber} type="button" data-toggle="tooltip" title="Xóa" onClick={ this.onRemoveForm }>
                        <i className="fa fa-trash-o" aria-hidden="true" />
                        </button>
                    </span>
                </div>
            );
            this.setState({
                showdata : this.children,
            });
            this.productNumber ++ ;
        }else{
            alert("Chức năng thêm đang gặp lỗi vui lòng thử lại!")
        }
    }
    onRemoveForm = (e) => {
        var id= e.target.id;
        var productID = "product_" + id;
        var detailID = "detail_" + id;
        var fieldsLeft = document.getElementById(productID);
        var fieldsRight = document.getElementById(detailID);
        if(fieldsLeft && fieldsRight){
            fieldsLeft.remove();
            fieldsRight.remove();
        }else{
            alert("Chức năng xóa đang gặp lỗi vui lòng thử lại!")
        }
    }
    onGetProductsName = () => {
        var optionsProductName = [];
        var {productsName} = this.props;
        if(productsName.length > 0){
            for (let i = 0; i < productsName.length; i++) {
                let options = { label: productsName[i].name, value: productsName[i].id };
                optionsProductName.push(options);
            }
        }
        return optionsProductName;
    }

    onGetColor = () => {
        var optionsColor = [];
        var {color} = this.props;
        if(color.length > 0){
            for (let i = 0; i < color.length; i++) {
                var options = { label: color[i].name, value: color[i].id };
                optionsColor.push(options);
            }
 
        }
        return optionsColor;
    }

    onGetSize = () => {
        var optionsColor = [];
        var {size} = this.props;
        if(size.length > 0){
            for (let j = 0; j < size.length; j++) {
                var options = { label: size[j].name, value: size[j].id, quantity: size[j].quantity };
                optionsColor.push(options);
            }
        }
        return optionsColor;
    }
    
    changeProductName = (selectedProduct) => {
        this.setState({ selectedProduct });
        if (selectedProduct) {
            var productID = selectedProduct.value;
            this.props.getColor(productID);
        }
    }
    changeColor = (selectedColor) => {
        this.setState({ selectedColor });
        if (selectedColor) {
            var ColorID = selectedColor.value;
            this.props.getSize(ColorID);
        }
    }
    changeSize = (selectedSize) => {
        this.setState({ selectedSize });
        if (selectedSize) {
            var size = selectedSize.label;
            this.quantity = selectedSize.quantity;
        }
    }
    changeQuantity = (selectedQuantity) => {
        this.setState({ selectedQuantity });
        if (selectedQuantity) {
            var quantity = selectedQuantity.label;
        }
    }
    render() {
        var { id, txtName , txtAddress , txtPhone , selectPayment , selectedProduct , txtColor , txtSize, txtQuantity } = this.state;
        var {color , size } = this.props;
        // var selectedColor = [];
        var selectedSize = [];
        var selectedQuantity = [];
        // if(color.length > 0){
        //     for (let i = 0; i < color.length; i++) {
        //         var optionsColor = { label: color[i].name, value: color[i].id };
        //         selectedColor.push(optionsColor);
        //     }
 
        // }
        if(size.length > 0){
            for (let j = 0; j < size.length; j++) {
                var optionsSize = { label: size[j].name, value: size[j].id, quantity: size[j].quantity };
                selectedSize.push(optionsSize);
            }
            var quantityOfProduct = parseInt(this.quantity)
            if(quantityOfProduct > 0){
                console.log(quantityOfProduct);
                for (let index = 1; index <= quantityOfProduct; index++) {
                    var optionsQuantity = { label: index, value: index };
                    selectedQuantity.push(optionsQuantity);
                }
            }
        }

        return (
            <div className="all-content-wrapper">
            <div className="single-product-tab-area mg-tb-15">
            <div className="single-pro-review-area">
                <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="review-tab-pro-inner">
                    <ul id="myTab3" className="tab-review-design">
                    <li className="active"><a >
                        <i className="fa fa-pencil" aria-hidden="true" /> Quản lý đơn hàng</a>
                    </li>
                    </ul>

                <div id="myTabContent" className="tab-content custom-product-edit">
                <div className="product-tab-list tab-pane fade active in" id="description">
                <form onSubmit={this.onSave}>
                {/* <div className="row"> */}
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="review-content-section">
                        <div className="input-group mg-b-pro-edt">
                        <span className="input-group-addon"><i className="fa fa-user" aria-hidden="true" /></span>
                        <input type="text" value={txtName} onChange={this.onChange} name="txtName" className="form-control" placeholder="Tên khách hàng" />
                        </div>
                        <div className="input-group mg-b-pro-edt">
                            <span className="input-group-addon"><i className="fa fa-pencil " aria-hidden="true" /></span>
                            <input type="text" value={txtAddress} onChange={this.onChange} name="txtAddress" className="form-control" placeholder="Địa chỉ" />
                        </div>
                        <div className="input-group mg-b-pro-edt">
                            <span className="input-group-addon"><i className="fa fa-ticket" aria-hidden="true" /></span>
                            <Select type="text"  options={this.onGetProductsName()} value={selectedProduct} 
                            onChange={this.changeProductName.bind(this)} name="txtproductName" placeholder="Sản Phẩm" />
                        </div>
                        <div id="display-data-Container">
                            {this.displayData1}
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="review-content-section">
                        <div className="input-group mg-b-pro-edt">
                            <span className="input-group-addon"><i className="fa fa-sticky-note-o" aria-hidden="true" /></span>
                            <input type="text" value={txtPhone} onChange={this.onChange} name="txtPhone" className="form-control" placeholder="Số Điện Thoại" />
                        </div>
                        <div className="mg-b-pro-edt">
                            <select type="selectPayment"
                                    name="selectPayment"
                                    value={selectPayment}
                                    onChange={this.onChange}
                                    className="form-control pro-edt-select form-control-primary">
                            <option value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</option>
                            <option value="Chuyển khoản">Chuyển khoản</option>
                            </select>
                        </div>
                        <div className="input-group mg-b-pro-edt">
                            <span className="input-group-addon"><i className="fa fa-ticket" aria-hidden="true" /></span>
                            <Select type="text" options={this.onGetColor()} value={txtColor} onChange={this.changeColor.bind(this)}  name="txtColor" placeholder="Màu"/>
                            <span className="input-group-addon"><i className="fa fa-ticket" aria-hidden="true" /></span>
                            <Select type="text"
                                    name="txtSize"
                                    options={selectedSize}
                                    value={txtSize}
                                    onChange={this.changeSize.bind(this)}
                                    placeholder="Size">
                            </Select>
                            <span className="input-group-addon"><i className="fa fa-ticket" aria-hidden="true" /></span>
                            <Select type="text" options={selectedQuantity} value={txtQuantity} onChange={this.changeQuantity.bind(this)} name="txtQuantity" placeholder="Số lượng" />
                        </div>
                        <div id="display-data-Container">
                            {this.displayData2}
                        </div>
                        <div className="input-group mg-b-pro-edt">
                            <button type="button" className="btn btn-custon-rounded-four btn-primary" onClick={ this.onAddForm }>
                                    Thêm
                            </button>
                        </div>    
                    </div>
                    </div>
                {/* </div> */}
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="text-center mg-b-pro-edt custom-pro-edt-ds">
                        <Link to="/admin/order">
                            <button type="button" className="btn btn-warning waves-effect waves-light m-r-10">Quay lại
                            </button>
                        </Link>
                        <button type="submit" className="btn btn-primary waves-effect waves-light">
                            Lưu
                        </button>
                        </div>
                    </div>
                    </div>
                </form>
                </div>
            </div>
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

const mapStateToProps = state => {
    return {
        orderEditing : state.orderEditing,
        productsName : state.productsName,
        color : state.color,
        size : state.size,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddOrder : (order) => {
            dispatch(actAddOrderRequest(order));
        },
        onEditOrder : (id) => {
            dispatch(actGetOrderRequest(id));
        },
        onUpdateOrder : (order) => {
            dispatch(actUpdateOrderRequest(order));
        },
        getProductsName : () => {
            dispatch(actGetProductNameRequest())
        },
        getColor : (productId) => {
            dispatch(actGetColorRequest(productId))
        },
        getSize : (colorId) => {
            dispatch(actGetSizeRequest(colorId))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderActionPage);

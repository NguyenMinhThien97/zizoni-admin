import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { addAccRequest, getAccRequest, editAccRequest, UploadFileRequest, UploadMultipleFileRequest } from './../../actions/index';
import { connect } from 'react-redux';

class AccountActionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtPhone: '',
            txtEmail: '',
            txtAddress: '',
            txtPass: '',
            txtConfirm: '',
        };
    }
    componentDidMount() {
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            this.props.onEditAccount(id);
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.accountEditing){
            var {accountEditing} = nextProps;
            this.setState({
                id : accountEditing.id,
                txtName : accountEditing.name,
                txtPhone: accountEditing.phone,
                txtEmail: accountEditing.email,
                txtAddress: accountEditing.address,
                txtPass: '',
                txtConfirm: '',
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
        var { id, txtName , txtPhone , txtEmail , txtAddress , txtPass} = this.state;
        var { history } = this.props;
        var account = {
            id : id,
            name : txtName,
            phone : txtPhone,
            email : txtEmail,
            address : txtAddress,
            pass : txtPass,
            created : new Date(),
        };
        if (id) {
            this.props.onUpdateAccount(account);
        } else {
            this.props.onAddAccount(account);
        }
        history.goBack();
    }


    render() {
        var { id, txtName , txtPhone , txtEmail , txtAddress , txtPass, txtConfirm } = this.state;
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
                        <i className="fa fa-pencil" aria-hidden="true" /> Quản Lý Tài Khoản</a>
                    </li>
                    </ul>

                <div id="myTabContent" className="tab-content custom-product-edit">
                <div className="product-tab-list tab-pane fade active in" id="description">
                <form onSubmit={this.onSave}>
                {/* <div className="row"> */}
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="review-content-section">
                        <div className="input-group mg-b-pro-edt">
                        <span className="input-group-addon"><i className="fa fa-user" aria-hidden="true"></i></span>
                        <input type="text" value={txtName} onChange={this.onChange} name="txtName" className="form-control" placeholder="Tên" />
                        </div>
                        <div className="input-group mg-b-pro-edt">
                        <span className="input-group-addon"><i className="fa fa-sticky-note-o" aria-hidden="true" /></span>
                        <input type="email" value={txtEmail} onChange={this.onChange} name="txtEmail" className="form-control" placeholder="Email" />
                        </div>
                        <div className="input-group mg-b-pro-edt">
                        <span className="input-group-addon"><i className="fa fa-qrcode" aria-hidden="true"></i></span>
                        <input type="password" value={txtPass}  onChange={this.onChange} name="txtPass" className="form-control" placeholder="Mật Khẩu" />
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="review-content-section">
                    <div className="input-group mg-b-pro-edt">
                        <span className="input-group-addon"><i className="fa fa-pencil" aria-hidden="true" /></span>
                        <input type="text" value={txtPhone} onChange={this.onChange} name="txtPhone" className="form-control" placeholder="Số Điện Thoại" />
                        </div>
                        <div className="input-group mg-b-pro-edt">
                        <span className="input-group-addon"><i className="fa fa-ticket" aria-hidden="true" /></span>
                        <input type="text" value={txtAddress} onChange={this.onChange} name="txtAddress" className="form-control" placeholder="Địa chỉ" />
                        </div>
                        <div className="input-group mg-b-pro-edt">
                        <span class="input-group-addon"><i class="fa fa-qrcode" aria-hidden="true"></i></span>
                        <input type="password" value={txtConfirm}  onChange={this.onChange} name="txtConfirm" className="form-control" placeholder="Xác Nhận Mật Khẩu" />
                        </div>
                    </div>
                    </div>
                {/* </div> */}
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="text-center mg-b-pro-edt custom-pro-edt-ds">
                        <Link to="/admin/account">
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
        accountEditing : state.accountEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddAccount : (account) => {
            dispatch(addAccRequest(account));
        },
        onEditAccount : (id) => {
            dispatch(getAccRequest(id));
        },
        onUpdateAccount : (account) => {
            dispatch(editAccRequest(account));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountActionPage);

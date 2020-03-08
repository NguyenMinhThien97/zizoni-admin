import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { actAddProductRequest, actGetProductRequest, actUpdateProductRequest, UploadFileRequest, UploadMultipleFileRequest, actGetColorRequest, actGetSizeRequest } from './../../actions/index';
import { connect } from 'react-redux';
import DropzoneComponent from 'react-dropzone-component';

class ProductActionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtPrice: '',
            txtSize: '',
            txtDiscount: '',
            txtContent: '',
            txtColor: '',
            selectCatalog: '',
            file : '',
        };
        this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: "image/jpeg,image/png,image/gif",
        };
        this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
            postUrl: '/upload'
        };
        this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

        // Simple callbacks work too, of course
        this.callback = () => console.log('Hello!');

        this.success = file => console.log('uploaded', file);

        this.removedfile = file => console.log('removing...', file);

        this.dropzone = null;
    }
    

    handleUploadFile = (e) => {
        var x = document.getElementById("file");
        var txt = '';
        if ('files' in x) {
            if (x.files.length <= 0) {
                for (var i = 0; i < x.files.length; i++) {
                    var file = x.files[i];
                    if (x.files.length == 1){
                        txt= 'localhost:8888/file/img/'+file.name;
                    }
                    else {
                        if ('name' in file) {
                        txt += 'localhost:8888/file/img/'+ file.name + "+";
                        }
                    }
                }
            }
        }
        this.setState({
            file : txt
        })
    }
    componentDidMount() {
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            this.props.onEditProduct(id);
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.itemEditing){
            var {itemEditing} = nextProps;
            this.setState({
                id : itemEditing.id,
                txtName : itemEditing.name,
                txtPrice : itemEditing.price,
                txtDiscount:  itemEditing.discount,
                txtContent:  itemEditing.content,
                selectCatalog :itemEditing.catalogID,
                file: itemEditing.imagelist,
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
        var { id, txtName , txtPrice , txtColor , txtContent , txtDiscount , txtSize , selectCatalog , file} = this.state;
        var { history } = this.props;
        var product = {
            id : id,
            name : txtName,
            price : txtPrice,
            color : txtColor,
            connect : txtContent,
            discount : txtDiscount,
            size : txtSize,
            catalogID : selectCatalog,
            nb_like: 0,
            view : 0,
            quantity : 30,
            created_date : new Date(),
            status : 'true',
            imagelist : file,


        };
        if (id) {
            this.props.onUpdateProduct(product);
        } else {
            this.props.onAddProduct(product);
        }
        history.goBack();
    }


    render() {
        var { txtName , txtPrice , txtColor , txtContent , txtDiscount, txtSize , selectCatalog, file } = this.state;
        var config = this.componentConfig;
        var djsConfig = this.djsConfig;

        var eventHandlers = {
            init: dz => this.dropzone = dz,
            drop: this.callbackArray,
            addedfile: this.callback,
            success: this.success,
            removedfile: this.removedfile
        }
        // Sai 
        var { size } = this.props;
        console.log(size)
        //Sai

        var title = 'Thêm sản phẩm';
        if(txtName == null){
            title = 'Sửa sản phẩm';
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
                        <i className="fa fa-pencil" aria-hidden="true" /> {title}</a>
                    </li>
                    </ul>

                <div id="myTabContent" className="tab-content custom-product-edit">
                <div className="product-tab-list tab-pane fade active in" id="description">
                <form onSubmit={this.onSave}>
                {/* <div className="row"> */}
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="review-content-section">
                        <div className="input-group mg-b-pro-edt">
                        <span className="input-group-addon"><i className="fa fa-pencil" aria-hidden="true" /></span>
                        <input type="text" value={txtName} onChange={this.onChange} name="txtName" className="form-control" placeholder="Tên sản phẩm" />
                        </div>
                        <div className="input-group mg-b-pro-edt">
                        <span className="input-group-addon"><i className="fa fa-usd" aria-hidden="true" /></span>
                        <input type="text" value={txtPrice} onChange={this.onChange} name="txtPrice" className="form-control" placeholder="Giá sản phẩm" />
                        </div>
                        <div className="input-group mg-b-pro-edt">
                        <span className="input-group-addon"><i className="fa fa-sticky-note-o" aria-hidden="true" /></span>
                        <input type="text" value={txtSize} onChange={this.onChange} name="txtSize" className="form-control" placeholder="Size" />
                        </div>
                        <div className="input-group mg-b-pro-edt">
                            <span className="input-group-addon"><i className="fa fa-ticket" aria-hidden="true" /></span>
                            <textarea rows={7} value={txtContent} onChange={this.onChange} name="txtContent" type="text" className="form-control" placeholder="Mô tả sản phẩm"/>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="review-content-section">
                        <div className="input-group mg-b-pro-edt">
                        <span className="input-group-addon"><i className="fa fa-ticket" aria-hidden="true" /></span>
                        <input type="text" value={txtColor} onChange={this.onChange} name="txtColor" className="form-control" placeholder="Màu" />
                        </div>
                        <div className="input-group mg-b-pro-edt">
                        <span className="input-group-addon"><i className="fa fa-usd" aria-hidden="true" /></span>
                        <input type="text" value={txtDiscount}  onChange={this.onChange} name="txtDiscount" className="form-control" placeholder="% giảm giá" />
                        </div>
                        <select type="selectCatalog"
                                name="selectCatalog"
                                value={selectCatalog}
                                onChange={this.onChange}
                                className="form-control pro-edt-select form-control-primary">
                        <option value="0">Chọn danh mục sản phẩm</option>
                        <option value="1">Quần dài</option>
                        <option value="2">Quần short</option>
                        <option value="3">Áo sơ mi</option>
                        <option value="4">Áo thun</option>
                        <option value="5">Áo khoác</option>
                        </select>
                        <div className="dropzone-pro mg-tb-30">
                            <div id="dropzone1">
                            
                            <form action="/upload" className="dropzone dropzone-custom needsclick" id="demo1-upload">
                                <div className="dz-message needsclick download-custom">
                                <i className="fa fa-download" aria-hidden="true" />
                                <h2>Tải ảnh lên</h2>
                                
                                <div class="fallback">
                                    <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
                                </div>
                                </div>
                            </form>

                            </div>
                        </div>
                    </div>
                    </div>
                {/* </div> */}
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="text-center mg-b-pro-edt custom-pro-edt-ds">
                        <Link to="/admin/product">
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
        itemEditing : state.itemEditing,
        color : state.color,
        size : state.size
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddProduct : (product) => {
            dispatch(actAddProductRequest(product));
        },
        onEditProduct : (id) => {
            dispatch(actGetProductRequest(id));
            dispatch(actGetColorRequest(id));
            dispatch(actGetSizeRequest(id));
        },
        onUpdateProduct : (product) => {
            dispatch(actUpdateProductRequest(product));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);

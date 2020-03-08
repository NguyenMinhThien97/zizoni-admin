import React, { Component } from 'react';
import ProductList from './../../component/ProductList/ProductList';
import ProductItem from './../../component/ProductItem/ProductItem';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import {actDeleteProductRequest, actFetchProductsOfPageRequest } from './../../actions/index';

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1
        }
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    onDelete = (id) => {
        this.props.onDeleteProduct(id);
    }

    componentDidMount(){
        this.props.showPage(0);
    }
    handlePageChange(pageNumber) {
        var temp = 0;
        if(pageNumber>=1){
            temp = pageNumber - 1;
        }
        this.props.showPage(temp);
        var { products } = this.props;
        var { numberPageProduct } = this.props;
        var { perPage } = this.props;
        this.setState({
            categories: products,
            itemsCountPerPage: perPage,
            totalItemsCount: numberPageProduct,
            activePage: pageNumber,
        });
    }

    render() {
        var { products } = this.props;
        var { numberPageProduct } = this.props;
        var { perPage } = this.props;
        console.log(numberPageProduct)
        return (
            <div className="all-content-wrapper">
                <div className="product-status mg-tb-15">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="product-status-wrap">
                                    <h4>Danh Sách Sản Phẩm</h4>
                                    <div className="add-product">
                                        <Link to='/admin/product/add'>Thêm Sản Phẩm</Link>
                                    </div>
                                    <ProductList>
                                        {this.showProducts(products)}
                                    </ProductList>
                                    <div className="custom-pagination">
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination">
                                                {/* {showNumberPage} */}
                                                <Pagination
                                                    activePage={this.state.activePage}
                                                    itemsCountPerPage={perPage}
                                                    totalItemsCount={numberPageProduct*2}
                                                    pageRangeDisplayed={numberPageProduct}
                                                    onChange={this.handlePageChange}
                                                    itemClass='page-item'
                                                    linkClass='page-link'
                                                />
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

    showProducts(products) {
        var result = null;
        if (products.length > 0) {
            result = products.map((product, index) => {
                return (
                    <ProductItem
                        key={index}
                        product={product}
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
        products: state.products,
        numberPageProduct: state.numberPageProduct,
        perPage: state.perPage
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        showPage: (page) => {
            dispatch(actFetchProductsOfPageRequest(page));
        },
        onDeleteProduct: (id) => {
            dispatch(actDeleteProductRequest(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);

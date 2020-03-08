import * as Types from './../constants/ActionTypes';
import callApi from './../utils/apiCaller';

export const actGetProductRequest = (id) => {
    return dispatch => {
        return callApi(`product/listProduct/${id}`, 'GET', null).then(res => {
            dispatch(actGetProduct(res.data));
        });
    }
}
export const actGetProduct = (product) => {
    return {
        type: Types.GET_PRODUCT,
        product
    }
}

export const actFetchProductsOfPageRequest = (page) => {
    return dispatch => {
        return callApi(`/product/listProductByPage/${page}`, 'GET', null).then(res => {
            dispatch(actFetchProducts(res.data.content));
            dispatch(actFetchPageProducts(res.data.totalPages));
            dispatch(getPerPage(res.data.size));
            // dispatch(getCurrentPage(res.data.number));
        });
    };
}

export const getPerPage = (perPage) => {
    return {
        type: Types.PER_PAGE,
        perPage
    }
}

export const actFetchProducts = (products) => {
    return {
        type: Types.FETCH_PRODUCTS,
        products
    }
}

export const actFetchPageProducts = (numberPageProduct) => {
    return {
        type: Types.FETCH_NUMBER_PAGE_PRODUCTS,
        numberPageProduct
    }
}

export const actDeleteProductRequest = (id) => {
    return dispatch => {
        return callApi(`product/delete/${id}`, 'GET', null).then(res => {
            dispatch(actDeleteProduct(id));
        })
    }
}

export const actDeleteProduct = (id) => {
    return {
        type: Types.DELETE_PRODUCT,
        id
    }
}

export const actAddProductRequest = (product) => {
    return dispatch => {
        return callApi('product/create', 'POST', product).then(res => {
            dispatch(actAddProduct(res.data));
        });
    }
}

export const actAddProduct = (product) => {
    return {
        type: Types.ADD_PRODUCT,
        product
    }
}


export const actUpdateProductRequest = (product) => {
    return dispatch => {
        return callApi('product/update', 'POST', product).then(res => {
            dispatch(actUpdateProduct(res.data));
        });
    }
}

export const actUpdateProduct = (product) => {
    return {
        type: Types.UPDATE_PRODUCT,
        product
    }
}

export const actGetProductNameRequest = () => {
    return dispatch => {
        return callApi('product/listProductWithQuantity', 'GET', null).then(res => {
            dispatch(actGetProductName(res.data));
        });
    }
}
export const actGetProductName = (productsName) => {
    return {
        type: Types.GET_PRODUCTS_NAME,
        productsName
    }
}

export const UploadMultipleFileRequest = (files) => {
    return dispatch => {
        return callApi('file/uploadMultipleFiles', 'POST', files).then(res => {
            dispatch(UploadMultipleFile(res.data));
        });
    }
}

export const UploadMultipleFile = (file) => {
    return {
        type: Types.UPLOAD_MULTIPLE_FILE,
        file
    }
}
export const editAccRequest = (accounts) => {
    return dispatch => {
        return callApi('user/update', 'POST', accounts).then(res => {
            dispatch(editAcc(res.data));
        });
    }
}

export const editAcc = (account) => {
    return {
        type: Types.EDIT_ACCOUNT,
        account
    }
}
export const addAccRequest = (account) => {
    return dispatch => {
        return callApi('user/create', 'POST', account).then(res => {
            dispatch(addAcc(res.data));
        });
    }
}

export const addAcc = (account) => {
    return {
        type: Types.ADD_ACCOUNT,
        account
    }
}
export const deleteAccRequest = (id) => {
    return dispatch => {
        return callApi(`user/delete/${id}`, 'GET', null).then(res => {
            dispatch(deleteAcc(id));
        });
    }
}

export const deleteAcc = (id) => {
    return {
        type: Types.DELETE_ACCOUNT,
        id
    }
}
export const fetchAccRequest = () => {
    return dispatch => {
        return callApi('user/listUser', 'GET', null).then(res => {
            dispatch(fetchAcc(res.data));
        });
    }
}

export const fetchAcc = (account) => {
    return {
        type: Types.GET_ACCOUNT,
        account
    }
}
export const getAccRequest = (id) => {
    return dispatch => {
        return callApi(`user/getUser/${id}`, 'GET', null).then(res => {
            dispatch(getAcc(res.data));
        });
    }
}

export const getAcc = (account) => {
    return {
        type: Types.EDIT_ACCOUNT,
        account
    }
}
export const actFetchOrderRequest = () => {
    return dispatch => {
        return callApi('transaction/listTransaction', 'GET', null).then(res => {
            dispatch(actFetchOrder(res.data));
        });
    };
}

export const actFetchOrder = (order) => {
    return {
        type: Types.FETCH_ORDER,
        order
    }
}

export const actDeleteOrderRequest = (id) => {
    return dispatch => {
        return callApi(`transaction/delete/${id}`, 'GET', null).then(res => {
            dispatch(actDeleteOrder(id));
        })
    }
}

export const actDeleteOrder = (id) => {
    return {
        type: Types.DELETE_ORDER,
        id
    }
}

export const actAddOrderRequest = (order) => {
    return dispatch => {
        return callApi('transaction/create', 'POST', order).then(res => {
            dispatch(actAddOrder(res.data));
        });
    }
}

export const actAddOrder = (order) => {
    return {
        type: Types.ADD_ORDER,
        order
    }
}

export const actGetOrderRequest = (id) => {
    return dispatch => {
        return callApi(`transaction/listTransaction/${id}`, 'GET', null).then(res => {
            dispatch(actGetOrder(res.data));
        });
    }
}

export const actGetOrder = (order) => {
    return {
        type: Types.EDIT_ORDER,
        order
    }
}

export const actUpdateOrderRequest = (order) => {
    return dispatch => {
        return callApi('transaction/update', 'POST', order).then(res => {
            dispatch(actUpdateOrder(res.data));
        });
    }
}

export const actUpdateOrder = (order) => {
    return {
        type: Types.UPDATE_ORDER,
        order
    }
}

export const actGetSizeRequest = (id) => {
    return dispatch => {
        return callApi(`size/sizeByColor/${id}`, 'GET', null).then(res => {
            dispatch(actGetSize(res.data));
        });
    }
}
export const actGetSize = (size) => {
    return {
        type: Types.GET_SIZE,
        size
    }
}

export const actDeleteSizeRequest = (id) => {
    return dispatch => {
        return callApi(`size/delete/${id}`, 'GET', null).then(res => {
            dispatch(actDeleteSize(id));
        })
    }
}

export const actDeleteSize = (id) => {
    return {
        type: Types.DELETE_SIZE,
        id
    }
}

export const actAddSizeRequest = (size) => {
    return dispatch => {
        return callApi('size/create', 'POST', size).then(res => {
            dispatch(actAddSize(res.data));
        });
    }
}

export const actAddSize = (size) => {
    return {
        type: Types.ADD_SIZE,
        size
    }
}


export const actUpdateSizeRequest = (size) => {
    return dispatch => {
        return callApi('size/update', 'POST', size).then(res => {
            dispatch(actUpdateSize(res.data));
        });
    }
}

export const actUpdateSize = (size) => {
    return {
        type: Types.UPDATE_SIZE,
        size
    }
}

export const actGetColorRequest = (id) => {
    return dispatch => {
        return callApi(`color/colorByProduct/${id}`, 'GET', null).then(res => {
            dispatch(actGetColor(res.data));
        });
    }
}
export const actGetColor = (color) => {
    return {
        type: Types.GET_COLOR,
        color
    }
}

export const actDeleteColorRequest = (id) => {
    return dispatch => {
        return callApi(`color/delete/${id}`, 'GET', null).then(res => {
            dispatch(actDeleteColor(id));
        })
    }
}

export const actDeleteColor = (id) => {
    return {
        type: Types.DELETE_COLOR,
        id
    }
}

export const actAddColorRequest = (color) => {
    return dispatch => {
        return callApi('color/create', 'POST', color).then(res => {
            dispatch(actAddColor(res.data));
        });
    }
}

export const actAddColor = (color) => {
    return {
        type: Types.ADD_COLOR,
        color
    }
}


export const actUpdateColorRequest = (color) => {
    return dispatch => {
        return callApi('color/update', 'POST', color).then(res => {
            dispatch(actUpdateColor(res.data));
        });
    }
}

export const actUpdateColor = (color) => {
    return {
        type: Types.UPDATE_COLOR,
        color
    }
}


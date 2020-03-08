import { combineReducers } from 'redux';
import products from './products';
import itemEditing from './itemEditing';
import accounts from './accounts';
import accountEditing from './accountEditing';
import order from './order';
import orderEditing from './orderEditing';
import numberPageProduct from './numberPageProduct';
import perPage from './perPage';
import color from './color';
import size from './size';
import productsName from './productsName';


const appReducers = combineReducers({
    products,
    itemEditing,
    numberPageProduct,
    accounts,
    accountEditing,
    order,
    orderEditing,
    perPage,
    color,
    size,
    productsName,
});

export default appReducers;
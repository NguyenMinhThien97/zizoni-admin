import React from 'react';
import HomeAdmin from './pages/HomeAdmin/HomeAdmin';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Product from './pages/Product/Product';
import ProductActionPage from './pages/ProductActionPage/ProductActionPage'
import Account from './pages/Account/Account';
import AccountActionPage from './pages/AccountActionPage/AccountActionPage';
import OrderActionPage from './pages/OrderActionPage/OrderActionPage';
import Order from './pages/Order/Order';

const routes =[
    {
        path: '/admin',
        exact: true,
        main: () => <HomeAdmin/>
    },
    {
        path: '/admin/product',
        exact: true,
        main: () => <Product/>
    },
    {
        path: '/admin/product/add',
        exact: false,
        main: ({history}) => <ProductActionPage history={history}/>
    },
    {
        path: '/admin/product/:id/edit',
        exact: false,
        main: ({match, history}) => <ProductActionPage match={match} history={history}/>
    },
    {
        path: '/admin/account',
        exact: true,
        main: () => <Account/>
    },
    {
        path: '/admin/account/add',
        exact: false,
        main: ({history}) => <AccountActionPage history={history}/>
    },
    {
        path: '/admin/account/:id/edit',
        exact: false,
        main: ({match, history}) => <AccountActionPage match={match} history={history}/>
    },
    {
        path: '/admin/order',
        exact: true,
        main: () => <Order/>
    },
    {
        path: '/admin/order/add',
        exact: false,
        main: ({history}) => <OrderActionPage history={history}/>
    },
    {
        path: '/admin/order/:id/edit',
        exact: false,
        main: ({match, history}) => <OrderActionPage match={match} history={history}/>
    },
    {
        path: '',
        exact: false,
        main: () => <NotFoundPage />
    }
];

export default routes;
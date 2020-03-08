import React, { Component } from 'react';

class NotFoundPage extends Component {
    render() {
        return (
            <div class="all-content-wrapper">
                <div className="alert alert-warning" style={{textAlign: 'center'}}>
                    <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                    <h3 >Không Tìm Thấy Trang</h3>
                </div>
                <div style={{height: 283}}>
                </div>
            </div>
        );
    }
}

export default NotFoundPage;

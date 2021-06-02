import React from 'react';
import './Modal.css';
import { object, func, bool } from 'prop-types';

class Modal extends React.Component {

    
    
    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    };

    render() {
        if (this.props.open) {
            return null;
        }

        return (
            <section className="modal-container" id="modal">
                <div className="modal-content">
                    <h1>{this.props.mensaje}</h1>
                    <button onClick={this.onClose}>Close Modal</button>
                </div>
            </section>
        );
    }
}
Modal.defaultProps={
    open: false,
    onClose: ()=>{}
}
Modal.propTypes={
    onClose: func,
    open: bool
}
export default Modal;
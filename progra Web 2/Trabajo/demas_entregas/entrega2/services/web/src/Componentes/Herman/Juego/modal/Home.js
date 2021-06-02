import React, { Component } from 'react';

import Modal from './Modal.jsx';

class Home extends Component {
    state = {
        open: true
    };

    openModal = (e) => {
        e.preventDefault();
        this.setState({
            open: !this.state.open
        });
    };

    render() {
        return (
            <main>
                <section>
                    <h1>React-Modal</h1>
                    <button
                        onClick={(e) => {
                            this.openModal(e);
                        }}>
                        Open Modal
                    </button>
                </section>

                <Modal open={this.state.open} onClose={this.openModal} />
            </main>
        );
    }
}

export default Home;
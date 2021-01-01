import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class AddModel extends Component {

    constructor(prop) {
        super(prop);
        this.state = {show:false,};
    }

    handleShow = e => {
          this.setState({show:true,});
    }

    handleClose = e => {
          this.setState({show:false,});
    }

  render() {
    return (
      <div>
      <Button variant="primary" onClick={this.handleShow}><i className="fa fa-plus"></i>&nbsp;Add Employee</Button>
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
}

export default AddModel;
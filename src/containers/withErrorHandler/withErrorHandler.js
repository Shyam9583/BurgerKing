import React, { Component } from "react";
import Modal from "../../UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    constructor() {
      super();
      this.requestInterceptor = axios.interceptors.request.use((req) => {
        this.resetError();
        return req;
      });
      this.responseInterceptor = axios.interceptors.response.use(
        null,
        (error) => {
          this.setError(error);
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    resetError = () => this.setState({ error: null });
    setError = (error) => this.setState({ error: error });

    render() {
      return (
        <React.Fragment>
          {this.state.error ? (
            <Modal show={this.state.error} dismissModal={this.resetError}>
              <strong>{this.state.error.message}</strong>
            </Modal>
          ) : null}
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
};

export default withErrorHandler;

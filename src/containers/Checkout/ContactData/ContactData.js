import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../UI/Spinner/Spinner";
import Input from "../../../UI/Form/Input/Input";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
  formFieldDefault(elementType, elementConfig, validation, defaultValue) {
    return {
      elementType,
      elementConfig,
      validation,
      dirty: false,
      valid: Object.keys(validation).length === 0,
      value: defaultValue,
    };
  }

  formField(elementType, elementConfig, validation) {
    return {
      elementType,
      elementConfig,
      validation,
      valid: Object.keys(validation).length === 0,
      value: "",
    };
  }
  state = {
    orderForm: {
      name: this.formField(
        "input",
        {
          type: "text",
          name: "name",
          placeholder: "Your Name",
        },
        {
          required: true,
        }
      ),
      email: this.formField(
        "input",
        {
          type: "email",
          name: "email",
          placeholder: "Your Email",
        },
        {
          required: true,
        }
      ),
      street: this.formField(
        "input",
        {
          type: "text",
          name: "street",
          placeholder: "Your Street",
        },
        {
          required: true,
        }
      ),
      zipCode: this.formField(
        "input",
        {
          type: "text",
          name: "zipcode",
          placeholder: "Zip Code",
        },
        {
          required: true,
          minLength: 5,
          maxLength: 6,
        }
      ),
      country: this.formFieldDefault(
        "select",
        {
          name: "country",
          options: ["india", "australia"],
        },
        {},
        "india"
      ),
      deliveryMethod: this.formFieldDefault(
        "select",
        {
          name: "delivery",
          options: ["cheapest", "fastest"],
        },
        {},
        "cheapest"
      ),
    },
    isFormValid: false,
  };

  startLoading = () => {
    this.props.onSetPurchasing(true);
  };

  orderHandler = (event) => {
    event.preventDefault();
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: this.state.orderForm.name.value,
        address: {
          street: this.state.orderForm.street.value,
          zipCode: this.state.orderForm.zipCode.value,
          country: this.state.orderForm.country.value,
        },
        email: this.state.orderForm.email.value,
      },
      deliveryMethod: this.state.orderForm.deliveryMethod.value,
    };
    this.startLoading();

    this.props.onPurchaseStart(order);
  };

  changeHandler = (event, field) => {
    event.preventDefault();
    const orderForm = { ...this.state.orderForm };
    orderForm[field].dirty = true;
    orderForm[field].value = event.target.value;
    orderForm[field].valid = this.isInputValid(
      event.target.value,
      orderForm[field].validation
    );
    let validity = true;
    for (let key in orderForm) {
      validity = orderForm[key].valid && validity;
    }
    this.setState({ orderForm: orderForm, isFormValid: validity });
  };

  isInputValid = (value, rules) => {
    let validity = true;
    if (rules.required) {
      validity = value.trim() !== "" && validity;
    }
    if (rules.minLength) {
      validity = value.length >= rules.minLength && validity;
    }
    if (rules.maxLength) {
      validity = value.length <= rules.maxLength && validity;
    }
    return validity;
  };

  render() {
    const formFields = Object.keys(this.state.orderForm).map((field) => (
      <Input
        changed={(event) => this.changeHandler(event, field)}
        key={field}
        inputType={this.state.orderForm[field].elementType}
        elementConfig={this.state.orderForm[field].elementConfig}
        value={this.state.orderForm[field].value}
        dirty={this.state.orderForm[field].dirty}
        valid={this.state.orderForm[field].valid}
      />
    ));
    let form = (
      <form onSubmit={(event) => event.preventDefault()}>
        {formFields}
        <Button
          buttonType="Success"
          clicked={this.orderHandler}
          disabled={!this.state.isFormValid}
        >
          ORDER
        </Button>
      </form>
    );
    if (this.props.purchasing) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    purchasing: state.order.purchasing,
    error: state.order.error,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    onPurchaseStart: (orderData) =>
      dispatch(actions.purchaseBurgerStart(orderData)),
    onSetPurchasing: (purchasing) =>
      dispatch(actions.setPurchasing(purchasing)),
  };
};

export default connect(stateToProps, dispatchToProps)(ContactData);

import React, { ChangeEvent, FC, FormEvent, useReducer } from "react";
import * as styles from "./RegisterCardForm.module.scss";
import {
  formatCardNumber,
  formatCvc,
  formatExpiry,
  isValidCardNumber,
  isValidCvc,
  isValidExpiry,
} from "./cardValidation";

type RegisterCardFormProps = {
  firstName: string;
};

type FieldName = "cardNumber" | "cvc" | "expiry";

type FormState = {
  values: Record<FieldName, string>;
  errors: Partial<Record<FieldName, string>>;
  status: "idle" | "success";
};

type FormAction =
  | { type: "CHANGE_FIELD"; field: FieldName; value: string }
  | { type: "SET_ERRORS"; errors: Partial<Record<FieldName, string>> }
  | { type: "SUBMIT_SUCCESS" };

const initialState: FormState = {
  values: { cardNumber: "", cvc: "", expiry: "" },
  errors: {},
  status: "idle",
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "CHANGE_FIELD":
      return {
        ...state,
        status: "idle",
        values: { ...state.values, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: undefined },
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors, status: "idle" };
    case "SUBMIT_SUCCESS":
      return { ...initialState, status: "success" };
    default:
      return state;
  }
};

const FIELD_FORMATTERS: Record<FieldName, (value: string) => string> = {
  cardNumber: formatCardNumber,
  cvc: formatCvc,
  expiry: formatExpiry,
};

export const RegisterCardForm: FC<RegisterCardFormProps> = ({ firstName }) => {
  const [{ values, errors, status }, dispatch] = useReducer(
    formReducer,
    initialState
  );

  const handleChange =
    (field: FieldName) => (event: ChangeEvent<HTMLInputElement>) => {
      const formatter = FIELD_FORMATTERS[field];
      dispatch({
        type: "CHANGE_FIELD",
        field,
        value: formatter(event.target.value),
      });
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<Record<FieldName, string>> = {};

    if (!isValidCardNumber(values.cardNumber)) {
      nextErrors.cardNumber = "Enter a valid 16 digit card number";
    }
    if (!isValidCvc(values.cvc)) {
      nextErrors.cvc = "Enter a valid 3 digit CVC";
    }
    if (!isValidExpiry(values.expiry)) {
      nextErrors.expiry = "Enter a valid expiry date (MM/YY)";
    }

    if (Object.keys(nextErrors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors: nextErrors });
      return;
    }

    dispatch({ type: "SUBMIT_SUCCESS" });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <p className={styles.welcome}>Welcome {firstName}</p>

      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor="cardNumber">Credit card number</label>
          <input
            id="cardNumber"
            name="cardNumber"
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="1234 5678 9012 3456"
            value={values.cardNumber}
            onChange={handleChange("cardNumber")}
            aria-invalid={Boolean(errors.cardNumber)}
            aria-describedby={
              errors.cardNumber ? "cardNumber-error" : undefined
            }
          />
          {errors.cardNumber && (
            <span id="cardNumber-error" role="alert" className={styles.error}>
              {errors.cardNumber}
            </span>
          )}
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="cvc">CVC</label>
            <input
              id="cvc"
              name="cvc"
              type="text"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="123"
              value={values.cvc}
              onChange={handleChange("cvc")}
              aria-invalid={Boolean(errors.cvc)}
              aria-describedby={errors.cvc ? "cvc-error" : undefined}
            />
            {errors.cvc && (
              <span id="cvc-error" role="alert" className={styles.error}>
                {errors.cvc}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="expiry">Expiry</label>
            <input
              id="expiry"
              name="expiry"
              type="text"
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM/YY"
              value={values.expiry}
              onChange={handleChange("expiry")}
              aria-invalid={Boolean(errors.expiry)}
              aria-describedby={errors.expiry ? "expiry-error" : undefined}
            />
            {errors.expiry && (
              <span id="expiry-error" role="alert" className={styles.error}>
                {errors.expiry}
              </span>
            )}
          </div>
        </div>

        <button type="submit" className={styles.submit}>
          Submit
        </button>

        {status === "success" && (
          <p role="status" className={styles.success}>
            Card details submitted successfully!
          </p>
        )}
      </div>
    </form>
  );
};
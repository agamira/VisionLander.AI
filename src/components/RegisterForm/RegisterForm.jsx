import "./RegisterForm.scss";
import googleLogo from "../../assets/icon/google.svg";
import { useForm } from "react-hook-form";
import { message } from "antd";
import { Button } from "..";
import { loginGoogleAsync } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

const RegisterForm = ({ signUpAction, logInAction, closeSignUpModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();

  const error = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };

  const onSubmit = async (data) => {
    signUpAction(data)
      .then((res) => {
        success(res.message);
        closeSignUpModal();
      })
      .catch((err) => {
        error(err.data.detail);
      });
    reset();
  };

  return (
    <>
      {contextHolder}
      <div className="register-form">
        <p className="form-title">Sign Up</p>
        <form id="register-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="inputs">
            <div className="input-field">
              <input
                className="email-input"
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <p className="error-message">
                {errors.email && errors.email.message}
              </p>
            </div>
            <div className="input-field">
              <input
                className="password-input"
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
              <p className="error-message">
                {errors.password && errors.password.message}
              </p>
            </div>
            <div className="input-field">
              <input
                className="confirm-password-input"
                type="password"
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === getValues("password") ||
                    "The passwords do not match",
                })}
              />
              <p className="error-message">
                {errors.confirmPassword && errors.confirmPassword.message}
              </p>
            </div>
            <div className="checkbox-field">
              <div className="checkbox-input">
                <input
                  id="termsCheckbox"
                  name="termsCheckbox"
                  type="checkbox"
                  {...register("termsCheckbox", {
                    required: "Read terms of use and privacy policy",
                  })}
                />
                <label htmlFor="termsCheckbox">
                  I agree to the terms and conditions
                </label>
              </div>
              <p className="error-message">
                {errors.termsCheckbox && errors.termsCheckbox.message}
              </p>
            </div>
          </div>
          <Button
            className="btn--primary btn-sign-up"
            type="submit"
            disabled={isSubmitting}
          >
            Sign Up
          </Button>
          <Button
            className="btn--outline btn--google"
            type="button"
            disabled={isSubmitting}
            onClick={() =>
              dispatch(loginGoogleAsync()).then((res) => {
                if (res.payload) {
                  closeSignUpModal();
                  window.location.href = `${res.payload}`;
                }
              })
            }
          >
            <span>
              <img src={googleLogo} alt="google-logo" />
              Google
            </span>
          </Button>
          <Button
            onClick={logInAction}
            className="btn--outline btn-login"
            type="button"
            disabled={isSubmitting}
          >
            Log In
          </Button>
        </form>
        <div className="links">
          <a href="#privacy-policy" target="_blank" className="link">
            Privacy Policy
          </a>
          <a href="/terms-of-use" target="_blank" className="link">
            Terms of Use
          </a>
        </div>
      </div>
    </>
  );
};

export { RegisterForm };

import "./LoginForm.scss";
import googleLogo from "../../assets/icon/google.svg";
import { useForm } from "react-hook-form";
import { message } from "antd";
import { Button } from "..";
import { useDispatch } from "react-redux";
import { loginGoogleAsync } from "../../redux/authSlice";

const LoginForm = ({ logInAction, signUpAction, closeLogInModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
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
    logInAction(data)
      .then((response) => {
        let res = response.payload;
        if (res.status === 401) {
          error(res.message);
          return;
        }
        if (res.status === 200) {
          success(res.message);
          closeLogInModal();
          return;
        }
      })
      .catch((err) => {
        error(err.message);
      });
    reset();
  };

  return (
    <>
      {contextHolder}
      <div className="login-form">
        <p className="form-title">Log In</p>
        <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
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
            <div className="checkbox-field">
              <div className="checkbox-input">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  {...register("remember")}
                />
                <label htmlFor="remember">Remember Me</label>
              </div>
            </div>
          </div>
          <Button
            className="btn--primary btn-login"
            type="submit"
            disabled={isSubmitting}
          >
            Log In
          </Button>
          <Button
            className="btn--outline btn--google"
            type="button"
            disabled={isSubmitting}
            onClick={() =>
              dispatch(loginGoogleAsync()).then((res) => {
                if (res.payload) {
                  closeLogInModal();
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
            onClick={signUpAction}
            className="btn--outline btn-sign-up"
            type="button"
            disabled={isSubmitting}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </>
  );
};

export { LoginForm };

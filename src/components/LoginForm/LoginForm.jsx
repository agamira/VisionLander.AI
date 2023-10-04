import { useForm } from "react-hook-form";
import "./LoginForm.scss";
import { Button } from "..";

const LoginForm = ({ logInAction, signUpAction }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    logInAction(data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    reset();
  };
  console.log(errors);

  return (
    <div className="login-form">
      <p className="form-title">Log In to continue</p>
      <p className="form-text">
        if you do not have an account - choose sign up
      </p>
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
        </div>
        <Button
          style={{ width: "100%", padding: "21px 0" }}
          className="btn--primary"
          type="submit"
          disabled={isSubmitting}
        >
          Log In
        </Button>
        <Button
          onClick={signUpAction}
          style={{ width: "100%", padding: "21px 0" }}
          className="btn--outline btn-sign-up"
          type="button"
          disabled={isSubmitting}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export { LoginForm };

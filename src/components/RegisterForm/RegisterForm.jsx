import { useForm } from "react-hook-form";
import "./RegisterForm.scss";
import { Button } from "..";

const RegisterForm = ({ signUpAction, logInAction, closeSignUpModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    signUpAction(data)
      .then((res) => {
        console.log(res);
        if (res.status === 404) return alert(res.message);
        if (res.status === 200) {
          closeSignUpModal();
          alert("Success");
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    reset();
  };
  console.log(errors);

  return (
    <div className="register-form">
      <p className="form-title">Registrate to continue</p>
      <p className="form-text">
        if you do not have an account - choose sign up
      </p>
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
        </div>
        <Button
          style={{ width: "100%", padding: "21px 0" }}
          className="btn--primary"
          type="submit"
          disabled={isSubmitting}
        >
          Sign Up
        </Button>
        <Button
          onClick={logInAction}
          style={{ width: "100%", padding: "21px 0" }}
          className="btn--outline btn-login"
          type="button"
          disabled={isSubmitting}
        >
          Already have an account?
        </Button>
      </form>
    </div>
  );
};

export { RegisterForm };

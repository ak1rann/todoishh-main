import { ReactComponent as EyeOpen } from "assets/svg/eye-off.svg";
import { ReactComponent as EyeClosed } from "assets/svg/eye-on.svg";
import { FeatherIcons } from "assets/svg/feather-icons";
import featherIcon from "assets/svg/feather-sprite.svg";
import { Spinner } from "components/Spinner";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "hooks";
import { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "_firebase";
import { LoginSignupForm } from "./login-signup-form";

export const SignupForm = () => {
  const [inStepTwo, setInStepTwo] = useState(false);
  const [inStepOne, setInStepOne] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({ email: "", password: "", name: "" });
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [nameHasError, setNameHasError] = useState(false);
  const [passwordHasError, setPasswordHasError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [globalErrorMessage, setGlobalErrorMessage] = useState("");

  const { signupWithEmail } = useAuth();

  const onChangeHandler = (event) => {
    event.preventDefault();
    setEmailIsValid(true);
    if (event.target.name == "password") {
      setPasswordHasError(false);
    } else {
      setNameHasError(false);
    }
    const value = event.target.value;
    setFormState({
      ...formState,
      [event.target.name]: value,
    });
  };

  const verifyEmail = async (event) => {
    event?.preventDefault();
    const emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(formState.email)) {
      setEmailIsValid(true);
      setLoading(true);
      const userRef = query(collection(db, "user"), where("email", "==", formState.email));
      const userSnap = await getDocs(userRef);
      if (userSnap.metadata.fromCache) {
        setEmailIsValid(false);
        setLoading(false);
        setErrorMessage("помилка, повторіть спробу пізніше..");
        setGlobalErrorMessage("помилка, повторіть спробу пізніше..");
        return;
      }
      if (!userSnap.empty) {
        setEmailIsValid(false);
        setErrorMessage("Ваша адреса електронної пошти вже зареєстрована у нас");
        setGlobalErrorMessage("Ваша адреса електронної пошти вже зареєстрована у нас");
        setLoading(false);
      } else {
        setLoading(false);
        setInStepOne(false);
        setInStepTwo(true);
      }
    } else {
      setEmailIsValid(false);
      setErrorMessage("Ваша адреса електронної пошти недійсна");
      setGlobalErrorMessage("Ваша адреса електронної пошти недійсна");
    }
  };

  const signUpWithEmailAddress = async (event) => {
    event.preventDefault();
    verifyEmail();

    if (!formState.name.length) {
      setNameHasError(true);
    }
    if (formState.password.length < 8) {
      setPasswordHasError(true);
      return;
    }

    signupWithEmail(formState);
  };

  const backlinkHandler = (event) => {
    event.preventDefault();
    setInStepTwo(false);
    setInStepOne(true);
  };

  return (
    <div className={`signup ${inStepTwo ? "in_step_two" : ""}${inStepOne ? "in_step_one" : ""}`}>
      <div className="signup__wrapper">
        <div className="step_one">
          <LoginSignupForm />

          <div className="separator">
            <div className="middle_separator">OR</div>
          </div>
          <form className="signup-form">
            <div className="field">
              <label htmlFor="email" className="label">
              Електронна пошта
              </label>
              {!emailIsValid && (
                <div className="error-message">
                  <FeatherIcons
                    id="alert-circle"
                    width={20}
                    height={20}
                    fill="#db4c3f"
                    stroke={"#fff"}
                    strokeWidth={2}
                    currentColor={"#fff"}
                  />
                  {errorMessage}
                </div>
              )}
              <input
                type="email"
                value={formState.email}
                name="email"
                id="email"
                autoComplete="off"
                className={!emailIsValid ? "has-error" : ""}
                onChange={(event) => onChangeHandler(event)}
              />
            </div>

            <button className="auth-button submit-button" disabled={loading ? true : false} onClick={(event) => verifyEmail(event)}>
            Зареєструйтесь електронною поштою
              {loading && <Spinner light />}
            </button>

            <hr />

            <p>
            Вже реєструвалися?<Link to="/signin">Перейти до входу</Link>
            </p>
          </form>
        </div>

        <div className="step_two">
          <a className="backlink" onClick={(event) => backlinkHandler(event)}>
            <svg className="" width="16" height="16" stroke="#000" fill="none">
              <use href={`${featherIcon}#chevron-left`}></use>
            </svg>
            <span className="backlink__text">{formState.email}</span>
          </a>
          <h1>Майже готово</h1>
          <form className="signup-form">
            <div className="field">
              <label htmlFor="name" className="label">
                
              Ваше ім'я
              </label>
              {nameHasError && (
                <div className="error-message">
                  <FeatherIcons
                    id="alert-circle"
                    width={20}
                    height={20}
                    fill="#db4c3f"
                    stroke={"#fff"}
                    strokeWidth={2}
                    currentColor={"#fff"}
                  />
                  Повне ім'я не може бути порожнім
                </div>
              )}
              <input
                value={formState.name}
                autoComplete="off"
                type="name"
                name="name"
                id="name"
                className={`${nameHasError ? "has-error" : ""}`}
                onChange={(event) => onChangeHandler(event)}
              />
            </div>
            <div className="field">
              <label className="label" htmlFor="password">
              Пароль
              </label>
              {passwordHasError && (
                <div className="error-message">
                  <FeatherIcons
                    id="alert-circle"
                    width={20}
                    height={20}
                    fill="#db4c3f"
                    stroke={"#fff"}
                    strokeWidth={2}
                    currentColor={"#fff"}
                  />
                 Пароль має бути довжиною не менше 8 символів{" "}
                </div>
              )}
              <div className="toggle_password">
                <input
                  className={` form_field_control ${passwordHasError ? "has-error" : ""}`}
                  value={formState.password}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={(event) => onChangeHandler(event)}
                />
                <span className="toggle" role="checkbox" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOpen /> : <EyeClosed />}
                </span>
              </div>
            </div>
            <div className="hint-text">Ваш пароль має містити не менше 8 символів. Уникайте загальних слів або шаблонів.</div>
            <button className="auth-button submit-button" disabled={false} onClick={(event) => signUpWithEmailAddress(event)}>
            Зареєструватися зараз
              {loading && <Spinner light />}
            </button>

            <hr />

            <p>
            Вже зареєструвалися? <Link to="/signin">Перейти до входу</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

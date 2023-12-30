import illustration from "assets/svg/landing-illustration.webp";
import { ReactComponent as LogoMobile } from "assets/svg/logo-mobile.svg";
import { ReactComponent as Logo } from "assets/svg/logo.svg";
import { Link } from "react-router-dom";
import "./main.scss";
export const LandingPage = () => {
  return (
    <main className="landing-page">
      <header className="intro__header">
        <nav className="intro__nav">
          <div className="intro__nav--group">
            <div className="nav-logo">
              <Logo className="logo__desktop" />
              <LogoMobile className="logo__mobile" />
            </div>
            <div className="intro__nav--group__wrapper">
              {/* <div className="nav-logo__mobile">
                  <LogoMobile />
                </div> */}
              <Link className="intro__nav--item intro__nav--link" to="/">
              особливості
              </Link>
              <Link className="intro__nav--item intro__nav--link" to="/">
                
Шаблони
              </Link>
              <Link className="intro__nav--item intro__nav--link" to="/">
              Для команд
              </Link>
              <Link className="intro__nav--item intro__nav--link" to="/">
              Ресурси
              </Link>
              <Link className="intro__nav--item intro__nav--link" to="/">
              Ціноутворення
              </Link>
            </div>
          </div>
          <div className="intro__nav--group">
            <div className="intro__nav--group__wrapper">
              <Link className="intro__nav--item intro__nav--link" to="/signin">
              авторизуватися
              </Link>
              <Link className="intro__nav--item intro__nav--link" to="/signup">
              Зареєструватися

              </Link>
            </div>
          </div>
        </nav>
      </header>

      <section className="section__intro">
        <div className="intro__hero">
          <h1 className="hero-text">
          Організуйте свій <br /> деня і життя.
          </h1>
          <h2 className="hero-text__sub">
          Станьте зосередженим, організованим і спокійним із Todoist. Програма для керування завданнями та списку справ.
          </h2>
          <Link to="/signin" className="intro__hero--cta">
          Почніть безкоштовно
          </Link>
        </div>
        <img src={illustration} className="intro__hero--illustration-1" alt="" width={1256} />
      </section>
    </main>
  );
};

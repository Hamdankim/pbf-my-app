import Link from "next/link";
import style from "./login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const TampilanLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push, query } = useRouter();

  const callbackUrl = typeof query.callbackUrl === "string" ? query.callbackUrl : "/";
  const [error, setError] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.Password.value,
        callbackUrl,
      });

      if (res?.error) {
        setIsLoading(false);
        setError(res?.error || "Login Failed");
      } else {
        setIsLoading(false);
        push(callbackUrl);
      }
    } catch (err) {
      setIsLoading(false);
      setError("wrong email or password");
    }

  };

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    setError("");
    setIsLoading(true);

    try {
      const res = await signIn(provider, { callbackUrl, redirect: false });

      if (res?.error) {
        setError(res.error);
      } else if (res?.url) {
        window.location.href = res.url;
      } else {
        push(callbackUrl);
      }
    } catch (err) {
      setError("Terjadi kesalahan saat login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={style.login}>
        {error && <p className={style.login__error}>{error}</p>}
        <h1 className={style.login__title}>Halaman Login</h1>
        <div className={style.login__form}>
          <form onSubmit={handleSubmit}>
            <div className={style.login__form__item}>
              <label
                htmlFor="email"
                className={style.login__form__item__label}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className={style.login__form__item__input}
              />
            </div>

            <div className={style.login__form__item}>
              <label
                htmlFor="Password"
                className={style.login__form__item__label}
              >
                Password
              </label>
              <input
                type="password"
                id="Password"
                name="Password"
                placeholder="Password"
                className={style.login__form__item__input}
              />
            </div>
            <button
              type="submit"
              className={style.login__form__item__button}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
            <br /> <br />
            <button
              type="button"
              onClick={() => handleOAuthSignIn("google")}
              className={style.login__form__item__button}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign in with Google"}
            </button>
            <br /> <br />
            <button
              type="button"
              onClick={() => handleOAuthSignIn("github")}
              className={style.login__form__item__button}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign in with GitHub"}
            </button>
          </form>
          <br />
          <p className={style.login__form__item__text}>
            Tidak punya akun? <Link href="/auth/register">Ke Halaman Register</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default TampilanLogin;
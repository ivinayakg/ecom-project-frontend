import { useState } from "react";
import "../components/css/login.css";

const LoginPage = () => {
  const [action, setAction] = useState("login");
  return (
    <div className="section loginPage">
      <div className="container">
        {action === "login" ? (
          <div class="login_comp flex flex-col p2">
            <h2 class="head2">Login</h2>
            <form class="login_form flex flex-col">
              <label for="username">Uername</label>
              <div class="input">
                <input type="text" id="username" required />
              </div>
              <label for="password">Password</label>
              <div class="input">
                <input type="password" id="password" required />
              </div>
              <label class="checkbox">
                <input type="checkbox" />
                Remember Me
              </label>
              <button class="btn-sec" type="submit">
                Login
              </button>
              <button onClick={() => setAction("signup")}>
                Create An Account {">"}
              </button>
            </form>
          </div>
        ) : (
          <SignUp setAction={() => setAction("login")} />
        )}
      </div>
    </div>
  );
};

const SignUp = ({ setAction }) => {
  return (
    <div class="signup_comp flex flex-col p2">
      <h2 class="head2">Sign Up</h2>
      <form class="signup_form flex flex-col">
        <label for="email">Email</label>
        <div class="input">
          <input type="email" id="email" required />
        </div>
        <label for="password">Password</label>
        <div class="input">
          <input type="password" id="password" required />
        </div>

        <label class="checkbox">
          <input type="checkbox" />I accept all the terms &nspb; conditions
        </label>

        <button class="btn-sec" type="submit">
          Create An Account
        </button>
        <button onClick={setAction}>Already Have An Account {">"}</button>
      </form>
    </div>
  );
};

export default LoginPage;

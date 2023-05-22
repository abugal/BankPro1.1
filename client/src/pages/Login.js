import { useState } from "react";
import { useLogin } from '../hooks/useLogin'
import "../styles/Login.css";
import profile from "../assets/bpfp.png";
import { Link } from "react-router-dom";
//import emailpic from "../assets/email.jpg";
// import pass from "../assets/pass.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };
  return (
    <div>
      <div className="main">
        <div className="sub-main">
          <div>
            <div className="imgs">
              <div className="container-image">
                <img src={profile} alt="profile" className="profile" />
              </div>
            </div>
            <form className="login" onSubmit={handleSubmit}>
              <h1 className="card-title">Login Page</h1>
              {/* <h3>Log in</h3> */}
              <div>
                {/* <label>Email:</label> */}
                {/* <img src={emailpic} alt="email" className="email" /> */}
                <input
                  type="email"
                  placeholder="Email"
                  className="name"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              {/* <label>Password:</label> */}
              <div className="second-input">
                {/* <img src={pass} alt="pass" className="email" /> */}
                <input
                  type="password"
                  placeholder="Password"
                  className="name"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className="login-button">
                <button disabled={isLoading}>Log in</button>
                {error && <div className="error">{error}</div>}
              </div>

              <div className="link">
                <p className="forgot">
                  <a href="/signup">Forgot Password</a>
                </p>
                <Link to="/">
                  <p className="signup">Sign Up</p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

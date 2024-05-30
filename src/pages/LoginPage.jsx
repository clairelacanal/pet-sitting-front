import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import apiHandler from "../utils/apiHandler";

function LoginPage() {
  const [loginForm, setLoginForm] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const { updateToken } = useContext(AuthContext);

  function handleChange(e) {
    setLoginForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await apiHandler.post("/connexion", loginForm);

      updateToken(response.data.authToken);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      {error && <div>{error}</div>}

      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="userName">
          Name
          <input
            type="text"
            name="userName"
            id="userName"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          Email
          <input type="email" name="email" id="email" onChange={handleChange} />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </label>

        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default LoginPage;

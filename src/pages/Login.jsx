import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card, Spinner } from "react-bootstrap";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, token } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5 px-2">
      <Card className="hover-card shadow-lg p-4" style={{ width: "100%", maxWidth: "380px" }}>
        <h3 className="text-center mb-4">Login</h3>

        {error && (
          <div className="alert alert-danger py-2 text-center">{error}</div>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button type="submit" className="w-100" variant="primary" disabled={isLoading}>
            {isLoading ? <Spinner animation="border" size="sm" /> : "Login"}
          </Button>
        </Form>

        <p className="text-center mt-3 mb-0">
          Don’t have an account?{" "}
          <Link to="/signup" className="fw-bold text-primary">Register</Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;

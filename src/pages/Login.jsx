import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import './auth.css';
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error, token } = useSelector((state) => state.auth);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    
    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(form));
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">{isLoading ? "Loading..." : "Login"}</button>
            </form>

            <p className="switch-text">
                Don’t have an account?{" "}
                <Link to="/signup" className="switch-link">Register</Link>
            </p>
        </div>
    );
};

export default Login;

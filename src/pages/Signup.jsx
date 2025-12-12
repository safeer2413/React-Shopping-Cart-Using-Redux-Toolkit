import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/auth/authSlice";
import './auth.css';
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error, user } = useSelector((state) => state.auth);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        // If user is successfully created (and we are on signup page), redirect to login
        if (user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signupUser(form));
    };

    return (
        <div className="auth-container">
            <h2>Create Account</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">{isLoading ? "Loading..." : "Signup"}</button>
            </form>

            <p className="switch-text">
                Already have an account?{" "}
                <Link to="/login" className="switch-link">Login</Link>
            </p>
        </div>
    );
};

export default Signup;

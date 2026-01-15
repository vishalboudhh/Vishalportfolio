import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../api/auth";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginAdmin(form);
      localStorage.setItem("admin_token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-8 rounded-xl w-full max-w-md text-white shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Admin Login
        </h2>

        {error && (
          <p className="bg-red-500/20 text-red-400 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="text-sm">Email</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 rounded bg-black border border-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="text-sm">Password</label>
          <input
            type="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 rounded bg-black border border-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-emerald-600 py-2 rounded font-semibold hover:opacity-90 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;

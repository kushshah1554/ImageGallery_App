import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Input from "../Input";
import { validate } from "../validate";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData((c) => ({ ...c, [e.target.name]: e.target.value }));
    setError({});
  };
  // console.log(formData);

  const signofResponce = async () => {
    return await axios.post("/api/user/signup", formData);
  };

  const handleSubmit = async () => {
    if (!validate(formData, setError)) {
      return;
    }
    try {
      const { data } = await signofResponce();

      if (!data.success) {
        return;
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen sm:h-[calc(100vh-5.53rem)] bg-gradient-to-br  from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div
  className="
    bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900
    rounded-3xl
    shadow-xl shadow-black/40
    max-w-md w-full flex-1
    p-8
    space-y-6
    backdrop-blur-sm
    border border-white/10
  "
>
  <div className="text-center space-y-1">
    <h1 className="text-3xl font-extrabold text-white">
      Create Account
    </h1>
    <p className="text-gray-300 text-sm">Sign up to get started</p>
  </div>

  <div className="space-y-5">
    <Input
      Icon={User}
      placeholder="Enter your username"
      label="Username"
      type="text"
      name="username"
      handleChange={handleChange}
      formData={formData}
      error={error}
    />

    <Input
      Icon={Mail}
      placeholder="Enter your email"
      label="Email"
      type="email"
      name="email"
      handleChange={handleChange}
      formData={formData}
      error={error}
    />

    <Input
      Icon={Lock}
      placeholder="Enter your password"
      label="Password"
      type="password"
      Eye={Eye}
      EyeOff={EyeOff}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      name="password"
      handleChange={handleChange}
      formData={formData}
      error={error}
    />
  </div>

  <button
    onClick={handleSubmit}
    className="
      bg-purple-600 hover:bg-purple-700
      text-white rounded-lg w-full py-3
      font-semibold
      shadow-lg shadow-purple-900/40
      hover:shadow-xl
      transition-all cursor-pointer
    "
  >
    Sign up
  </button>

  <p className="text-center text-gray-300 text-sm">
    Already have an account?{" "}
    <NavLink
      to="/login"
      className="text-purple-400 hover:text-purple-300 font-semibold"
    >
      Log in
    </NavLink>
  </p>
</div>

    </div>
  );
};

export default SignupForm;

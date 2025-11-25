import { useContext, useEffect, useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Input from "../Input";
import { NavLink, useNavigate, useNavigation } from "react-router-dom";
import axios from "axios";
import { TokenContext } from "../../TokenProvider";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [remember,setRemember]=useState(false);

    const {setToken}=useContext(TokenContext);

    const [error,setError]=useState(null);

  
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };


  const handleLogin = async () => {
    try {
      // console.log(formData);
      const { data } = await axios.post("/api/user/login", formData);
      // console.log(data);

      if (data.success) {
        localStorage.setItem("accessToken", data.accessToken);
        if(remember)
        {
          const {data:data1}=await axios.get("/api/user/remember_me",{headers:{Authorization:`Bearer ${data.accessToken}`}});
          // console.log("data=",data1);
          
          localStorage.setItem("email",data1.email);
          localStorage.setItem("remember",remember);
        }else{
          localStorage.removeItem("email");
          localStorage.setItem("remember",false);
        }
        setToken(data.accessToken);
        setTimeout(() => {
          // navigate("/gallery",{replace:true});
        },10);

      } 
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }
  };



  useEffect(()=>{
   const email= localStorage.getItem("email");
   const remember=localStorage.getItem("remember")==="true";
    if(email && remember){
      setFormData({email,password:""});
      setRemember(true);
    }
  },[]);



  

  return (
    <div className="min-h-screen bg-gradient-to-br  from-slate-900 via-slate-800 to-slate-900  flex items-center justify-center flex-col">
      <div>
      </div>
     <div className="
  bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900
  p-8 max-w-md w-full
  rounded-3xl
  shadow-xl shadow-black/40
  space-y-6
  backdrop-blur-sm
  border border-white/10
">
  <div className="text-center space-y-1">
    <h1 className="text-3xl font-extrabold text-white">
      Welcome Back
    </h1>
    <p className="text-gray-300 text-sm">
      Log in to your account
    </p>
  </div>

  <div className="space-y-5">
    <Input
      Icon={Mail}
      placeholder="Enter your email"
      label="Email"
      type="text"
      name="email"
      handleChange={handleChange}
      formData={formData}
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
      islogin={true}
      error={error}
    />
  </div>

  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={remember}
      onChange={() => setRemember(!remember)}
      className="w-4 h-4 rounded border-gray-400 bg-slate-800 text-purple-500 focus:ring-purple-600 focus:ring-offset-0"
    />
    <label className="text-gray-300 text-sm">Remember me</label>
  </div>

  <button
    onClick={handleLogin}
    className="
      bg-purple-600 hover:bg-purple-700
      text-white
      rounded-lg
      w-full py-3
      font-semibold
      shadow-lg shadow-purple-900/40
      hover:shadow-xl transition-all
    "
  >
    Log in
  </button>

  <div className="flex items-center gap-3">
    <div className="flex-1 border-t border-gray-500/30"></div>
    <span className="text-gray-400 text-sm font-medium">OR</span>
    <div className="flex-1 border-t border-gray-500/30"></div>
  </div>

  <p className="text-center text-gray-300 text-sm">
    Don’t have an account?{" "}
    <NavLink
      to="/signup"
      className="text-purple-400 hover:text-purple-300 font-semibold"
    >
      Sign up
    </NavLink>
  </p>
</div>

    </div>
  );
};

export default Login;

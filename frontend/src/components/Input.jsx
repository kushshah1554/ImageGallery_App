const Input = ({
  Icon,
  placeholder,
  label,
  type,
  Eye,
  EyeOff,
  showPassword,
  setShowPassword,
  handleChange,
  formData,
  name,
  error,
  islogin,
  login
}) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="text-sm font-medium text-gray-700 mb-2 flex justify-between"
      >
       <p>  {label}  </p> 
       {islogin && <p className=" text-purple-500 hover:text-purple-600 font-semibold cursor-pointe cursor-pointer">Forgot?</p>}
      </label>
      <div className=" relative flex justify-center items-center ">
        <div className=" absolute left-0 inset-y-0 pointer-events-none flex items-center justify-center pl-2">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>

        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : "text"
          }
          onChange={handleChange}
          value={formData[name]}
          name={name}
          placeholder={placeholder}
          required
          className="w-full py-3 pl-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors "
        />
        {type === "password" && (
          <div className=" absolute right-0 inset-y-0 flex items-center justify-center pr-2  ">
            {showPassword ? (
              <button
                onClick={() => setShowPassword(!showPassword)}
                className=" cursor-pointer"
              >
                <Eye className="h-5 w-5 text-gray-400" />
              </button>
            ) : (
              <button
                onClick={() => setShowPassword(!showPassword)}
                className=" cursor-pointer "
              >
                <EyeOff className="h-5 w-5 text-gray-400" />
              </button>
            )}
          </div>
        )}
      </div>
      {error && error[name] ? (
        <p className="text-red-600">{error[name]}</p>
      ) : error && islogin?<p className="text-red-600">{error}</p>:null}
    </div>
  );
};

export default Input;

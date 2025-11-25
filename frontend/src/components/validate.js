export const validate = (formData,setError) => {
  const error = {};

  if (!formData.username.trim()) {
    error.username = "Please enter username";
  }

  if (!formData.email.trim()) {
    error.email = "Please enter email";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
    error.email = "Invalid email forma";
  }

  if (!formData.password.trim()) {
    error.password = "Please enter password";
  } else if (formData.password.length < 6) {
    error.password = "Password must be at least 6 characters";
  }
   setError(error);

   return Object.keys(error).length===0; 
};

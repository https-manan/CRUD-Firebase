import { useState,useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const nevigate = useNavigate()
  const firebase = useFirebase()
  useEffect(() => {
    if (firebase.isLogined) {
      nevigate('/')
    }
  }, [firebase, nevigate])
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function register() {
    await firebase.signupUser(email, password)
    alert('User registered successfully')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Register
        </h2>

        <div className="space-y-4">
          <input type="text" placeholder="Enter Email..." value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="password" placeholder="Enter Password..." value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button onClick={register} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginOwner({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "ownernuryati" && password === "ownernuryati") {
      setUser("Owner Nuryati");
      navigate("/ownerHome");
    } else {
      alert("Username atau password salah!");
    }
  };

  const backLogin = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-500">
      <div className="relative">
        <button
          onClick={backLogin}
          className="absolute -top-48 -left-28 w-auto p-3 rounded text-xl bg-green-500 transition duration-300 ease-in-out hover:bg-green-600 hover:text-white"
        >
          Kembali
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-blue-500 p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl mb-4 text-center">Login</h2>
        <div className="mb-4">
          <label className="block">Username</label>
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block">Password</label>
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 py-2 rounded transition duration-300 ease-in-out hover:bg-green-600 hover:text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    setLoading(true); // Start loading when the form is submitted
    console.log("Submitting user data:", { email, password });

    // Add a delay before calling the login function
    setTimeout(() => {
      login();
    }, 1000); // 2000ms delay (2 seconds)
  };

  const login = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const responseData = await response.json();
      setLoading(false); // Stop loading when response is received

      if (response.ok) {
        setResponseMessage(responseData.message);
        navigate("/"); // Navigate after successful login
        console.log("Login successful");
      } else {
        console.error("Login failed");
        setResponseMessage(responseData.error || "Login failed");
      }
    } catch (error) {
      setLoading(false); // Stop loading in case of an error
      console.error("Error Authenticating user:", error);
      setResponseMessage("Error Authenticating user");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-700 w-screen">
      <div className="container max-w-screen-lg mx-auto">
        <form onSubmit={handleSubmit}>
          <div>
            <h2 className="font-semibold text-xl text-white">Trader Form</h2>
            <p className="text-white mb-2">Untuk Mendaftarkan User Trader</p>

            <div className="bg-sky-950 rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 items-center justify-center">
                <div className="text-white">
                  <p className="font-medium text-lg">Detail Trader</p>
                  <p>Silahkan isi kolom terkait Trader.</p>
                  <div className="">
                    <img
                      src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="md:col-span-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Email"
                    disabled={loading} // Disable input during loading
                  />
                </div>
                <div className="md:col-span-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    disabled={loading} // Disable input during loading
                  />
                </div>
                <div className="md:col-span-5 text-right">
                  <div className="inline-flex items-end relative justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <button
                      type="submit"
                      className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                      disabled={loading} // Disable button during loading
                    >
                      {loading ? "Loading..." : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        {responseMessage && (
          <div className="text-white mt-4 text-center">
            {responseMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;

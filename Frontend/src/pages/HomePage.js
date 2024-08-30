import React, { useState, useEffect } from "react";

const HomePage = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const responseData = await response.json();
        if (response.ok) {
          console.log(
            "Received User Data",
            responseData,
            "name",
            responseData.name
          );
          setUserName(responseData.name);
        } else {
          console.error("User Data not received");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <div>
      <h2>{userName ? "Welcome, " + userName : "You are not Logged In"}</h2>
      {/* Add your home page content here */}
    </div>
  );
}

export default HomePage
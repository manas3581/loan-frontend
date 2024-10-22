import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateLoader = ({ path }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate(`${path}`);
    return () => clearInterval(interval);
  }, [count, navigate, path]);
  return (
    <div className="loader">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default PrivateLoader;

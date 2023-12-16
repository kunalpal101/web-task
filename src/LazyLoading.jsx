import React, { useState, useEffect } from "react";

const generateRandomData = () => {
  const newData = Array.from({ length: 30 }, (_, index) => `Item ${index + 1}`);
  return newData;
};

const LazyLoadingExample = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
      setLoading(true);
    }
  };

  useEffect(() => {
    setData(generateRandomData());

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (loading) {
      const newData = generateRandomData();

      setTimeout(() => {
        setData((prevData) => [...prevData, ...newData]);
        setLoading(false);
      }, 1000);
    }
  }, [loading]);
  const mystyle = {
    border: "1px solid black",
    padding: "10px",
    margin: "1em 10em ",

    fontFamily: "Arial",
  };
  return (
    <div>
      {data.map((item, index) => (
        <div style={mystyle} key={index}>
          {item}
        </div>
      ))}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default LazyLoadingExample;

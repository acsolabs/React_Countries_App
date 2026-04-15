import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";

const Countries = () => {
  const [data, setData] = useState([]);
  const [rangeValue, setRangeValue] = useState("36");

  const handleChange = (e) => {
    setRangeValue(e.target.value);
  };

  useEffect(() => {
    axios
      .get(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,capital",
      )
      .then((res) => setData(res.data));
  }, []);

  return (
    <div className="countries">
      <ul className="radio-container">
        <input
          type="range"
          min={1}
          max={250}
          onChange={handleChange}
          defaultValue={rangeValue}
        />
      </ul>
      <ul>
        {data.slice(0, rangeValue).map((country, index) => (
          <Card key={index} country={country} />
        ))}
      </ul>
    </div>
  );
};

export default Countries;

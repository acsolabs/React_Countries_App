import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";

const Countries = () => {
  const [data, setData] = useState([]);
  const [rangeValue, setRangeValue] = useState("36");
  const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];
  const [selectedRadio, setSelectedRadio] = useState("");

  const handleChange = (e) => {
    setRangeValue(e.target.value);
  };

  useEffect(() => {
    axios
      .get(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region",
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
        {radios.map((continent) => (
          <li>
            <input
              type="radio"
              name="continentRadio"
              id={continent}
              onChange={(e) => setSelectedRadio(e.target.id)}
            />
            <label htmlFor={continent}>{continent}</label>
          </li>
        ))}
      </ul>
      <ul>
        {data
          .filter((country) => country.region.includes(selectedRadio))
          .slice(0, rangeValue)
          .map((country, index) => (
            <Card key={index} country={country} />
          ))}
      </ul>
    </div>
  );
};

export default Countries;

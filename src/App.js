import "./App.css";
import React, { useState } from "react";

function App() {
  const [args, setArgs] = useState([{ label: "My arg", value: false }]);
  const [result, setResult] = useState(undefined);
  const [condition, setCondition] = useState("select");
  const [argumentVal, setArgumentVal] = useState();
  const [constantVal, setConstantVal] = useState(false);
  const [selectedArg, setSelectedArg] = useState(args[0].label);
  const [andOr, setAndOr] = useState("and");
  const [isAndOr, setIsAndOr] = useState(false);

  const addArgs = () => {
    setArgs([...args, { label: "My arg", value: false }]);
  };
  const handleChange = (e, i) => {
    let nam = e.target.name;
    let val = e.target.value;
    let data = [...args];
    data[i][nam] = val;

    setArgs(data);
    if (condition === "argument") {
      if (selectedArg === args[i].label) {
        setResult(args[i].value);
      }
    }
  };

  const handleChangeCondition = (e) => {
    let val = e.target.value;
    setCondition(val);
    if (val === "argument") {
      setResult(args[0].value);
      setArgumentVal(args[0].value);
    } else if (val === "constant") {
      setResult(constantVal);
    } else if (val === "and") {
      setIsAndOr(true);
    }
  };

  const handleConstantResult = (e) => {
    setConstantVal(e.target.value);
    setResult(e.target.value);
  };
  const handleReset = () => {
    setCondition("select");
    setResult(undefined);
  };
  const handleAndOr = () => {};

  const handleArgumentResult = (e) => {
    let val = e.target.value;
    let data = args.filter((item) => item.label === val);
    setArgumentVal(val);
    setResult(data[0].value);
    setSelectedArg(data[0].label);
  };

  return (
    <>
      {args.map((item, index) => (
        <React.Fragment key={index}>
          <div className="arguments">
            <input
              onChange={(e, i) => handleChange(e, index)}
              value={item.label}
              name="label"
            />
            <select
              name="value"
              onChange={(e, i) => handleChange(e, index)}
              value={item.value}
            >
              <option value={false} label="false"></option>
              <option value={true} label="true"></option>
            </select>
          </div>
          {index === args.length - 1 && (
            <button onClick={addArgs}>+add arg</button>
          )}
        </React.Fragment>
      ))}

      <>
        {condition === "select" && (
          <div className="selector">
            <select value={condition} onChange={handleChangeCondition}>
              <option value={"select"} label="Select"></option>
              <option value={"constant"} label="Constant"></option>
              <option value={"argument"} label="argument"></option>
              <option value={"and"} label="and"></option>
              <option value={"or"} label="or"></option>
            </select>
            <button onClick={handleReset}>x</button>
          </div>
        )}
        {condition === "argument" && (
          <div className="selector">
            <select value={argumentVal} onChange={handleArgumentResult}>
              {args.map((item, index) => (
                <option
                  key={index}
                  value={item.label}
                  label={item.label}
                ></option>
              ))}
            </select>
            <button onClick={handleReset}>x</button>
          </div>
        )}

        {condition === "constant" && (
          <div className="selector">
            <select value={constantVal} onChange={handleConstantResult}>
              <option value={false} label={"false"}></option>
              <option value={true} label={"true"}></option>
            </select>
            <button onClick={handleReset}>x</button>
          </div>
        )}
        {condition === "and" && isAndOr && (
          <>
            <div className="selector">
              <select value={andOr} onChange={handleAndOr}>
                <option value={"and"} label={"and"}></option>
                <option value={"or"} label={"or"}></option>
              </select>
              <button onClick={handleReset}>x</button>
            </div>

            <div style={{ marginTop: "10px" }} className="selector">
              <select
                value={!isAndOr ? "and" : "select"}
                onChange={handleChangeCondition}
              >
                <option value={"select"} label="Select"></option>
                <option value={"constant"} label="Constant"></option>
                <option value={"argument"} label="argument"></option>
                <option value={"and"} label="and"></option>
                <option value={"or"} label="or"></option>
              </select>
              <button onClick={handleReset}>x</button>
            </div>
          </>
        )}
      </>

      <p className="result">result: {`${result}`}</p>
    </>
  );
}

export default App;

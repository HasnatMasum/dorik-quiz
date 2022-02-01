import React from "react";
import { useState, useEffect } from "react";
import FormInput from "./FormInput";
import Button from "./Button";

const InputOptionBox = ({ inputBox, panelName }) => {
  const [tempQuiz, setTempQuiz] = useState([]);
  const [ansOption, setAnsOption] = useState([
    {
      id: "option" + new Date().getTime().toString(),
      option: "",
      correct: false
    }
  ]);

  //Change input value
  const changeAnsOption = (index, e) => {
    const { name, value, type, checked } = e.target;
    const values = [...ansOption];

    values[index][name] = type === "checkbox" ? checked : value;
    setAnsOption(values);

    setTempQuiz(ansOption);
  };

  //Add new Answer option
  const addAnsOption = () => {
    setAnsOption([
      ...ansOption,
      {
        id: "option" + new Date().getTime().toString(),
        option: "",
        correct: false
      }
    ]);
  };

  const removeAnsOption = index => {
    const values = [...ansOption];
    values.splice(index, 1);
    setAnsOption(values);
  };

  useEffect(() => {
    inputBox[panelName].answer = [...tempQuiz];
  }, [tempQuiz, inputBox, panelName]);

  return (
    <>
      <h6 className="mt-3 mb-3">Write Answer</h6>
      {ansOption.map((optPanel, index) => {
        return (
          <div className="row mb-2" key={optPanel.id}>
            <div className="col-auto">
              <div className="form-check">
                <FormInput
                  className="form-check-input"
                  type="checkbox"
                  name="correct"
                  checked={optPanel.correct}
                  onChange={e => changeAnsOption(index, e)}
                />
                <label className="form-check-label" htmlFor="cor">
                  Correct
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <FormInput
                type="text"
                className="form-control"
                placeholder="write answer"
                name="option"
                id={optPanel.id}
                value={optPanel.option}
                onChange={e => changeAnsOption(index, e)}
              />
            </div>
            <div className="col-auto">
              {index !== 0 && (
                <Button
                  type="button"
                  className="me-2 btn btn-outline-danger"
                  children="Remove"
                  onClick={() => removeAnsOption(index)}
                />
              )}
              {ansOption.length - 1 === index &&
                (ansOption.length < 4 && (
                  <Button
                    type="button"
                    className="btn btn-outline-info"
                    children="Add"
                    onClick={() => addAnsOption()}
                  />
                ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default InputOptionBox;

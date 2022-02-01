import React from "react";
import { useState, useEffect } from "react";
import Button from "../component/Button";
import FormInput from "../component/FormInput";
import InputOptionBox from "../component/InputOptionBox";

const getInputBoxFromLoacalStorage = () => {
  let questionbox = localStorage.getItem("questionbox");

  return questionbox ? JSON.parse(localStorage.getItem("questionbox")) : [];
};

const getQuesesFromLoacalStorage = () => {
  let quizes = localStorage.getItem("quizzes");

  return quizes ? JSON.parse(localStorage.getItem("quizes")) : [];
};

const CreateQuiz = () => {
  const [inputBox, setInputBox] = useState(getInputBoxFromLoacalStorage());
  const [quizzes, setQuizzes] = useState(getQuesesFromLoacalStorage());

  const handleInputChang = (index, e) => {
    const { name, value } = e.target;

    const values = [...inputBox];
    values[index][name] = value;
    setInputBox(values);
  };

  //Add Question
  const addQuestion = () => {
    setInputBox([
      ...inputBox,

      {
        inputName: "ques" + new Date().getTime().toString(),
        question: "",
        answer: []
      }
    ]);
  };

  //Remove Question
  const removeQuestion = inputName => {
    const newVal = inputBox.filter(item => {
      return item.inputName !== inputName;
    });

    setInputBox(newVal);
  };

  //Form Submit handler
  const handleSubmit = e => {
    e.preventDefault();
    setQuizzes(inputBox);
    setInputBox([]);
  };

  //Add input box to local storage
  useEffect(() => {
    localStorage.setItem("questionbox", JSON.stringify(inputBox));
  }, [inputBox]);

  //Add input box to local storage
  useEffect(() => {
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
  });

  return quizzes !== null ? (
    <div className="col-md-8 mx-auto">
      {quizzes.map((quisQues, qind) => {
        return (
          <div className="bg-light p-3 shadow rounded mb-2" key={qind}>
            <div className="card">
              <div className="card-body">
                <h4 className="question">
                  {qind + 1}. {quisQues.question}{" "}
                  <span className="text-primary  float-end">
                    <i className="fas fa-edit"></i>
                  </span>
                  <span className="text-primary text-danger float-end mx-2">
                    <i className="fas fa-trash-alt"></i>
                  </span>
                </h4>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="col-md-8 mx-auto">
      <form action="" className="mb-5" onSubmit={handleSubmit}>
        {inputBox.map((panel, index) => {
          return (
            <div
              className="bg-light p-3 shadow rounded mb-2"
              key={panel.inputName}
            >
              <div className="card">
                <div className="card-body">
                  <div className="col-12">
                    <label htmlFor="questions" className="form-label h6 mb-3">
                      {index + 1}. Write Question
                    </label>

                    <FormInput
                      id="questions"
                      type="text"
                      name="question"
                      className="form-control"
                      placeholder="Write Question"
                      value={panel.question}
                      onChange={e => handleInputChang(index, e)}
                    />
                  </div>

                  <InputOptionBox inputBox={[...inputBox]} panelName={index} />
                </div>
              </div>

              <Button
                type="button"
                className="mt-3 btn btn-outline-danger me-2"
                children="Remove Question"
                onClick={() => removeQuestion(panel.inputName)}
              />
              {inputBox.length - 1 === index && (
                <Button
                  type="button"
                  className="mt-3 btn btn-outline-dark"
                  children="Add Question"
                  onClick={addQuestion}
                />
              )}
            </div>
          );
        })}

        {inputBox.length === 0 && (
          <div className="col-auto text-center">
            <Button
              type="button"
              className="mt-3 btn btn-outline-primary text-center"
              children="Add Question"
              onClick={addQuestion}
            />
          </div>
        )}
        {inputBox.length > 0 && (
          <Button
            type="submit"
            className="float-end mt-3 mb-5 btn btn-warning shadow"
            children="Save Question"
          />
        )}
      </form>
    </div>
  );
};

export default CreateQuiz;

import React from "react";
import { useState } from "react";
import Button from "../component/Button";

const getQuizzesFromLoacalStorage = () => {
  let quizlist = localStorage.getItem("quizzes");

  return quizlist ? JSON.parse(localStorage.getItem("quizzes")) : [];
};

const Quize = () => {
  const [quizList] = useState(getQuizzesFromLoacalStorage());
  const [showResult, setFinalResult] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQustion, setCurrentQusetion] = useState(0);

  //Function for correct ans and next question
  const answerClick = isCorrect => {
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentQustion + 1 < quizList.length) {
      setCurrentQusetion(currentQustion + 1);
    } else {
      setFinalResult(true);
    }
  };

  //Again play quiz
  const resetGame = () => {
    setFinalResult(false);
    setScore(0);
    setCurrentQusetion(0);
  };
  return quizList !== null ? (
    <div className="col-md-6 mx-auto">
      <div className="bg-light p-3 shadow rounded mb-2">
        <div className="card">
          {showResult ? (
            <div className="card-body">
              <h4 className="text-center">Final Result</h4>
              <h6 className="text-center text-secondary">
                <span className="text-primary">{score}</span> out of{" "}
                <span className="text-primary">{quizList.length}</span> correct
              </h6>
              <div className="text-center">
                <Button
                  type="button"
                  children="Start Again"
                  className="mt-3 btn btn-outline-success text-center"
                  onClick={resetGame}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="card-header">
                <h6 className="text-center">
                  Question {currentQustion + 1} out of {quizList.length}
                </h6>
              </div>
              <div className="card-body">
                <h5>
                  {currentQustion + 1}. {quizList[currentQustion].question}
                </h5>

                {quizList[currentQustion].answer.map((qiz, i) => {
                  return (
                    <div className="col-12 ans" key={i}>
                      <div className="d-grid col-8 gap-2">
                        <Button
                          type="button"
                          children={qiz.option}
                          className="mt-3 btn btn-outline-success text-center"
                          onClick={() => answerClick(qiz.correct)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="col-md-6 mx-auto">
      <div className="bg-light p-3 shadow rounded mb-2">
        <div className="card">
          <div className="card-body">
            <h5>There is no question at this moment.</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quize;

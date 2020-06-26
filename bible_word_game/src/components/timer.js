import React from 'react';
import logo from './logo.svg';
import './App.css';

function Timer() {
  return (
    <div className="App">
      <header className="App-header">
        var counter = {};
window.addEventListener("load", function () {
  // COUNTDOWN IN SECONDS
  // EXAMPLE - 5 MINS = 5 X 60 = 300 SECS
  counter.end = 300;

  // Get the containers
  counter.min = document.getElementById("cd-min");
  counter.sec = document.getElementById("cd-sec");

  // Start if not past end date 
  if (counter.end > 0) {
    counter.ticker = setInterval(function(){
      // Stop if passed end time
      counter.end--;
      if (counter.remain <= 0) {
        counter.min.innerHTML = "done";
        counter.sec.innerHTML = "done";
        }

      // Calculate remaining time
      var secs = counter.end;
      var mins  = Math.floor(secs / 60); // 1 min = 60 secs
      secs -= mins * 60;

      // Update HTML
      counter.min.innerHTML = mins;
      counter.sec.innerHTML = secs;
    }, 1000);
  }
});

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Timer;
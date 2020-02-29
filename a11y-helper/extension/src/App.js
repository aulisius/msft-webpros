import React, { useState } from "react";
import Switch from "./Switch";
import "./App.css";

function App() {
  const [autoFix, toggleAutoFix] = useState(true);
  const [annotate, toggleAnnotate] = useState(false);
  return (
    <div className="App">
      <header className="header">
        <h1>Auto A11Y</h1>
      </header>
      <main className="main">
        <div className="actions">
          <div className="action-item">
            Apply Fixes
            <Switch
              name="Apply A11Y Fixes"
              checked={autoFix}
              onToggle={() => {
                toggleAutoFix(!autoFix);
              }}
            />
          </div>
          <div className="action-item">
            Annotate Issues
            <Switch
              name="Annotate Issues"
              checked={annotate}
              onToggle={() => {
                toggleAnnotate(!annotate);
              }}
            />
          </div>
        </div>
        <div className="summary">
          <div className="summary-item">
              <span className="errors">0</span>
              Errors
          </div>
          <div className="summary-item">
              <span className="warnings">0</span>
              Warnings
          </div>
          <div className="summary-item">
              <span className="fixed">0</span>
              Fixed
          </div>
        </div>
      </main>
      <footer className="footer">
        <p>
          by <strong>theWebPro's</strong>
        </p>
      </footer>
    </div>
  );
}

export default App;

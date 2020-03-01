import React, { useState } from "react";
import Switch from "./Switch";
import "./App.css";

window.chrome = window.chrome || window.browser;

function App() {
  const [autoFix, toggleAutoFix] = useState(true);
  const [stats, setStats] = useState({ errors: 0, fixed: 0 });
  window.chrome.storage.local.get("toggle", function(data) {
    console.log(data);
    if (data.toggle !== undefined) {
      console.log(data.toggle);
      toggleAutoFix(data.toggle);
    } else {
      toggleAutoFix(true);
    }
  });
  window.chrome.runtime.onMessage.addListener(request => setStats(request));
  return (
    <div className="App">
      <header className="header">
        <h1>Auto A11Y</h1>
      </header>
      <main className="main">
        <div className="actions">
          <div className="action-item">
            {/* {autoFix ? "Annotate Issues" : "Apply Fixes"} */}
            Make this inclusive
            <Switch
              name="Apply A11Y Fixes"
              checked={autoFix}
              onToggle={async () => {
                toggleAutoFix(!autoFix);
                window.chrome.storage.local.set({ toggle: !autoFix }, function(
                  data
                ) {
                  toggleAutoFix(data.toggle);
                });
                window.chrome.tabs.query(
                  { active: true, currentWindow: true },
                  function(arrayOfTabs) {
                    window.chrome.tabs.reload(arrayOfTabs[0].id);
                  }
                );
              }}
            />
          </div>
        </div>
        <div className="summary">
          <div className="summary-item">
            <span className="errors">{stats.errors}</span>
            Errors
          </div>
          <div className="summary-item">
            <span className="fixed">{stats.fixed}</span>
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

import { Component } from "react";

// Class component: logs user activity (add / delete / filter / toggle)
class ActivityLogger extends Component {
  constructor(props) {
    super(props);
    this.state = { logs: [], toast: "" };
    this.timer = null;
  }

  // Load saved logs from localStorage
  componentDidMount() {
    const saved = localStorage.getItem("activityLogs");
    if (saved) this.setState({ logs: JSON.parse(saved) });
    window.addEventListener("keydown", this.handleKey);
  }

  // When a new action arrives from the parent, add it to logs
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.latestAction !== this.props.latestAction && this.props.latestAction) {
      const entry = {
        id: Date.now(),
        text: this.props.latestAction,
        time: new Date().toLocaleTimeString(),
      };
      this.setState({ logs: [entry, ...this.state.logs].slice(0, 20) });
    }
    // Save logs and show toast when logs change
    if (prevState.logs !== this.state.logs) {
      localStorage.setItem("activityLogs", JSON.stringify(this.state.logs));
      if (prevState.logs.length < this.state.logs.length) {
        this.setState({ toast: this.state.logs[0].text });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.setState({ toast: "" }), 2000);
      }
    }
  }

  // Cleanup timer and event listener
  componentWillUnmount() {
    clearTimeout(this.timer);
    window.removeEventListener("keydown", this.handleKey);
  }

  handleKey = (e) => {
    if (e.key === "Escape") this.setState({ toast: "" });
  };

  clearLogs = () => {
    this.setState({ logs: [] }, () => localStorage.removeItem("activityLogs"));
  };

  render() {
    const { logs, toast } = this.state;
    return (
      <div>
        {toast && <div className="toast">{toast}</div>}
        <button onClick={this.clearLogs}>Clear Logs</button>
        {logs.length === 0 ? (
          <p className="empty">No activity yet.</p>
        ) : (
          <ul className="logs">
            {logs.map((log) => (
              <li key={log.id}>
                <small>{log.time}</small> {log.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
export default ActivityLogger;

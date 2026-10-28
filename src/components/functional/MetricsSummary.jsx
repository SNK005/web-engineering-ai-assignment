function MetricsSummary({ tasks }) {
  const done = tasks.filter((t) => t.completed).length;
  const high = tasks.filter((t) => t.priority === "High").length;
  const stats = [
    ["Total", tasks.length],
    ["Completed", done],
    ["Pending", tasks.length - done],
    ["High Priority", high],
  ];
  return (
    <div className="metrics">
      {stats.map(([label, count]) => (
        <div className="metric" key={label}>
          <strong>{count}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
export default MetricsSummary;

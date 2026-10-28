// Reusable container: whatever is placed inside it is shown via props.children
function CardWrapper({ title, children }) {
  return (
    <section className="card-wrapper">
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}
export default CardWrapper;

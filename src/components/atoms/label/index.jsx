export const Label = (props) => {
  const { htmlFor, children, className = "" } = props || {};

  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm text-primary mb-1 ${className}`}
    >
      {children}
    </label>
  );
};

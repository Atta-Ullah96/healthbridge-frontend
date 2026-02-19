export const Radio = (props) => {
  const { id, name, value, checked, onChange, label } = props || {};

  return (
    <>
      <label className="flex items-center space-x-2 text-sm text-dark">
        <input
          id={id}
          name={name}
          type="radio"
          value={value}
          checked={checked}
          onChange={onChange}
          className="accent-primary"
        />
        <span>{label}</span>
      </label>
    </>
  );
};

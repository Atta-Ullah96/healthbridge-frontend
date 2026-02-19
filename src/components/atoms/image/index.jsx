export const Image = (props) => {
  const {
    src,
    alt = "image",
    className = "",
    width = "100%",
    height = "auto",
    rounded = true,
    shadow = false,
  } = props || {};


  
  return (
    <img
      src={src}
      alt={alt}
      style={{ width, height }}
      className={`
        object-cover
        ${rounded ? "rounded-lg" : ""}
        ${shadow ? "shadow-md" : ""}
        bg-card-bg
        ${className}
      `}
    />
  );
};


const Avatar = ({ src, alt = "Avatar", size = 40, name = "", className = "" }) => {
  // Get initials from name (first letters of first two words)
  const getInitials = (name) => {
    if (!name) return "D"; // Default if no name
    const words = name.split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const initials = getInitials(name);

  return (
    <>
      {src ? (
        // If image exists
        <img
          src={src}
          alt={alt}
          style={{ width: size, height: size }}
          className={`rounded-full object-cover ${className}`}
        />
      ) : (
        // If no image, show initials
        <div
          style={{
            width: size,
            height: size,
            fontSize: size / 2, // Font size relative to avatar size
          }}
          className={`flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold ${className}`}
        >
          {initials}
        </div>
      )}
    </>
  );
};

export default Avatar;

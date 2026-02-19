

const Button = (props) => {
  const {children, type = 'button',variant = 'primary',  size = 'md',    disabled = false,className = '', onClick,
} = props || {}




  const baseVariants = {
    primary: 'bg-primary cursor-pointer text-white hover:bg-[#0C6FA1]',
    secondary: 'bg-white cursor-pointer text-primary border border-primary hover:bg-primary-light',
    success: 'bg-success cursor-pointer text-white hover:bg-green-700',
    danger: 'bg-error cursor-pointer text-white hover:bg-red-600',
  };

  // Styling based on size
  const baseSizes = {
    sm: 'text-sm px-3 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-5 py-3',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center font-medium rounded-md transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${baseVariants[variant]}
        ${baseSizes[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;

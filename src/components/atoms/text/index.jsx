const Text = (props) => {

  const {children, variant = 'body', className=''} = props || {}
  const variants = {
    heading1: 'font-poppins text-3xl font-bold text-gray-900 ',
    heading2: 'font-poppins text-2xl font-semibold text-gray-800',
    subheading: 'text-xl font-semibold text-gray-700 bg-[#16A34A]',
    body: 'font-inter text-base text-gray-700',
    caption: 'text-sm text-gray-500',
    error: 'text-sm text-red-500 font-medium',
    bold: 'font-bold text-base text-gray-800',
    italic: 'italic text-base text-gray-700',
    label: 'text-sm text-gray-600 font-medium',
    link: 'text-blue-600 underline cursor-pointer',
  };

  return <p className={`${variants[variant]} ${className}`}>{children}</p>;
};

export default Text;
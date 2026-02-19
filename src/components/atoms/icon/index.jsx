// ✅ Icon.jsx
export const Icon = (props) => {
const { icon: IconComponent, className = '', size = 20 } = props || {};

return     <IconComponent className={`w-${size} h-${size} ${className}`} />

}




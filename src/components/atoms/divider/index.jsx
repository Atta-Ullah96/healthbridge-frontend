export const Divider = (props) => {
 const { className = '' } = props || {}
 
    return  <hr className={`border-t border-light my-4 ${className}`} />
}
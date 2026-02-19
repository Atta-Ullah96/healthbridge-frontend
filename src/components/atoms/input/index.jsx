

function Input(props){
    const {type="text" , placeholder="" , value="" , handleInput= () =>{}} = props || {}


    function handleInputChange(e) {

            handleInput(e.target.value)
    }

    return (

        <input type={type} placeholder={placeholder} value={value} onChange={handleInputChange} />
    )
}


export default Input;
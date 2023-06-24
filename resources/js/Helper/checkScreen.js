import { useState } from "react";

const checkScreen = () => {

    const [ width, setWidth ] = useState(false)
    
    const screen = (screenWidth) => {
        window.innerWidth <= screenWidth ? setWidth(true) : setWidth(false);
    }
   

    return {width, screen}
}

export default checkScreen
  
  
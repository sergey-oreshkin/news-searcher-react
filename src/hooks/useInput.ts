import React, { useState } from "react";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

const useInput = (initialValue: string) => {
    const [value, setValue] = useState(initialValue);

    const changeHandler = (e: InputEvent) => {
        setValue(e.target.value);
    }
    return { value, onChange: changeHandler }
}

export default useInput;
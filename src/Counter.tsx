import * as React from "react";
import { Button } from "./components/Button/Button.tsx";

export function Counter() {
    const [count, setCount] =  React.useState(0);

    const setCounterHandler = () => {
        setCount(count + 1);
    }

    return (
        <>
            <Button onClick={() => {setCounterHandler()}}>
                count is {count}
            </Button>
        </>
    );
}

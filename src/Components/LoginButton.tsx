import { Button } from '@mantine/core';
import { useOutletContext } from 'react-router-dom';

function LoginButton(props: any) {
    const { setLoginModalOpened } = useOutletContext<{ setLoginModalOpened: React.Dispatch<React.SetStateAction<boolean>>, passedValue: any }>();

    return (
        <Button
            color="mfgreen.8"
            variant="outline"
            radius="xl"
            size="sm"
            {...props}
            onClick={() => {
                if (props.onClick) {
                    props.onClick();
                }
                setLoginModalOpened(true);
            }}
        >
            Login
        </Button>
    )
}

export default LoginButton
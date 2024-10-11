import { Button } from '@mantine/core';

function LoginButton(props: any) {

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
            }}
        >
            Login
        </Button>
    )
}

export default LoginButton
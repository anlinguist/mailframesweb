import { Button } from '@mantine/core';

function LoginButton(props: any) {
    return (
        <Button
            color="mfgreen.8"
            variant="outline"
            radius="xl"
            size="sm"
            {...props}
        >
            Login
        </Button>
    )
}

export default LoginButton
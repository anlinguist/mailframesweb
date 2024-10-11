import { Center, Stack, Text } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { GoogleButton } from './Modals/GoogleButton'
import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../services/firebase';

function SignInUI({ message, callback }: any) {
    const [error, setError] = useState('');

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            if (callback) callback();
        } catch (err: any) {
            setError(err.message);
        }
    };
    return (
        <Stack>
            {/* Welcome Message */}
            <Center>
                <Text size="md" fw={500}>
                    {message ?? `Welcome! Please sign in to continue`}
                </Text>
            </Center>

            {/* Error Message */}
            {error && (
                <Text c="red" size="sm" ta="center" display={"flex"} styles={{ root: { justifyContent: "center", alignItems: "center" } }}>
                    <IconAlertCircle size={16} />
                    {error}
                </Text>
            )}

            {/* Google Sign-In Button */}
            <GoogleButton fullWidth={true} radius="xl" onClick={handleGoogleLogin}>
                Sign in with Google
            </GoogleButton>
        </Stack>
    )
}

export default SignInUI
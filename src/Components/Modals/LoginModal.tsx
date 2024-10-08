import { useState } from 'react';
import { Modal, Text, Stack, Center } from '@mantine/core';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { GoogleButton } from './GoogleButton';
import { IconAlertCircle } from '@tabler/icons-react';

interface LoginModalProps {
    opened: boolean;
    onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ opened, onClose }) => {
    const [error, setError] = useState('');

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            onClose(); // Close the modal on successful login
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <Modal opened={opened} onClose={onClose} title={<Text size="lg" fw={700}>Login</Text>} centered>
            <Stack>
                {/* Welcome Message */}
                <Center>
                    <Text size="md" fw={500}>
                        Welcome! Please sign in to continue
                    </Text>
                </Center>

                {/* Error Message */}
                {error && (
                    <Text c="red" size="sm" ta="center" display={"flex"} styles={{root: {justifyContent: "center", alignItems: "center"}}}>
                        <IconAlertCircle size={16} />
                        {error}
                    </Text>
                )}

                {/* Google Sign-In Button */}
                <GoogleButton fullWidth={true} radius="xl" onClick={handleGoogleLogin}>
                    Sign in with Google
                </GoogleButton>
            </Stack>
        </Modal>
    );
};
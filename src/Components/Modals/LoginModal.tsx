import { Modal, Text } from '@mantine/core';
import SignInUI from '../SignInUI';

interface LoginModalProps {
    opened: boolean;
    onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ opened, onClose }) => {
    return (
        <Modal opened={opened} onClose={onClose} title={<Text size="lg" fw={700}>Login</Text>} centered>
            <SignInUI callback={onClose} />
        </Modal>
    );
};
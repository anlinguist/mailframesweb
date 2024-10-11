import { TextInput, Textarea, SimpleGrid, Group, Title, Button, Container } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import classes from './ContactForm.module.css';

export default function ContactForm() {
    const [loading, setLoading] = useState(false); // To show loading state during submission

    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
        validate: {
            name: (value) => value.trim().length < 2 ? 'Name must have at least 2 characters' : null,
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            subject: (value) => value.trim().length === 0 ? 'Subject is required' : null,
        },
    });

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            // Submit to Web3Forms API
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    access_key: "8707fc18-82cd-428f-a571-d29dd9532e50",
                    ...values
                })
            });

            if (response.ok) {
                notifications.show({
                    position: 'bottom-right',
                    title: 'Message sent!',
                    message: 'Your message has been successfully sent. We will get back to you soon!',
                    color: 'mfgreen.8',
                });

                // Reset the form
                form.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            notifications.show({
                title: 'Error',
                message: 'Something went wrong, please try again.',
                color: 'red',
            });
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    return (
        <Container size="sm" className={classes.wrapper}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Title order={2} size="h1" ta="center">
                    Get in touch
                </Title>

                <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
                    <TextInput
                        label="Name"
                        placeholder="Your name"
                        name="name"
                        variant="filled"
                        {...form.getInputProps('name')}
                    />
                    <TextInput
                        label="Email"
                        placeholder="Your email"
                        name="email"
                        variant="filled"
                        {...form.getInputProps('email')}
                    />
                </SimpleGrid>

                <TextInput
                    label="Subject"
                    placeholder="Subject"
                    mt="md"
                    name="subject"
                    variant="filled"
                    {...form.getInputProps('subject')}
                />
                <Textarea
                    mt="md"
                    label="Message"
                    placeholder="Your message"
                    maxRows={10}
                    minRows={5}
                    autosize
                    name="message"
                    variant="filled"
                    {...form.getInputProps('message')}
                />

                <Group justify="center" mt="xl">
                    <Button type="submit" size="md" color="mfgreen.8" loading={loading}>
                        Send message
                    </Button>
                </Group>
            </form>
        </Container>
    );
}

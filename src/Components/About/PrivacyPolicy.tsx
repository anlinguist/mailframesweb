import { Container, Title, Accordion } from '@mantine/core';
import classes from './PrivacyPolicy.module.css';
import parse from 'html-react-parser';

export default function PrivacyPolicy({ data }: any) {
    console.log(data);
    return (
        <Container size="sm" className={classes.wrapper}>
            <Title ta="center" className={classes.title}>
                Privacy Policy
            </Title>

            <Accordion variant="separated">
                {data.map((item: any, index: any) => (
                    <Accordion.Item key={index} className={classes.item} value={item.question}>
                        <Accordion.Control>{item.question}</Accordion.Control>
                        <Accordion.Panel>{parse(item.answer)}</Accordion.Panel>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    );
}
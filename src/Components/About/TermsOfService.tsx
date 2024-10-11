import { Container, Title, Accordion } from '@mantine/core';
import classes from './TermsOfService.module.css';
import parse from 'html-react-parser';

export default function TermsOfService({data}: any) {
    console.log(data);
  return (
    <Container size="sm" className={classes.wrapper}>
      <Title ta="center" className={classes.title}
      >
        Terms of Service
      </Title>

      <Accordion variant="separated">
                {data.map((item: any, index: any) => (
                    <Accordion.Item key={index} className={classes.item} value={item.header}>
                        <Accordion.Control>{item.header}</Accordion.Control>
                        <Accordion.Panel>{parse(item.description)}</Accordion.Panel>
                    </Accordion.Item>
                ))}</Accordion>
    </Container>
  );
}
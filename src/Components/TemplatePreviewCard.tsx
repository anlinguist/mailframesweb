import { useEffect, useState } from 'react';
import { Badge, Button, Card, Group, Skeleton, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './TemplatePreviewCard.module.css';

function TemplatePreviewCard({ template, source }: any) {
    const [htmlContent, setHtmlContent] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to post MJML to your server and get HTML
        const fetchHtml = async () => {
            try {
                const response = await fetch('https://mailframesnode-650411795943.us-central1.run.app/api/convert', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ mjml: template.mjml }),
                });
                const data = await response.json();
                setHtmlContent(data.html); // Assuming your server returns { html: '<html>' }
            } catch (error) {
                console.error('Error fetching HTML:', error);
                setHtmlContent(null);
            } finally {
                setLoading(false);
            }
        };

        fetchHtml();
    }, [template.mjml]);

    return (
        <div key={template.id} className="template-item">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                    {loading ? (
                        <Skeleton height={320} />
                    ) : (
                        <iframe
                            className='template-preview-iframe'
                            srcDoc={htmlContent || '<p>Preview unavailable</p>'}
                            style={{ width: '100%', height: '320px', border: 'none' }}
                        />
                    )}
                </Card.Section>

                <Group wrap='nowrap' justify="space-between" mt="md" mb="xs">
                    <Text truncate={"end"} fw={500}>{template.name}</Text>
                    <Badge className={classes.badge}>{`${source} template`}</Badge>
                </Group>

                <Link className="trylink" to={`/?templateId=${template.id}`}>
                    <Button color="mfgreen.8" fullWidth mt="md" radius="md">
                        Try it out
                    </Button>
                </Link>
            </Card>
        </div>
    );
}

export default TemplatePreviewCard;

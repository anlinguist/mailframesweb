import { Button } from '@mantine/core';
import './ContentPreview.css'

function ContentPreview({iframeSrc}: any) {
    const copy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied to clipboard!');
        });
    }
  return (
    <>
        <h2 className="content-title">Email Preview</h2>
        <iframe 
          srcDoc={iframeSrc} 
          title="Generated Email Preview" 
          className="preview-iframe"
        />
        <Button style={{marginBottom: 0}} onClick={(() => {copy(iframeSrc)})} type="submit" radius="xl" color="mfgreen.8" variant="filled" fullWidth>Copy this email</Button>
    </>
  )
}

export default ContentPreview;
import { ImperativePanelHandle, Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ContentPreview from "./ContentPreview";
import MJMLEditor from "./MJMLEditor";
import { useEffect, useRef, useState } from "react";
import './MainContent.css';
import useModal from "../Modals/useModal";
import Modal from "../Modals/Modal";
import { useEditor } from "../Contexts/useEditor";
import { Button } from "@mantine/core";
import { useOutletContext } from "react-router-dom";

function MainContent() {
    const { isMobile }: any = useOutletContext();
    const { value } = useEditor() as any;
    const [clickCount, setClickCount] = useState(0);
    const [panelSize, setPanelSize] = useState<number>(50);
    const [previousPanelSize, setPreviousPanelSize] = useState<number>(50);
    const [iframeSrc, setIframeSrc] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const { isOpen, openModal, closeModal } = useModal();
    const ref = useRef<ImperativePanelHandle>(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mjml: value })
        })
            .then((res) => res.json())
            .then((data) => {
                setIframeSrc(data.html);
            });
    }, [value]);

    const resized = (size: number) => {
        if (!isDragging) {
            setPanelSize(size);
        }
    };
    const handleDragging = (dragging: boolean) => {
        setIsDragging(dragging);

        if (!dragging) {
            setPanelSize(ref.current?.getSize() ?? 50);
        }
    };
    const trackDoubleClick = () => {
        if (Date.now() - clickCount < 300) {
            resizePanel();
        }
        setClickCount(Date.now());
    };
    const resizePanel = () => {
        const panel = ref.current;
        if (panel) {
            const currentSize = panel.getSize();
            if (currentSize === 50 && previousPanelSize !== 50) {
                panel.resize(previousPanelSize);
            } else {
                setPreviousPanelSize(currentSize);
                panel.resize(50);
            }
        }
    };

    return (
        <div id="main-content">
            {isMobile ? (
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%' }}>
                    <MJMLEditor />
                    <Button style={{marginBottom: 0}} onClick={openModal} type="submit" radius="xl" color="mfgreen.8" variant="filled" fullWidth>Preview</Button>
                    {isOpen && (
                        <Modal closeModal={closeModal}>
                            <ContentPreview iframeSrc={iframeSrc} />
                        </Modal>
                    )}
                </div>
            ) : (
                <PanelGroup direction="horizontal" style={{ overflow: 'clip' }}>
                    <Panel onResize={resized} ref={ref} defaultSize={50} minSize={20} style={{ height: '100%', display: "flex", flexDirection: "column" }}>
                        <MJMLEditor />
                    </Panel>
                    <PanelResizeHandle
                        className={`panel-separator${isDragging ? ' active' : ''}`}
                        onClick={trackDoubleClick}
                        onDragging={handleDragging}
                    />
                    <Panel defaultSize={50} minSize={20} style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'clip' }}>
                        <ContentPreview key={panelSize} iframeSrc={iframeSrc} />
                    </Panel>
                </PanelGroup>
            )}
        </div>
    );
}

export default MainContent;
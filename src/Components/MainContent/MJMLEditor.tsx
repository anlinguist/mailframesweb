import { useEffect, useRef, useState } from "react";
import CodeMirror, { EditorView, EditorState } from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
import { linter, lintGutter } from '@codemirror/lint';
import { syntaxTree } from '@codemirror/language';
import { autocompletion, snippetCompletion } from '@codemirror/autocomplete';
import mjml2html from 'mjml-browser';
import { useEditor } from "../Contexts/useEditor";
import { EditorSelection } from '@codemirror/state';
import { ImperativePanelHandle, Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Alert, Button, Paper, Textarea, Tooltip } from "@mantine/core";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import LoginButton from "../LoginButton";
import { IconInfoCircle } from "@tabler/icons-react";
import {
    isWithinTokenLimit
} from 'gpt-tokenizer'

declare global {
    interface Window {
        ai: any;
    }
}

export const mjmlTagAttributes: any = {
    'mjml': {
        attrs: {
            'version': null,
        },
        children: ['mj-head', 'mj-body', 'mj-raw'],
    },
    'mj-accordion': {
        attrs: {
            border: null,
            'css-class': null,
            'font-family': null,
            'icon-align': null,
            'icon-height': null,
            'icon-position': null,
            'icon-unwrapped-alt': null,
            'icon-unwrapped-url': null,
            'icon-width': null,
            'icon-wrapped-alt': null,
            'icon-wrapped-url': null,
            'padding-bottom': null,
            'padding-left': null,
            'padding-right': null,
            'padding-top': null,
            padding: null,
        },
        children: ['mj-accordion-element', 'mj-raw']
    },
    'mj-accordion-element': {
        attrs: {
            'background-color': null,
            border: null,
            'css-class': null,
            'font-family': null,
            'icon-align': null,
            'icon-height': null,
            'icon-position': null,
            'icon-unwrapped-alt': null,
            'icon-unwrapped-url': null,
            'icon-width': null,
            'icon-wrapped-alt': null,
            'icon-wrapped-url': null,
        },
        children: ['mj-accordion-title', 'mj-accordion-text', 'mj-raw']
    },
    'mj-accordion-title': {
        attrs: {
            'background-color': null,
            border: null,
            'css-class': null,
            'font-family': null,
            'icon-align': null,
            'icon-height': null,
            'icon-position': null,
            'icon-unwrapped-alt': null,
            'icon-unwrapped-url': null,
            'icon-width': null,
            'icon-wrapped-alt': null,
            'icon-wrapped-url': null,
        },
    },
    'mj-accordion-text': {
        attrs: {
            'background-color': null,
            color: null,
            'css-class': null,
            'font-family': null,
            'font-size': null,
            'font-weight': null,
            'letter-spacing': null,
            'line-height': null,
            padding: null,
            'padding-bottom': null,
            'padding-left': null,
            'padding-right': null,
            'padding-top': null,
        },
    },
    'mj-attributes': {
        attrs: {},
        children: [/^.*^/]
    },
    'mj-body': {
        attrs: {
            'background-color': null,
            'css-class': null,
            'width': null,
        },
        children: ['mj-raw', 'mj-section', 'mj-wrapper', 'mj-hero']
    },
    'mj-button': {
        attrs: {
            'background-color': null,
            'container-background-color': null,
            border: null,
            'border-bottom': null,
            'border-left': null,
            'border-right': null,
            'border-top': null,
            'border-radius': null,
            'font-style': null,
            'font-size': null,
            'font-weight': null,
            'font-family': null,
            color: null,
            'text-decoration': null,
            'text-transform': null,
            align: null,
            'vertical-align': null,
            'line-height': null,
            href: null,
            rel: null,
            'inner-padding': null,
            padding: null,
            'padding-top': null,
            'padding-bottom': null,
            'padding-left': null,
            'padding-right': null,
            width: null,
            height: null,
            'css-class': null,
        },
    },
    'mj-carousel': {
        attrs: {
            align: null,
            'border-radius': null,
            'background-color': null,
            thumbnails: null,
            'tb-border': null,
            'tb-border-radius': null,
            'tb-hover-border-color': null,
            'tb-selected-border-color': null,
            'tb-width': null,
            'left-icon': null,
            'right-icon': null,
            'icon-width': null,
            'css-class': null,
        },
        children: ['mj-carousel-image']
    },
    'mj-carousel-image': {
        attrs: {
            src: null,
            'thumbnails-src': null,
            href: null,
            rel: null,
            alt: null,
            title: null,
            'css-class': null,
        },
    },
    'mj-class': {
        attrs: {
            name: null,
        },
    },
    'mj-column': {
        attrs: {
            'background-color': null,
            border: null,
            'border-bottom': null,
            'border-left': null,
            'border-right': null,
            'border-top': null,
            'border-radius': null,
            width: null,
            'vertical-align': null,
            'css-class': null,
        },
        children: [
            'mj-accordion',
            'mj-button',
            'mj-carousel',
            'mj-divider',
            'mj-image',
            'mj-raw',
            'mj-social',
            'mj-spacer',
            'mj-table',
            'mj-text',
            'mj-navbar',
        ]
    },
    'mj-divider': {
        attrs: {
            'border-color': null,
            'border-style': null,
            'border-width': null,
            width: null,
            'container-background-color': null,
            padding: null,
            'padding-top': null,
            'padding-bottom': null,
            'padding-left': null,
            'padding-right': null,
            'css-class': null,
        },
    },
    'mj-font': {
        attrs: {
            href: null,
            name: null,
            'css-class': null,
        },
    },
    'mj-group': {
        attrs: {
            width: null,
            'vertical-align': null,
            'background-color': null,
            'css-class': null,
        },
        children: ['mj-column', 'mj-raw']
    },
    'mj-head': {
        children: [
            'mj-attributes',
            'mj-breakpoint',
            'mj-html-attributes',
            'mj-font',
            'mj-preview',
            'mj-style',
            'mj-title',
            'mj-raw',
        ]
    },
    'mj-hero': {
        attrs: {
            width: null,
            mode: null,
            height: null,
            'background-width': null,
            'background-height': null,
            'background-url': null,
            'background-color': null,
            'background-position': null,
            padding: null,
            'padding-top': null,
            'padding-right': null,
            'padding-left': null,
            'padding-bottom': null,
            'vertical-align': null,
            'css-class': null,
        },
        children: [
            'mj-accordion',
            'mj-button',
            'mj-carousel',
            'mj-divider',
            'mj-image',
            'mj-social',
            'mj-spacer',
            'mj-table',
            'mj-text',
            'mj-navbar',
            'mj-raw',
        ]
    },
    'mj-html-attribute': {},
    'mj-html-attributes': {
        children: ['mj-selector']
    },
    'mj-image': {
        'selfClosing': true,
        attrs: {
            padding: null,
            'padding-top': null,
            'padding-bottom': null,
            'padding-left': null,
            'padding-right': null,
            'container-background-color': null,
            border: null,
            'border-radius': null,
            width: null,
            height: null,
            src: null,
            href: null,
            rel: null,
            alt: null,
            align: null,
            title: null,
            'css-class': null,
        },
    },
    'mj-invoice': {
        attrs: {
            align: null,
            color: null,
            'font-family': null,
            'font-size': null,
            'line-height': null,
            border: null,
            'container-background-color': null,
            padding: null,
            'padding-top': null,
            'padding-bottom': null,
            'padding-left': null,
            'padding-right': null,
            intl: null,
            format: null,
            'css-class': null,
        },
    },
    'mj-invoice-item': {
        attrs: {
            color: null,
            'font-family': null,
            'font-size': null,
            'line-height': null,
            border: null,
            'text-align': null,
            padding: null,
            'padding-top': null,
            'padding-bottom': null,
            'padding-left': null,
            'padding-right': null,
            name: null,
            price: null,
            quantity: null,
            'css-class': null,
        },
    },
    'mj-location': {
        attrs: {
            color: null,
            'font-family': null,
            'font-size': null,
            'font-weight': null,
            href: null,
            rel: null,
            padding: null,
            'padding-top': null,
            'padding-bottom': null,
            'padding-left': null,
            'padding-right': null,
            'img-src': null,
            'css-class': null,
        },
    },
    'mj-navbar': {
        attrs: {
            hamburger: null,
            align: null,
            'ico-open': null,
            'ico-close': null,
            'ico-padding': null,
            'ico-padding-top': null,
            'ico-padding-right': null,
            'ico-padding-bottom': null,
            'ico-padding-left': null,
            'ico-align': null,
            'ico-color': null,
            'ico-font-size': null,
            'ico-font-family': null,
            'ico-text-transform': null,
            'ico-text-decoration': null,
            'ico-line-height': null,
            'css-class': null,
        },
        children: ['mj-navbar-link', 'mj-raw']
    },
    'mj-navbar-link': {
        attrs: {
            color: null,
            'font-family': null,
            'font-size': null,
            'font-style': null,
            'font-weight': null,
            'line-height': null,
            'text-decoration': null,
            'text-transform': null,
            padding: null,
            'padding-top': null,
            'padding-bottom': null,
            'padding-left': null,
            'padding-right': null,
            rel: null,
            'css-class': null,
        },
    },
    'mj-section': {
        attrs: {
            'full-width': null,
            border: null,
            'border-bottom': null,
            'border-left': null,
            'border-right': null,
            'border-top': null,
            'border-radius': null,
            'background-color': null,
            'background-url': null,
            'background-repeat': null,
            'background-size': null,
            'vertical-align': null,
            'text-align': null,
            padding: null,
            'padding-top': null,
            'padding-bottom': null,
            'padding-left': null,
            'padding-right': null,
            direction: null,
            'css-class': null,
        },
        children: ['mj-column', 'mj-group', 'mj-raw']
    },
    'mj-selector': {
        children: ['mj-html-attribute']
    },
    'mj-social': {
        attrs: {
            align: null,
            'border-radius': null,
            'container-background-color': null,
            color: null,
            'font-family': null,
            'font-size': null,
            'font-style': null,
            'font-weight': null,
            'icon-size': null,
            'inner-padding': null,
            'line-height': null,
            mode: null,
            'padding-bottom': null,
            'padding-left': null,
            'padding-right': null,
            'padding-top': null,
            padding: null,
            'table-layout': null,
            'vertical-align': null,
            'css-class': null,
        },
        children: ['mj-social-element', 'mj-raw']
    },
    'mj-social-element': {
        attrs: {
            align: null,
            'background-color': null,
            color: null,
            'border-radius': null,
            'font-family': null,
            'font-size': null,
            'font-style': null,
            'font-weight': null,
            href: null,
            'icon-color': null,
            'icon-size': null,
            'line-height': null,
            name: null,
            'padding-bottom': null,
            'padding-left': null,
            'padding-right': null,
            'padding-top': null,
            padding: null,
            src: null,
            target: null,
            'text-decoration': null,
            'css-class': null,
        },
    },
    'mj-spacer': {
        attrs: {
            height: null,
            'css-class': null,
            'container-background-color': null,
            padding: null,
            'padding-bottom': null,
            'padding-left': null,
            'padding-right': null,
            'padding-top': null,
        },
    },
    'mj-table': {
        attrs: {
            color: null,
            cellpadding: null,
            cellspacing: null,
            'font-family': null,
            'font-size': null,
            'line-height': null,
            'container-background-color': null,
            padding: null,
            'padding-top': null,
            'padding-bottom': null,
            'padding-left': null,
            'padding-right': null,
            width: null,
            'table-layout': null,
            'css-class': null,
        },
    },
    'mj-text': {
        attrs: {
            align: null,
            'background-color': null,
            color: null,
            'container-background-color': null,
            'font-family': null,
            'font-size': null,
            'font-style': null,
            'font-weight': null,
            height: null,
            'letter-spacing': null,
            'line-height': null,
            'padding-bottom': null,
            'padding-left': null,
            'padding-right': null,
            'padding-top': null,
            padding: null,
            'text-decoration': null,
            'text-transform': null,
            'vertical-align': null,
            'css-class': null,
        },
    },
    'mj-wrapper': {
        attrs: {
            'full-width': null,
            border: null,
            'border-bottom': null,
            'border-left': null,
            'border-right': null,
            'border-top': null,
            'border-radius': null,
            'background-color': null,
            'background-url': null,
            'background-repeat': null,
            'background-size': null,
            'vertical-align': null,
            'text-align': null,
            padding: null,
            'padding-top': null,
            'padding-bottom': null,
            'padding-left': null,
            'padding-right': null,
            'css-class': null,
        },
        children: ['mj-hero', 'mj-raw', 'mj-section']
    },
}

function mjmlCompletion(context: any) {
    const word = context.matchBefore(/[\w-]*/);
    if (word.from === word.to && !context.explicit) return null;

    const nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1);
    let options: any[] = [];

    if (nodeBefore.name === 'TagName' || nodeBefore.name === 'OpenTag') {
        options = Object.keys(mjmlTagAttributes).map((tag) => {
            const isSelfClosing = mjmlTagAttributes[tag]?.selfClosing || false;
            const snippetText = isSelfClosing
                ? `${tag} #{1}/>`
                : `${tag}>\n\t#{1}\n</${tag}>`;


            return snippetCompletion(snippetText, {
                label: tag,
                type: 'keyword',
                info: isSelfClosing ? 'Self-closing tag' : 'Tag with content',
                boost: 99,
            });
        });
    } else if (nodeBefore.name === 'AttributeName' || nodeBefore.parent?.name === 'Attribute') {
        let current: any = nodeBefore;
        while (current && current.name !== 'OpenTag' && current.name !== 'SelfClosingTag') {
            current = current.parent;
        }

        if (current && (current.name === 'OpenTag' || current.name === "SelfClosingTag")) {
            let tagNameNode = null;
            for (let child = current.firstChild; child; child = child.nextSibling) {
                if (child.name === 'TagName') {
                    tagNameNode = child;
                    break;
                }
            }

            if (tagNameNode) {
                const tagName = context.state.doc
                    .sliceString(tagNameNode.from, tagNameNode.to)
                    .replaceAll('<', '')
                    .replaceAll('>', '');

                const attributesObj = mjmlTagAttributes[tagName]?.attrs || {};
                const attributeNames = Object.keys(attributesObj);

                options = attributeNames.map((attr) =>
                    snippetCompletion(`${attr}="#{1}"`, {
                        label: attr,
                        type: 'attribute',
                        boost: 99,
                    })
                );
            }
        }
    }

    return {
        from: word.from,
        options,
    };
}

function mjmlLinter(view: any) {
    const diagnostics: any[] = [];
    const code = view.state.doc.toString();
    if (!code) {
        return diagnostics;
    }

    let mjmlResult: any = false;
    try {
        mjmlResult = mjml2html(code, { validationLevel: 'soft' });
    } catch (e: any) {
        console.log(e);
    }

    if (mjmlResult && mjmlResult.errors && mjmlResult.errors.length > 0) {
        mjmlResult.errors.forEach((error: any) => {
            const line = error.line - 1;
            const from = view.state.doc.line(line + 1).from;
            const to = from + error.tagName.length + 2;

            diagnostics.push({
                from,
                to,
                severity: 'error',
                message: error.message,
            });
        });
    }

    return diagnostics;
}

function MJMLEditor() {
    const { setLoginModalOpened, passedValue } = useOutletContext<{ setLoginModalOpened: React.Dispatch<React.SetStateAction<boolean>>, passedValue: any }>();
    const { user } = useAuth();
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const { value, setValue } = useEditor() as any;
    const [isDarkMode, setIsDarkMode] = useState(false);
    const editorRef = useRef<any>(null);
    const [editorState, setEditorState] = useState<EditorState | null>(null);
    const [editorView, setEditorView] = useState<EditorView | null>(null);
    const [promptValue, setPromptValue] = useState('');
    const [generating, setGenerating] = useState(false);
    const [promptsRemaining, setPromptsRemaining] = useState(0);
    const [overLimit, setOverLimit] = useState(false);
    const [exceededDailyLimit, setExceededDailyLimit] = useState(false);

    const [clickCount, setClickCount] = useState(0);
    const [previousPanelSize, setPreviousPanelSize] = useState<number>(30);
    const [isDragging, setIsDragging] = useState(false);

    const ref = useRef<ImperativePanelHandle>(null);
    const alertIcon = <IconInfoCircle />;

    const onChange = (newValue: any) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (passedValue) {
            writeText(passedValue);
        }
    }, [passedValue]);

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const updateTheme = () => {
            setIsDarkMode(darkModeMediaQuery.matches);
        };

        updateTheme();

        darkModeMediaQuery.addEventListener('change', updateTheme);

        return () => {
            darkModeMediaQuery.removeEventListener('change', updateTheme);
        };
    }, []);

    useEffect(() => {
        // if user changes, update the prompts remaining
        if (user) {
            updatePromptsRemaining();
        }
    }, [user]);

    const updatePromptsRemaining = async () => {

        let endpoint = 'https://mailframesnode-650411795943.us-central1.run.app/api/promptsremaining/api/promptsremaining'
        const token = await user?.getIdToken(true)
        let raw = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        let json = await raw.json()
        setPromptsRemaining(json.remaining);

        if (json.remaining <= 0) {
            setExceededDailyLimit(true);
        }
    }

    const darkTheme = createTheme({
        theme: 'dark',
        settings: {
            background: 'transparent',
            foreground: '#75baff',
            caret: '#5d00ff',
            selection: '#036dd626',
            selectionMatch: '#036dd626',
            lineHighlight: '#8a91991a',
            gutterBackground: '#292c33',
            gutterForeground: '#8a919966',
            gutterBorder: '#3a3c44',
        },
        styles: [
            { tag: t.comment, color: '#787b8099' },
            { tag: t.variableName, color: '#0080ff' },
            { tag: [t.string, t.special(t.brace)], color: '#C3E88D' },
            { tag: t.number, color: '#5c6166' },
            { tag: t.bool, color: '#5c6166' },
            { tag: t.null, color: '#5c6166' },
            { tag: t.keyword, color: '#5c6166' },
            { tag: t.operator, color: '#5c6166' },
            { tag: t.className, color: '#5c6166' },
            { tag: t.definition(t.typeName), color: '#5c6166' },
            { tag: t.typeName, color: '#FF5370' },
            { tag: t.angleBracket, color: '#FF5370' },
            { tag: t.tagName, color: '#FF5370' },
            { tag: t.attributeName, color: '#C792EA' },
        ],
    });

    // @ts-ignore
    const writeText = (text: string) => {
        if (!editorView || !editorState) {
            console.warn('Editor instance is not available.');
            return;
        }
        let index = 0;
        const chunkSize = 10; // Number of characters to insert at a time
        const delay = 50; // Reduced delay for faster typing

        // Clear the current content
        editorView.dispatch({
            changes: { from: 0, to: editorView.state.doc.length },
        });
        setValue('');

        const typeCharacter = () => {
            if (index < text.length) {
                const charsToAdd = text.slice(index, index + chunkSize); // Get next chunk
                editorView.dispatch({
                    changes: { from: editorView.state.doc.length, insert: charsToAdd },
                });
                setValue(editorView.state.doc.toString());
                index += chunkSize; // Move to the next chunk
                setTimeout(typeCharacter, delay); // Reduced delay
            } else {
                editorView.focus();
                editorView.dispatch({
                    selection: EditorSelection.cursor(editorView.state.doc.length),
                });
            }
        };

        typeCharacter();
    };

    const generateMjml = async (e: any) => {
        e.preventDefault();
        setGenerating(true);
        let endpoint = 'https://mailframesnode-650411795943.us-central1.run.app/api/promptsremaining/api/generate'
        let data = { prompt: promptValue }
        const token = await user?.getIdToken(true)

        let res = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        let json = await res.json()
        setGenerating(false);
        writeText(json.output);
        updatePromptsRemaining();
    }

    const handleDragging = (dragging: boolean) => {
        setIsDragging(dragging);
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
            if (currentSize === 30 && previousPanelSize !== 30) {
                panel.resize(previousPanelSize);
            } else {
                setPreviousPanelSize(currentSize);
                panel.resize(30);
            }
        }
    };

    return (
        <>
            <PanelGroup direction="vertical" style={{ overflow: 'clip' }}>
                <Panel
                    ref={ref}
                    defaultSize={30}
                    minSize={30}
                    style={{ display: "flex", flexDirection: "column", position: "relative" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Overlay that appears on hover */}
                    {
                        (!user || exceededDailyLimit) &&
                        <Paper
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                bottom: "15px",
                                backdropFilter: isHovered ? "blur(5px)" : "none",
                                zIndex: 1,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                                borderRadius: "xl",
                                opacity: isHovered ? .97 : 0,
                                visibility: isHovered ? 'visible' : 'hidden',
                                transition: "opacity 0.3s ease, visibility 0.3s ease",
                            }}
                        >
                            {
                                !user &&
                                <>
                                    <Alert style={{ width: "80%" }} variant="light" color="mfgreen.8" radius="md" title="" icon={alertIcon}>
                                        To use AI, you'll need to sign in - it's free!
                                    </Alert>
                                    <LoginButton onClick={(() => { setLoginModalOpened(true) })} variant={"filled"} />
                                </>
                            }
                            {
                                user && exceededDailyLimit &&
                                <Alert style={{ width: "80%" }} variant="light" color="mfgreen.8" radius="md" title="" icon={alertIcon}>
                                    You've exceeded the daily limit of 10 prompts. Come back tomorrow!
                                </Alert>
                            }
                        </Paper>
                    }

                    <h2 className="content-title">AI Prompt <Tooltip withArrow={true} label={`You have ${promptsRemaining} prompts left today.`}><span>{`${promptsRemaining} / 10`}</span></Tooltip></h2>
                    <form className="ai-prompt-form" onSubmit={generateMjml}>
                        <Textarea
                            aria-label="AI Prompt"
                            className="ai-prompt-editor"
                            placeholder="Enter a prompt for AI to generate MJML"
                            required
                            onChange={((e) => {
                                setPromptValue(e.currentTarget.value)
                                isWithinTokenLimit(e.currentTarget.value, 500) === false ? setOverLimit(true) : setOverLimit(false);
                            })}
                            value={promptValue}
                            styles={{
                                wrapper: { flex: "1", display: "flex" },
                                input: { flex: "1" },
                            }}
                        />
                        <Tooltip 
                            withArrow={true}
                            label={overLimit ? "You've exceeded the token limit of 500 tokens." : "Prompt cannot be empty."}
                            // @ts-ignore
                            disabled={(!overLimit && promptValue.trim())}>
                            <Button
                                className="generatemjml"
                                type="submit"
                                radius="xl"
                                color="mfgreen.8"
                                variant="filled"
                                fullWidth
                                loading={generating ? true : false}
                                disabled={overLimit || !promptValue.trim()}
                            >
                                Generate MJML
                            </Button>
                        </Tooltip>
                    </form>
                </Panel>


                <PanelResizeHandle
                    className={`panel-separator-horiz${isDragging ? ' active' : ''}`}
                    onClick={trackDoubleClick}
                    onDragging={handleDragging}
                />
                <Panel defaultSize={70} minSize={30} style={{ display: "flex", flexDirection: "column" }}>
                    <h2 className="content-title">Editor</h2>
                    <CodeMirror
                        ref={editorRef}
                        className="mjml-code-editor"
                        value={value}
                        extensions={[
                            html({ selfClosingTags: true }),
                            autocompletion({ override: [mjmlCompletion] }),
                            linter(mjmlLinter, { tooltipFilter: () => [], markerFilter: () => [] }),
                            lintGutter(),
                        ]}
                        theme={isDarkMode ? darkTheme : 'light'}
                        onChange={onChange}
                        onCreateEditor={(editorView: EditorView, editorState: EditorState) => {
                            setEditorState(editorState)
                            setEditorView(editorView)
                        }}
                    />
                </Panel>
            </PanelGroup>
        </>
    );
}

export default MJMLEditor;
import { useState } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

export default function Wysiwyg() {

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };

    const handlePrintContent = () => {
        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        const htmlContent = draftToHtml(rawContentState);
        console.log(htmlContent);
    };
    return (
        <>
            <div className="h-full">
                <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName "
                    editorClassName="editorClassName min-h-[50vh]"
                    onEditorStateChange={onEditorStateChange}
                    mention={{
                        separator: " ",
                        trigger: "@",
                        suggestions: [
                            { text: "APPLE", value: "apple" },
                            { text: "BANANA", value: "banana", url: "banana" },
                            { text: "CHERRY", value: "cherry", url: "cherry" },
                            { text: "DURIAN", value: "durian", url: "durian" },
                            { text: "EGGFRUIT", value: "eggfruit", url: "eggfruit" },
                            { text: "FIG", value: "fig", url: "fig" },
                            { text: "GRAPEFRUIT", value: "grapefruit", url: "grapefruit" },
                            { text: "HONEYDEW", value: "honeydew", url: "honeydew" }
                        ]
                    }}
                    
                />
            </div>
            <button onClick={handlePrintContent}>Print Content</button>
        </>
    )
}

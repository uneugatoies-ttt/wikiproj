import React from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import TiptapEditor from '../components/text_editor/tiptap/TiptapEditor';

function Practices() {
    return (
        <div>
            <TiptapEditor />
        </div>
    );
}

export default Practices;


















// using a class. an older approach.
/*
class MyEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editorState: EditorState.createEmpty()};
        this.onChange = editorState => this.setState({editorState});
    }

    render() {
        return (
            <Editor editorState={this.state.editorState} onChange={this.onChange} />
        );
    }
}
*/
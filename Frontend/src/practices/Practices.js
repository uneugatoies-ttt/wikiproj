import React from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import TiptapEditor from '../components/text_editor/tiptap/TiptapEditor';
import { Button } from '@mui/material';

/*
  > Since useCurrentEditor mysteriously returns null in this component,
  I somehow have to find a way to manage to cue 'MenuBar' to convert
  the content into JSON and return to this component; it seems not that hard,
  but I can't think of any meaningful way.

  > Well, I think I just found a way: that 'flag' below. 'Practices' give it to 'TiptapEditor',
  and then again 'TiptapEditor' gives it to 'MenuBar', so that 'editor.getJSON()' can be called
  within 'MenuBar'.



  > So the following example is the resulting, converted JSON from the original
  text, which is just gibberish. I think I can store this JSON data
  in the database.
  And if I ever have to manipulate the JSON data out of the domain of the editor,
  I should make the data conform with this format.

  {
    "type": "doc",
    "content": [
        {
            "type": "paragraph",
            "content": [
                {
                    "type": "text",
                    "text": "Example Text\nasdf"
                }
            ]
        },
        {
            "type": "paragraph",
            "content": [
                {
                    "type": "text",
                    "text": "oOOOOO"
                }
            ]
        },
        {
            "type": "paragraph"
        },
        {
            "type": "paragraph"
        },
        {
            "type": "paragraph"
        },
        {
            "type": "paragraph",
            "content": [
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "bold"
                        },
                        {
                            "type": "italic"
                        },
                        {
                            "type": "strike"
                        }
                    ],
                    "text": "doodledooooooooo"
                }
            ]
        }
    ]
} 

*/

const Practices = () => {
  const [flag, setFlag] = React.useState(false);

  React.useEffect(() => {
    setFlag(false);
  }, [flag]);

  const retrieveContent = () => {
    console.log("asdfasdf");
    setFlag(true);
  }

  const content = {
      "type": "doc",
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "Example Text\nasdf"
            }
          ]
        },
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "oOOOOO"
            }
          ]
        }
      ]
    };



    return (
        <div>
            <TiptapEditor 
              content={content} 
              flagToConvert={flag}
            />
            <Button
              onClick={() => retrieveContent()}
            >
              CONFIRM
            </Button>
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
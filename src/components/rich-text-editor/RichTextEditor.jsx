import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class RichTextEditor extends Component {
    static propTypes = {
        // detail: PropTypes.string
    }
    constructor(props) {
        super(props)
        const detail = this.props.initialImgs
        console.log(detail)
        const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
        if (detail) {
            const contentBlock = htmlToDraft(detail);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                this.state = {
                    editorState,
                };
            }
        } else {
            this.state = {
                editorState: EditorState.createEmpty(),
            }
        }
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };
    uploadImageCallBack = (file) => {
        return new Promise(
            (resolve, reject) => {
              const xhr = new XMLHttpRequest();
              xhr.open('POST', '/manage/img/upload');
              xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
              const data = new FormData();
              data.append('image', file);
              xhr.send(data);
              xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
              });
              xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
              });
            }
          );
    }
    getDetail = () => draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    componentWillMount() {

    }
    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    wrapperStyle={{}}
                    editorStyle={{ border: '1px solid gray', height: 200, padding: '0 10px' }}
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                        image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
                      }}
                />
                <textarea
                    style={{ display: 'none' }}
                    disabled
                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                />
            </div>
        );
    }
}
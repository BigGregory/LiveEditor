import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

import './code-editor.css';

interface CodeEditorProps {
  initialValue: string | undefined;
  editorValue: string | undefined;
  onChange: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  editorValue,
  onChange,
}) => {
  const onFormatClick = () => {
    const formatted =
      editorValue &&
      prettier
        .format(editorValue, {
          parser: 'babel',
          plugins: [parser],
          useTabs: false,
          semi: true,
          singleQuote: true,
        })
        .replace(/\n$/, '');
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}>
        Format
      </button>
      <MonacoEditor
        defaultValue={initialValue}
        value={editorValue}
        onChange={onChange}
        language="javascript"
        theme="vs-dark"
        height="100%"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;

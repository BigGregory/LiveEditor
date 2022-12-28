import React, { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import './text-editor.css';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell: { id, content } }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div ref={ref} className="text-editor">
        <MDEditor
          value={content}
          onChange={(val) => updateCell(id, val || '')}
        />
      </div>
    );
  }

  return (
    <div onClick={() => setEditing(true)} className="text-editor card">
      <div className="card-content">
        <MDEditor.Markdown
          source={content || 'Clickto edit'}
          style={{ whiteSpace: 'pre-wrap' }}
        />
      </div>
    </div>
  );
};

export default TextEditor;

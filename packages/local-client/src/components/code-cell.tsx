import React, { useEffect } from 'react';

import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useCumulativeCode } from '../hooks/use-cumulative-code';
import { Cell } from '../state';

import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import './code-cell.css';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell = ({ cell: { id, content } }: CodeCellProps) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[id]);
  const cumulativeCode = useCumulativeCode(id);

  useEffect(() => {
    const timer = setTimeout(async () => {
      createBundle(id, cumulativeCode);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cumulativeCode, id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={content}
            editorValue={content}
            onChange={(value: any) => updateCell(id, value)}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;

import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import * as esbuild from 'esbuild-wasm';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bulmaswatch/superhero/bulmaswatch.min.css';

import { store } from './state';
import CellList from './components/cell-list';
// import './styles.css';

const App = () => {
  useEffect(() => {
    esbuild.initialize({
      worker: true,
      wasmURL: './esbuild.wasm',
    });
  }, []);

  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);

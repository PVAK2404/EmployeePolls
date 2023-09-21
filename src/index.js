import ReactDOM from 'react-dom/client';

import Gate from 'stores';
import App from './App';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Gate>
    <App />
  </Gate>,
);

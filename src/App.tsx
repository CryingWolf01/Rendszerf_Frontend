import {Routes, Route} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Layout from './Layout/Layout';
import PageNotFound from './views/PageNotFound';
import Home from './views/Home';

function App() {
  const { i18n } = useTranslation();
  return (
    <Layout>
        <Routes>
          <Route path="/home" element={Home} />
          <Route element={PageNotFound} />
        </Routes>
    </Layout>
  );
}

export default App;

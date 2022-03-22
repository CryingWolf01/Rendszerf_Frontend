import {Routes, Route} from "react-router-dom";
import Layout from './Layout/Layout';
import PageNotFound from './views/PageNotFound';
import Home from './views/Home';

function App() {
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

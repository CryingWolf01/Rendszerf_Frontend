import {Routes, Route} from "react-router-dom";
import Layout from './components/Layout/Layout';
import PageNotFound from './views/PageNotFound';
import Home from './views/Home';
import User from "./views/User/User";
import { Suspense } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import supportedLocales from "./config/supportedLocales";
import DateFnsUtils from "@date-io/date-fns";
import LayoutLoading from "./components/LayoutLoading";
import { useTranslation } from "react-i18next";
import Tool from "./views/Tool/Tool";
import Education from "./views/Education/Education";
import ToolCategory from "./views/ToolCategory/ToolCategory";

function App() {
  const { i18n } = useTranslation();
  return (
    <MuiPickersUtilsProvider
      utils={DateFnsUtils}
      locale={supportedLocales[i18n.language]}
    >
      <Suspense fallback={<LayoutLoading />}>
        <Layout>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/home" element={<Home/>} />
              <Route path="/user" element={<User/>} />
              <Route path="/tool" element={<Tool/>} />
              <Route path="/tool-category" element={<ToolCategory/>} />
              <Route path="/education" element={<Education/>} />
              <Route element={<PageNotFound/>} />
            </Routes>
        </Layout>
      </Suspense>
    </MuiPickersUtilsProvider>
  );
}

export default App;

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
import UserCreate from "./views/User/UserCreate";
import ToolCategoryCreate from "./views/ToolCategory/ToolCategoryCreate";
import ToolCreate from "./views/Tool/ToolCreate";
import EducationCreate from "./views/Education/EducationCreate";
import UserModify from "./views/User/UserModify";
import UserDetails from "./views/User/UserDetails";
import ToolModify from "./views/Tool/ToolModify";
import ToolCategoryModify from "./views/ToolCategory/ToolCategoryModify";
import ToolCategoryDetails from "./views/ToolCategory/ToolCategoryDetails";
import EducationModify from "./views/Education/EducationModify";
import EducationToolCategoryCreate from "./views/ToolCategory/components/EducationToolCategoryCreate";
import UserEducationCreate from "./views/User/components/UserEducationCreate";

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
            {/*Default Routes*/}
            <Route element={<PageNotFound/>} />
            <Route path="/" element={<Home/>} />
            <Route path="/home" element={<Home/>} />
            {/*Users*/}
            <Route path="/user" element={<User/>} />
            <Route path="/user-create" element={<UserCreate/>} />
            <Route path="/user-modify" element={<UserModify />} />
            <Route path="/user-details" element={<UserDetails />} />
            <Route path="/education-user-create" element={<UserEducationCreate/>} />
            {/*Tools*/}
            <Route path="/tool" element={<Tool/>} />
            <Route path="/tool-create" element={<ToolCreate />} />
            <Route path="/tool-modify" element={<ToolModify/>} />
            {/*ToolCategories*/}
            <Route path="/tool-category" element={<ToolCategory/>} />
            <Route path="/tool-category-create" element={<ToolCategoryCreate />} />
            <Route path="/tool-category-modify" element={<ToolCategoryModify />} />
            <Route path="/tool-category-details" element={<ToolCategoryDetails />} />
            <Route path="/education-tool-category-create" element={<EducationToolCategoryCreate />} />
            {/*Education*/}
            <Route path="/education" element={<Education/>} />
            <Route path="/education-create" element={<EducationCreate />} />
            <Route path="/education-modify" element={<EducationModify/>} />
          </Routes>
        </Layout>
      </Suspense>
    </MuiPickersUtilsProvider>
  );
}

export default App;

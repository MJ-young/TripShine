import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "@/router"; // 确保路径正确
import MainLayout from "@views/MainLayout"; // 假设你已经创建了MainLayout组件

function App() {
  const getRoutes = () => {
    return routes.map((route) => {
      if (route.isPublic) {
        return (
          <Route
            path={route.path}
            element={<route.component />}
            key={route.path}
          />
        );
      } else {
        return (
          <Route
            path={route.path}
            element={
              <MainLayout>
                <route.component />
              </MainLayout>
            }
            key={route.path}
          />
        );
      }
    });
  };

  return (
    <Router>
      <Routes>{getRoutes()}</Routes>
    </Router>
  );
}

export default App;

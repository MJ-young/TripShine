// withAuth.jsx
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const withAuth = (Component, requiredRole) => {
  return (props) => {
    const userRole = Cookies.get("adminRole");

    // 检查用户角色是否符合要求
    if (userRole !== requiredRole) {
      // 用户角色不符合要求，重定向到 401 页面
      return <Navigate to="/401" />;
    }

    // 角色符合要求，渲染组件
    return <Component {...props} />;
  };
};

export default withAuth;

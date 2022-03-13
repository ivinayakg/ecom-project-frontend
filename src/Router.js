import { useEffect, useState } from "react";

const LocalExtender = () => {
  let localStorage = [];

  const addfun = (fun) => {
    localStorage = [];
    localStorage.push(fun);
  };

  const callFun = () => {
    localStorage.map((fun) => fun());
  };

  return { callFun, addfun };
};

const LocalExtendercollector = LocalExtender();

export const Router = ({ children }) => {
  const getCurrentPath = () => window.location.pathname;
  const [route, setRoute] = useState(getCurrentPath());

  useEffect(() => {
    LocalExtendercollector.addfun(() => {
      setRoute(getCurrentPath());
      window.scroll(0, 0);
    });

    window.onpopstate = () => setRoute(getCurrentPath());
  }, []);

  const outputChildren =
    children.length > 0
      ? children.find((child) => {
          if (child.props.to.includes(":")) {
            let childPath = child.props.to.split(":")[0];
            return childPath.includes(route) || route.includes(childPath);
          }
          return child.props.to === route;
        })
      : children;

  return <>{outputChildren}</>;
};

export const Route = ({ to, element }) => {
  if (element) {
    return element;
  }
};

export const useNavigate = () => {
  return (route, data, repeat) => {
    if (repeat) {
      window.history.replaceState({}, null, "/");
      window.history.replaceState(data, null, route);
    } else {
      window.history.pushState(data, null, route);
    }
    LocalExtendercollector.callFun();
  };
};

export const useLocation = () => window.history.state;

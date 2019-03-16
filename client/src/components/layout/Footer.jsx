import React from "react";
import linkReducer from "../../reducers/linkReducer";

export default () => {
  return (
    <footer className="text-center">
      Copyright &copy; {new Date().getFullYear()} LinkReducer
    </footer>
  );
};

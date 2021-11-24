import { useContext } from "react";

import { TranslationContext } from "../../context/TranslationContext";

const useLinks = () => {
  const translation = useContext(TranslationContext);

  const portfolioLinks = [
    {
      name: translation.portfolio_static,
      tech: "HTML, CSS, FLEX, GRID, Animation",
      pathGit: `https://github.com/Pavel-Khokhlov/how-to-learn`,
      pathGhPages: `https://pavel-khokhlov.github.io/how-to-learn/`,
    },
    {
      name: translation.portfolio_adaptive,
      tech: "HTML, CSS, FLEX, GRID, Adaptive",
      pathGit: `https://github.com/Pavel-Khokhlov/russian-travel`,
      pathGhPages: `https://pavel-khokhlov.github.io/russian-travel/`,
    },
    {
      name: translation.portfolio_onePage,
      tech: "HTML, CSS, FLEX, GRID, Adaptive, Popup, REST API",
      pathGit: `https://github.com/Pavel-Khokhlov/mesto-react`,
      pathGhPages: `https://pavel-khokhlov.github.io/mesto-react/`,
    },
    {
      name: translation.portfolio_mypet,
      tech: "HTML, CSS, JS, FLEX, GRID, Adaptive, Popup",
      pathGit: `https://github.com/Pavel-Khokhlov/irinayuzifovich`,
      pathGhPages: `https://pavel-khokhlov.github.io/irinayuzifovich/`,
    },
    {
      name: translation.portfolio_test_bushe,
      tech: "HTML, CSS, FLEX, GRID, Popup, ReactJS, Redux-Toolkit",
      pathGit: `https://github.com/Pavel-Khokhlov/bushe-react`,
      pathGhPages: `https://pavel-khokhlov.github.io/bushe-react/`,
    },
    {
      name: translation.portfolio_test_amigoweb,
      tech: "HTML, CSS, FLEX, GRID, Popup, ReactJS, Redux-Toolkit, UI/UX",
      pathGit: `https://github.com/Pavel-Khokhlov/amigoweb-react`,
      pathGhPages: `https://pavel-khokhlov.github.io/amigoweb-react/`,
    },
    {
      name: translation.portfolio_todo,
      tech: "HTML, CSS, ReactJS, Redux-Toolkit, TypeScript, Bootstrap",
      pathGit: `https://github.com/Pavel-Khokhlov/todo-react-redux-ts`,
      pathGhPages: null,
    },
    {
      name: translation.portfolio_voodoo,
      tech: "HTML, CSS, SASS, ReactJS, Redux-Toolkit, Bootstrap",
      pathGit: `https://github.com/Pavel-Khokhlov/voodoo-react`,
      pathGhPages: `https://pavel-khokhlov.github.io/voodoo-react/`,
    },
  ];

  const technologyLinks = [
    "HTML",
    "CSS",
    "SASS",
    "Flex",
    "Griid",
    "JS",
    "ReactJS",
    "Redux",
    "ToolKit",
    "Node.js",
    "Express",
    "Git",
    "Gist",
    "GH-pages",
    "SPA",
    "ООП",
  ];

  return {
    portfolioLinks,
    technologyLinks,
  };
};

export default useLinks;

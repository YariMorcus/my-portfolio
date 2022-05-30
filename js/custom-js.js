/* eslint-disable no-restricted-syntax */
// Update the copyright in footer automatically
document.getElementsByClassName("copyright__year")[0].innerText =
  new Date().getFullYear();

/**
 * Darkmode data controller
 * @contains object with all the elements that need to change
 */
/**
 * Cookie handler
 * @contains all the functions that are necessary to manage the cookies
 */
const cookieHandler = (function cookieHandler() {
  function generateDate(operator) {
    const exp = new Date();
    let time = exp.getTime();

    if (operator === "+") {
      time += 60 * 60 * 24 * 10 * 1000;
    } else {
      time -= 60 * 60 * 24 * 1000;
    }

    exp.setTime(time);

    return exp;
  }

  // Create cookie
  return {
    createCookie() {
      const exp = generateDate("+");

      document.cookie = `darkmode=true;expires=${exp.toUTCString()};path=/`;
    },
    readCookie() {
      const cookie = document.cookie
        .split(";")
        .find((row) => row.startsWith("darkmode"));

      return !!cookie;
    },
    deleteCookie() {
      const exp = generateDate("-");
      document.cookie = `darkmode=true;expires=${exp.toUTCString()};path=/`;
    },
  };
})();

const darkmodeDATA = function darkmodeDATA() {
const DOM = {
  "darkmode-bg": ["body"],
  "darkmode-surface": [
    "introduction",
    "container",
    "bg__white",
    "center_d_box",
    "rounded__photo--caption",
    "about-me__text",
    "about-me__info__container",
    "pr-text-container",
    "projecten-row",
    "container-w-bg",
    "self-education__inner",
    "fastlinks__message",
    "courses__container",
    "used_languages__container",
    "used_tools__container",
    "internships__section ",
  ],
  "darkmode-03dp": ["menu", 
  "skip-main-content-container",
   "course__content",
   "languages__row--1",
   "languages__row--2",
   "tools__row",
   "internship__content",
   "course__label",
   "footer"
  ],
  "darkmode-menu-link": ["pure-menu-link"],
  "darkmode-primary": [
    "fastlinks__box",
    "pure-menu-item active",
    "link",
  ],
  "darkmode-titles": ["h1", "h2"],
  "darkmode-cwhite": [
    "fastlinks__text",
    "about-me__info__title",
    "introduction__paragraph",
    "footer__madeby",
    "footer__copyright",
    "linkedin__link",
    "a__link",
    "link",
    "custom-project-label-1"
  ],
  "darkmode-cblack": [
    "course__table__caption",
    "category__explanation",
    "project__col__right",
  ],
  "darkmode-fnormal": ["course__table__th"],
  "darkmode-resetcolor": ["project__h2"],
};

  return {
    getDOMstrings() {
      return DOM;
    },
  };
};

/**
 * Darkmode controller
 * @contains all the functionality that is related to darkmode
 */
const darkmode = (function darkmode(DmData) {
  // Add a css class to an element
  function addClass(element, classname) {
    if (element) {
      element.classList.add(classname);
    }
  }

  // Remove a css class from an element
  function removeClass(element, classname) {
    if (element) {
      element.classList.remove(classname);
    }
  }

  // Function checks the key based on a value of the object
  function getKeyFromObjectValue(object, value) {
    let propName = "";
    for (const prop in object) {
      if (Object.prototype.hasOwnProperty.call(object, prop)) {
        const arr = object[prop];
        for (let i = 0; i < arr.length; i += 1) {
          if (arr[i] === value) {
            propName = prop;
          }
        }
      }
    }
    return propName;
  }

  // Object contains the darkmode and non-darkmode variants
  const componentVariants = {
    SiteLogo: ["img/logo.svg", "img/logo.svg"],
    GitHubLogo: [
      "img/icon/github-logo-white.svg",
      "img/icon/github-logo-white.png",
      "img/icon/github-logo.svg",
      "img/icon/github-logo.png",
    ],
    html5PNG: [
      "img/icon/html-5-logo-white.svg",
      "img/icon/html-5-logo-white.png",
      "img/icon/html-5-logo.svg",
      "img/icon/html-5-logo.png",
    ],
    css: [
      "img/icon/css-3-logo-white.svg",
      "img/icon/css-3-logo-white.png",
      "img/icon/css-3-logo.svg",
      "img/icon/css-3-logo.png",
    ],
    phpLogo: [
      "img/icon/php-logo-white.svg",
      "img/icon/php-logo-white.png",
      "img/icon/php-logo.svg",
      "img/icon/php-logo.png",
    ],
    portfolioLogoProject: ["img/logo.svg", "img/logo-dark.svg"],
    autorijschoolLogoProject: [
      "img/logo-customers/autorijschool-il-primo-white.svg",
      "img/logo-customers/autorijschool-il-primo.svg",
    ],
    vandammecsLogo: [
      "img/logo-customers/vandamme--white.svg",
      "img/logo-customers/vandamme.svg",
    ],
    maxsonLogo: [
      "img/logo-customers/maxson_logo--white.png",
      "img/logo-customers/maxson_logo.png",
    ],
    linkedinLogo: [
      "img/icon/square-linkedin-fill.svg",
      "img/icon/square-linkedin.svg",
    ],
  };

  /**
   * setCorrespondingVisualComponents
   *
   * Change the logo and icons based on dark/light mode
   *
   * @param {int}    - mode, num 1 activates darkmode, num 2 deactivates darkmode
   * @param {string} - type, indicate which icon need to be changed
   *
   * if (type === $string),   check which icon needs to be changed
   * if (mode),               darkmode active? Change icons to white versions, OTHERWISE dark versions
   */
  function setCorrespondingVisualComponents(mode, type) {
    if (type === "sitelogo") {

      const siteLogo = document.querySelector(".logo");
      mode
        ? (siteLogo.src = componentVariants.SiteLogo[0])
        : (siteLogo.src = componentVariants.SiteLogo[1]);
    }
    if (type === "linkedin") {

      const linkedinLogo = document.querySelectorAll(".linkedin__logo");

      if (mode) {

        for (let logo of linkedinLogo) {
          logo.src = componentVariants.linkedinLogo[0];
        }

    } else {
        for (let logo of linkedinLogo) {
          logo.src = componentVariants.linkedinLogo[1];
        }
      }
    }
    if (type === "html5") {

      const html5LogoPNG = document.querySelector(".html5__logo__png");
      const html5LogoSVG = document.querySelector(".html5__logo__svg");

      if (mode) {
        html5LogoSVG.data = componentVariants.html5PNG[0];
        html5LogoPNG.src = componentVariants.html5PNG[1];
      } else {
        html5LogoSVG.data = componentVariants.html5PNG[2];
        html5LogoPNG.src = componentVariants.html5PNG[3];
      }
    }

    if (type === "css") {

      const cssLogoSVG = document.querySelector(".css__logo__svg");
      const cssLogoPNG = document.querySelector(".css__logo__png");

      if (mode) {
        cssLogoSVG.data = componentVariants.css[0];
        cssLogoPNG.src = componentVariants.css[1];
      } else {
        cssLogoSVG.data = componentVariants.css[2];
        cssLogoPNG.src = componentVariants.css[3];
      }
    }

    if (type === "php") {

      const phpLogoSVG = document.querySelector(".php__logo__svg");
      const phpLogoPNG = document.querySelector(".php__logo__png");

      if (mode) {
        phpLogoSVG.data = componentVariants.phpLogo[0];
        phpLogoPNG.src = componentVariants.phpLogo[1];
      } else {
        phpLogoSVG.data = componentVariants.phpLogo[2];
        phpLogoPNG.src = componentVariants.phpLogo[3];
      }
    }

    if (type === "github") {

      const GITHUB_LOGO_NODES_SVG = document.getElementsByClassName("github__icon__svg");
      const GITHUB_LOGO_NODES_PNG = document.getElementsByClassName("github__icon__png");

      if (mode) {

        [...GITHUB_LOGO_NODES_SVG].forEach(function(element) {
          element.data = componentVariants.GitHubLogo[0];
        });

        [...GITHUB_LOGO_NODES_PNG].forEach(function(element) {
          element.src = componentVariants.GitHubLogo[1];
        });

      } else {

        [...GITHUB_LOGO_NODES_SVG].forEach(function(element) {
          element.data = componentVariants.GitHubLogo[2];
        });

        [...GITHUB_LOGO_NODES_PNG].forEach(function(element) {
          element.src = componentVariants.GitHubLogo[3];
        });

      }

    }

    if (type === "portfolio__logo--project") {
      const portfolioLogoProject = document.querySelector(
        ".portfolio__logo--project"
      );
      mode
        ? (portfolioLogoProject.data =
            componentVariants.portfolioLogoProject[0])
        : (portfolioLogoProject.data =
            componentVariants.portfolioLogoProject[1]);
    }

    if (type === "autorijschool__logo--project") {
      const autorijschoolLogoProject = document.querySelector("." + type);
      mode
        ? (autorijschoolLogoProject.data =
            componentVariants.autorijschoolLogoProject[0])
        : (autorijschoolLogoProject.data =
            componentVariants.autorijschoolLogoProject[1]);
    }

    if (type === "vandammecs__logo--project") {
      const vandammecsLogo = document.querySelector("." + type);
      mode
        ? (vandammecsLogo.data = componentVariants.vandammecsLogo[0])
        : (vandammecsLogo.data = componentVariants.vandammecsLogo[1]);
    }

    if (type === "maxson__logo--project") {
      const maxsonLogo = document.querySelector("." + type);
      mode
        ? (maxsonLogo.src = componentVariants.maxsonLogo[0])
        : (maxsonLogo.src = componentVariants.maxsonLogo[1]);
    }
  }

  function checkElementExistence(element) {
    if (document.getElementsByClassName(element)[0]) {
      return true;
    }
    return false;
  }

  // Add all given containers darkmode-surface class
  function changeToDarkModeBackground(container, cssClass) {

    const NODES = document.getElementsByClassName(container);
    for (let node of NODES) {
      addClass(node, cssClass);
    }
  }

  /*
   * Function to enable the dark mode
   *
   * Worth to be mentioned:
   * The number one (1) in setCorrespondingVisualComponents() activates the dark mode.
   * If a zero (0) is passed, it disables it.
   */
  function darkHandler(toggler) {
    // // When visible, remove moon, and add sun
    addClass(toggler, "ion-md-sunny");
    removeClass(toggler, "ion-md-moon");

    // Inform the screenreader that the button is pressed
    toggler.setAttribute('aria-pressed', 'true');

    toggler.setAttribute("aria-label", "Disable darkmode");

    // Change the logo letters to white
    setCorrespondingVisualComponents(1, "sitelogo");

    // /**
    //  * Check if LinkedIn logo exists
    //  * Page: all (footer) and homepage
    //  */
    checkElementExistence("linkedin__logo")
      ? setCorrespondingVisualComponents(1, "linkedin")
      : "";

    // /**
    //  * Check if HTML5 logo exists
    //  * Page: education
    //  */
    checkElementExistence("html5__logo__svg")
      ? setCorrespondingVisualComponents(1, "html5")
      : "";

    // /**
    //  * Check if CSS3 logo exists
    //  * Page: education
    //  */
    checkElementExistence("css__logo__svg")
      ? setCorrespondingVisualComponents(1, "css")
      : "";

    // /**
    //  * Check if PHP logo exists
    //  * Page: education
    //  */
    checkElementExistence("php__logo__svg")
      ? setCorrespondingVisualComponents(1, "php")
      : "";

    // /**
    //  * Check if GitHub icon exists
    //  * Page: education
    //  */
    checkElementExistence("github__icon__svg")
      ? setCorrespondingVisualComponents(1, "github")
      : "";

    // Page: projects
    // Convert black icons to white version
    $(".label__fictional").attr("data-content", "person-outline-white");
    $(".label__customers").attr("data-content", "people-outline-white");

    // Change all .category__explanation containers to darker background
    checkElementExistence("category__explanation")
      ? changeToDarkModeBackground("category__explanation", "darkmode-surface")
      : "";

    // Change all .project__col__right containers to darker background
    checkElementExistence("project__col__right")
      ? changeToDarkModeBackground("project__col__right", "darkmode-surface")
      : "";

    // Change portfolio logo to white version, page: projects
    checkElementExistence("portfolio__logo--project")
      ? setCorrespondingVisualComponents(1, "portfolio__logo--project")
      : "";

    // Change autorijschool logo to white version, page: projects
    checkElementExistence("autorijschool__logo--project")
      ? setCorrespondingVisualComponents(1, "autorijschool__logo--project")
      : "";

    // Change vandammecs logo to white version, page: projects
    checkElementExistence("vandammecs__logo--project")
      ? setCorrespondingVisualComponents(1, "vandammecs__logo--project")
      : "";

    // Change maxson logo to white version, page: projects
    checkElementExistence("maxson__logo--project")
      ? setCorrespondingVisualComponents(1, "maxson__logo--project")
      : "";

    // // Set the cookie to remember the users choice
    cookieHandler.createCookie();

    // Retrieve the DOM strings
    const classObject = new DmData().getDOMstrings();

    for (const prop in classObject) {
      if (Object.prototype.hasOwnProperty.call(classObject, prop)) {
        const array = classObject[prop];
        for (let x = 0; x < array.length; x += 1) {
          const darkmodeClass = getKeyFromObjectValue(classObject, array[x]);
          const el = document.getElementsByClassName(array[x]);

          for (let y = 0; y < el.length; y += 1) {
            el[y].classList.add(darkmodeClass);
          }
        }
      }
    }
  }

  // Function to disable the dark mode
  function lightHandler(toggler) {
    // When not visible, remove sun, and add moon
    removeClass(toggler, "ion-md-sunny");
    addClass(toggler, "ion-md-moon");

    // Inform the screenreader that the button is pressed
    toggler.setAttribute("aria-pressed", "false");
    
    toggler.setAttribute("aria-label", "Enable darkmode");

    // // Change the logo letters to original
    setCorrespondingVisualComponents(0, "sitelogo");

    // /**
    //  * Check if LinkedIn logo exists
    //  * Page: all (footer) and homepage
    //  */
    checkElementExistence("linkedin__logo")
      ? setCorrespondingVisualComponents(0, "linkedin")
      : "";

    // /**
    //  * Check if HTML5 logo exists
    //  * Page: education
    //  */
    checkElementExistence("html5__logo__svg")
      ? setCorrespondingVisualComponents(0, "html5")
      : "";

    // /**
    //  * Check if CSS3 logo exists
    //  * Page: education
    //  */
    checkElementExistence("css__logo__svg")
      ? setCorrespondingVisualComponents(0, "css")
      : "";

    // /**
    //  * Check if PHP logo exists
    //  * Page: education
    //  */
    checkElementExistence("php__logo__svg")
      ? setCorrespondingVisualComponents(0, "php")
      : "";

    // /**
    //  * Check if GitHub icon exists
    //  * Page: education
    //  */
    checkElementExistence("github__icon__svg")
      ? setCorrespondingVisualComponents(0, "github")
      : "";

    // Page: projects
    // Convert white icons to black version
    $(".label__fictional").attr("data-content", "person-outline");
    $(".label__customers").attr("data-content", "people-outline");

    // Change portfolio logo to original version, page: projects
    checkElementExistence("portfolio__logo--project")
      ? setCorrespondingVisualComponents(0, "portfolio__logo--project")
      : "";

    // Change autorijschool il primo logo to original version, page: projects
    checkElementExistence("autorijschool__logo--project")
      ? setCorrespondingVisualComponents(0, "autorijschool__logo--project")
      : "";

    // Change vandammecs logo to original version, page: projects
    checkElementExistence("vandammecs__logo--project")
      ? setCorrespondingVisualComponents(0, "vandammecs__logo--project")
      : "";

    // Change maxson logo to original version, page: projects
    checkElementExistence("maxson__logo--project")
      ? setCorrespondingVisualComponents(0, "maxson__logo--project")
      : "";

    // // // Remove the cookie to remember the users choice
    cookieHandler.deleteCookie();

    // Retrieve the DOM strings
    const classObject = new DmData().getDOMstrings();

    // Retrieve the keys from the classObject
    const darkmodeClassesArray = Object.keys(classObject);

    for (let i = 0; i < darkmodeClassesArray.length; i += 1) {
      // Get the current darkmode class
      const dClass = darkmodeClassesArray[i];

      // Get the elements that contain that current class
      const elementsArray = document.querySelectorAll(`.${dClass}`);

      // Loop over the array
      for (const element of elementsArray) {
        if (element) {
          // Remove the class from the element
          element.classList.remove(dClass);
        }
      }
    }
  }

  function init(toggler) {
    // Check whether moon icon is visible.
    if (toggler.classList.contains("ion-md-moon")) {
      darkHandler(toggler);
    } else {
      lightHandler(toggler);
    }
  }

  const toggler = document.getElementById("darkmode__toggle");

  toggler.addEventListener("click", function toggleInitializer() {
    init(this);
  });

  return {
    activateDarkMode() {
      darkHandler(toggler);
    },
    deactivateDarkmode() {
      lightHandler(toggler);
    },
    darkmodeAddClass(element, classname) {
      addClass(element, classname);
    },
  };
})(darkmodeDATA);

// Check if darkmode cookie exists
function checkDarkmodeState(modal) {
  if (cookieHandler.readCookie()) {
    if (modal) return true;

    darkmode.activateDarkMode();
  }
}
checkDarkmodeState();

(function () {
  function addClass(itemSelector, itemClass) {
    const arrayOfLabels = document.querySelectorAll(itemSelector);
    arrayOfLabels.forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        this.classList.toggle(itemClass);
      });
    });
  }

  function managePopUps() {
    const body = document.querySelector("body");
    const windowWidth = window.innerWidth;
    const outerPadding = windowWidth - document.documentElement.clientWidth;
    const TIMEOUT = 500;

    function activePopUps() {
      const popUps = document.querySelectorAll(".gallery__pop-up-link");
      popUps.forEach((el) => {
        el.addEventListener("click", function (e) {
          e.preventDefault();
          const popUpId = e.currentTarget.getAttribute("href");
          const currentPopUp = document.querySelector("" + popUpId);
          currentPopUp.classList.add("pop-up_open");
          body.style.paddingRight = outerPadding + "px";
          hideOnClick(currentPopUp);
          if (body.style.overflow === "hidden") {
            body.style.overflow = "visible";
          } else {
            body.style.overflow = "hidden";
          }
        });
      });
    }

    function hidePopUps() {
      const closePopUp = document.querySelectorAll(".pop-up__close");
      closePopUp.forEach((el) => {
        el.addEventListener("click", function (e) {
          const currentPopUp = e.currentTarget.closest(".pop-up");
          currentPopUp.classList.remove("pop-up_open");
          setTimeout(function () {
            body.style.paddingRight = "0";
            if (body.style.overflow === "hidden") {
              body.style.overflow = "visible";
            } else {
              body.style.overflow = "hidden";
            }
          }, TIMEOUT);
        });
      });
    }

    function hideOnClick(popUp) {
      popUp.addEventListener("click", function (e) {
        if (!e.target.closest(".pop-up__content")) {
          this.classList.remove("pop-up_open");
          setTimeout(function () {
            body.style.paddingRight = "0";
            if (body.style.overflow === "hidden") {
              body.style.overflow = "visible";
            } else {
              body.style.overflow = "hidden";
            }
          }, TIMEOUT);
        }
      });
    }

    function hideOnKeyDown() {
      document.addEventListener("keydown", function (e) {
        if (e.code === "Escape") {
          document
            .querySelector(".pop-up_open")
            .classList.remove("pop-up_open");
          setTimeout(function () {
            body.style.paddingRight = "0";
            if (body.style.overflow === "hidden") {
              body.style.overflow = "visible";
            } else {
              body.style.overflow = "hidden";
            }
          }, TIMEOUT);
        }
      });
    }

    activePopUps();
    hidePopUps();
    hideOnKeyDown();
  }

  function searchActive() {
    const searchButton = document.querySelector(".nav-btn");
    const searchForm = document.querySelector(".nav-form");
    const searchInput = document.querySelector(".nav-input");
    const closeButton = document.querySelector(".nav-close-btn");
    const navWrapper = document.querySelector(".header__secondary-wrapper");
    const navContainer = document.querySelector(".header__secondary-container");
    const burger = document.querySelector(".burger");

    searchButton.addEventListener("click", function (e) {
      e.preventDefault();
      this.classList.add("nav-btn_active");
      searchInput.classList.add("nav-input_active");
      searchForm.classList.add("nav-form_active");
      closeButton.classList.add("nav-close-btn_active");
      navWrapper.classList.add("header__secondary-wrapper_active");
      navContainer.classList.add("header__secondary-container_active");
      if (
        document.documentElement.clientWidth >= 768 &&
        document.documentElement.clientWidth <= 991
      ) {
        burger.style.display = "none";
      }
    });

    closeButton.addEventListener("click", function (e) {
      e.preventDefault();
      searchButton.classList.remove("nav-btn_active");
      searchInput.classList.remove("nav-input_active");
      searchForm.classList.remove("nav-form_active");
      this.classList.remove("nav-close-btn_active");
      navWrapper.classList.remove("header__secondary-wrapper_active");
      navContainer.classList.remove("header__secondary-container_active");
      if (burger.style.display === "none") {
        burger.style.display = "flex";
      }
    });
  }

  function createSpoiler() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("edition__wrapper-spoiler");
    const form = document.querySelector(".edition__form");
    const header = document.querySelector(".edition__form-heading");
    const headerPrice = document.querySelectorAll(".edition__form-heading")[1];
    const checkboxList = document.querySelector(".edition__wrapper-checkbox");
    const selectedCheckboxes = document.createElement("div");
    selectedCheckboxes.classList.add("edition__selected-checkboxes");
    wrapper.append(header);
    wrapper.append(checkboxList);
    form.insertBefore(wrapper, headerPrice);
    form.insertBefore(selectedCheckboxes, headerPrice);

    function showActiveCheckbox(element) {
      if (!element) {
        const activeElement = document.querySelector(
          ".edition__checkbox-label_active"
        );
        selectedCheckboxes.append(activeElement);
      } else {
        selectedCheckboxes.append(element);
        $(".edition__wrapper-spoiler").accordion("refresh");
      }
    }
    showActiveCheckbox();
    $(function () {
      $(".edition__wrapper-spoiler").accordion({
        collapsible: true,
        active: false,
      });
    });

    function manageCheckbox() {
      const checkboxElements = document.querySelectorAll(
        ".edition__checkbox-label"
      );
      checkboxElements.forEach((el) => {
        el.addEventListener("click", function () {
          if (this.parentElement === selectedCheckboxes) {
            checkboxList.append(this);
            $(".edition__wrapper-spoiler").accordion("refresh");
          } else {
            showActiveCheckbox(this);
          }
        });
      });
    }
    manageCheckbox();
  }

  function setAriaAttribute() {
    const choicesList = document.querySelectorAll(".choices");
    const choicesHeaders = document.querySelectorAll(".choices__list--single");
    for (let index = 0; index < choicesList.length; index++) {
      const labelValue = choicesHeaders[index].textContent;
      choicesList[index].setAttribute("aria-label", labelValue);
    }
  }

  function initSlider() {
    const container = document.querySelector(".events__container");
    container.classList.add("swiper-container");
    document.querySelector(".events__list").classList.add("swiper-wrapper");
    document
      .querySelectorAll(".events__item")
      .forEach((el) => el.classList.add("swiper-slide"));
    const pagination = document.createElement("div");
    pagination.classList.add("events__pagination");
    container.append(pagination);

    new Swiper(container, {
      slidesPerColumnFill: "row",
      slidesPerView: 1,
      spaceBetween: 15,

      pagination: {
        el: ".events__pagination",
        type: "bullets",
        clickable: true,
      },
      a11y: {
        prevSlideMessage: "Предыдущий слайд",
        nextSlideMessage: "Следующий слайд",
        paginationBulletMessage: "Переход к слайду {{index}}",
      },
    });
  }

  function burgerActive() {
    const body = document.querySelector("body");
    const burger = document.querySelector(".burger");
    const menu = document.querySelector(".header__primary-nav");
    burger.addEventListener("click", function () {
      this.classList.toggle("burger_active");
      menu.classList.toggle("header__primary-nav_active");
      if (body.style.overflow === "hidden") {
        body.style.overflow = "visible";
      } else {
        body.style.overflow = "hidden";
      }
    });
    burger.addEventListener("keydown", function (e) {
      const menuList = document.querySelectorAll(".header__primary-nav-link");
      const logInLink = document.querySelector(".header__log-in");
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        this.classList.toggle("burger_active");
        menu.classList.toggle("header__primary-nav_active");
        if (body.style.overflow === "hidden") {
          body.style.overflow = "visible";
        } else {
          body.style.overflow = "hidden";
        }
      }
      if (
        document.documentElement.clientWidth <= 1399 &&
        !this.classList.contains("burger_active")
      ) {
        menuList.forEach((el) => {
          el.setAttribute("tabindex", -1);
        });
        logInLink.setAttribute("tabindex", -1);
      } else {
        menuList.forEach((el) => {
          el.setAttribute("tabindex", 0);
        });
        logInLink.setAttribute("tabindex", 0);
      }
    });
  }

  function navigateAnchors() {
    const anchors = document.querySelectorAll('a[href*="#"]');

    anchors.forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const sectionID = el.getAttribute("href");
        document.querySelector("" + sectionID).scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  }

  function showCurrentPerson() {
    const listOfButtons = document.querySelectorAll("button[data-path]");
    listOfButtons.forEach(function (el) {
      el.addEventListener("click", function (e) {
        listOfButtons.forEach((el) => {
          el.classList.remove("catalog__content-person_active");
        });
        const listOfPerson = document.querySelectorAll("div[data-target]");
        listOfPerson.forEach((el) => {
          el.classList.remove("catalog__person_active");
        });
        const path = e.currentTarget.dataset.path;
        document
          .querySelector(`[data-target=${path}]`)
          .classList.add("catalog__person_active");
        if (document.documentElement.clientWidth <= 575) {
          document.querySelector(`[data-target=${path}]`).scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
        this.classList.add("catalog__content-person_active");
        e.stopPropagation();
      });
    });
  }

  function selectCountry() {
    const listOfCountryEmblems = document.querySelectorAll(
      ".catalog__item-country"
    );
    listOfCountryEmblems.forEach((el) => {
      el.addEventListener("click", function (e) {
        listOfCountryEmblems.forEach((el) => {
          el.classList.remove("catalog__item-country_active");
        });
        e.currentTarget.classList.add("catalog__item-country_active");
      });
    });
  }

  function showAndHideArticles() {
    if (document.documentElement.clientWidth >= 768) {
      const btn = document.querySelector(".events__btn");
      const lisOfArticles = document.querySelector(".events__list");
      const hiddenArticles = document.querySelectorAll(".events__item");
      btn.addEventListener("click", function () {
        this.style.display = "none";
        lisOfArticles.style.margin = 0;
        hiddenArticles.forEach((el) => {
          el.style.display = "inline-block";
        });
      });
    }
  }

  function showDropDown() {
    const dropDownList = document.querySelectorAll(
      ".header__secondary-inner-wrapper"
    );
    const listOfHeadings = document.querySelectorAll(
      ".header__secondary-heading"
    );
    let prevTarget = null;
    listOfHeadings.forEach((el) => {
      el.addEventListener("click", function (e) {
        if (prevTarget) {
          prevTarget.classList.remove("header__secondary-heading_active");
        }
        dropDownList.forEach((el) => {
          el.hidden = true;
        });
        let child = e.currentTarget.nextElementSibling;
        if (prevTarget === e.currentTarget) {
          child.hidden = true;
          prevTarget = null;
        } else {
          child.hidden = false;
          prevTarget = e.currentTarget;
          e.currentTarget.classList.add("header__secondary-heading_active");
        }
      });
    });
  }

  function openOuterButtonsList() {
    let prevBtn = null;
    const outerButtons = document.querySelectorAll(".header__secondary-item");
    outerButtons.forEach((el) => {
      el.addEventListener("keydown", function (e) {
        if (e.code === "Space" || e.code === "Enter") {
          e.preventDefault();
          if (prevBtn && prevBtn !== e.currentTarget) {
            outerButtons.forEach((el) => {
              el.children[0].classList.remove(
                "header__secondary-heading_active"
              );
              el.children[1].hidden = true;
            });
            e.currentTarget.children[0].classList.toggle(
              "header__secondary-heading_active"
            );
            e.currentTarget.children[1].hidden = false;
          } else {
            e.currentTarget.children[0].classList.toggle(
              "header__secondary-heading_active"
            );
            if (e.currentTarget.children[1].hidden) {
              e.currentTarget.children[1].hidden = false;
            } else {
              e.currentTarget.children[1].hidden = true;
            }
          }
          prevBtn = e.currentTarget;
        }
      });
    });
  }

  function addEventsOnInnerButtons() {
    let prevBtn = document.querySelector(".header__secondary-inner-btn_active");
    const innerButtons = document.querySelectorAll(
      ".header__secondary-inner-btn"
    );

    openInnerButtonsList();
    addClasstoInnerItem();

    function openInnerButtonsList() {
      innerButtons.forEach((el) => {
        el.addEventListener("keydown", function (e) {
          if (
            (e.code === "Space" || e.code === "Enter") &&
            e.currentTarget !== prevBtn
          ) {
            e.preventDefault();
            prevBtn.disabled = false;
            innerButtons.forEach((el) => {
              el.classList.remove("header__secondary-inner-btn_active");
            });
            e.currentTarget.classList.add("header__secondary-inner-btn_active");
            e.currentTarget.disabled = true;
            prevBtn = e.currentTarget;
          } else {
            return;
          }
        });
      });
    }

    function addClasstoInnerItem() {
      innerButtons.forEach((el) => {
        el.addEventListener("click", (e) => {
          if (prevBtn === e.currentTarget) {
            return;
          } else {
            prevBtn.disabled = false;
            innerButtons.forEach((el) => {
              el.classList.remove("header__secondary-inner-btn_active");
            });
            e.currentTarget.classList.add("header__secondary-inner-btn_active");
            e.currentTarget.disabled = true;
            prevBtn = e.currentTarget;
          }
        });
      });
    }
  }

  function paintBorder() {
    const accordionWrappers = document.querySelectorAll(
      ".catalog__content-inner-wrapper"
    );
    let prevElement = null;
    accordionWrappers.forEach(function (el) {
      el.addEventListener("click", function () {
        if (prevElement && prevElement !== this.parentElement) {
          prevElement.classList.remove("catalog__content-item_active");
        }
        this.parentElement.classList.toggle("catalog__content-item_active");
        prevElement = this.parentElement;
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    $(function () {
      $(".catalog__content-list").accordion({
        collapsible: true,
      });
    });

    $(function () {
      $("#tabs").tabs({
        active: 2,
        show: {
          effect: "fade",
          duration: 1000,
        },
        show: true,
      });
    });

    const heroSwiperContainer =
      document.querySelectorAll(".swiper-container")[0];

    new Swiper(heroSwiperContainer, {
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      speed: 3000,
      effect: "fade",
    });

    const gallreySwiperContainer =
      document.querySelectorAll(".swiper-container")[1];

    new Swiper(gallreySwiperContainer, {
      slidesPerColumnFill: "row",
      navigation: {
        nextEl: ".pagination-round_next",
        prevEl: ".pagination-round_prev",
      },
      pagination: {
        el: ".pagination__number",
        type: "fraction",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
          slidesPerGroup: 1,
          slidesPerColumn: 1,
        },

        576: {
          slidesPerView: 2,
          spaceBetween: 15,
          slidesPerGroup: 2,
          slidesPerColumn: 1,
        },

        768: {
          slidesPerView: 2,
          spaceBetween: 35,
          slidesPerGroup: 2,
          slidesPerColumn: 2,
        },

        992: {
          slidesPerView: 2,
          spaceBetween: 35,
          slidesPerGroup: 2,
          slidesPerColumn: 2,
        },

        1400: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 50,
          slidesPerColumn: 2,
        },
      },
      a11y: {
        prevSlideMessage: "Предыдущий слайд",
        nextSlideMessage: "Следующий слайд",
      },
    });

    if (document.documentElement.clientWidth <= 991) {
      document.querySelectorAll(".edition__author")[3].textContent =
        "Кричевский, Вла...";
      document.querySelectorAll(".edition__name")[4].textContent =
        "Модульные сет...";
      document.querySelectorAll(".edition__author")[4].textContent =
        "Мюллер-Брокма...";
      document.querySelectorAll(".edition__name")[5].textContent =
        "Эволюция граф...";
      document.querySelectorAll(".edition__name")[6].textContent =
        "Искусство и ви...";
    }

    if (document.documentElement.clientWidth >= 576) {
      const editionSwiperContainer =
        document.querySelectorAll(".swiper-container")[2];

      new Swiper(editionSwiperContainer, {
        navigation: {
          nextEl: ".pagination-round_next",
          prevEl: ".pagination-round_prev",
        },
        pagination: {
          el: ".pagination__number",
          type: "fraction",
        },
        breakpoints: {
          320: {
            slidesPerColumnFill: "column",
            slidesPerView: 1,
            spaceBetween: 15,
            slidesPerGroup: 1,
            slidesPerColumn: 1,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 15,
            slidesPerGroup: 2,
            slidesPerColumn: 1,
          },

          992: {
            slidesPerView: 2,
            spaceBetween: 50,
            slidesPerGroup: 2,
          },

          1400: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 50,
          },

          768: {
            slidesPerView: 2,
            spaceBetween: 34,
            slidesPerGroup: 2,
          },
        },
        a11y: {
          prevSlideMessage: "Предыдущий слайд",
          nextSlideMessage: "Следующий слайд",
        },
      });
    } else {
      document.querySelector(".edition__pagination").style.display = "none";
      document
        .querySelector(".edition__wrapper-right")
        .classList.remove("swiper-container");
      document
        .querySelector(".edition__list")
        .classList.remove("swiper-wrapper");
      document
        .querySelectorAll(".edition__item")
        .forEach((el) => el.classList.remove("swiper-slide"));
      document.querySelectorAll(".edition__author")[3].textContent =
        "Кричевский, Влади...";
      document.querySelectorAll(".edition__name")[4].textContent =
        "Модульные сетки...";
      document.querySelectorAll(".edition__author")[4].textContent =
        "Мюллер-Брокманн...";
      document.querySelectorAll(".edition__name")[5].textContent =
        "Эволюция графич...";
      document.querySelectorAll(".edition__name")[6].textContent =
        "Искусство и визуа...";
    }

    if (document.documentElement.clientWidth >= 576) {
      const projectsSwiperContainer =
        document.querySelectorAll(".swiper-container")[3];

      new Swiper(projectsSwiperContainer, {
        navigation: {
          nextEl: ".pagination-round_next",
          prevEl: ".pagination-round_prev",
        },
        pagination: {
          el: ".pagination__number",
          type: "fraction",
        },

        breakpoints: {
          320: {
            slidesPerColumnFill: "column",
            slidesPerView: 1,
            spaceBetween: 15,
            slidesPerGroup: 1,
            slidesPerColumn: 1,
          },

          576: {
            slidesPerView: 2,
            spaceBetween: 15,
            slidesPerGroup: 2,
            slidesPerColumn: 1,
          },

          992: {
            slidesPerView: 2,
            spaceBetween: 50,
            slidesPerGroup: 2,
          },

          1400: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 50,
          },

          768: {
            slidesPerView: 2,
            spaceBetween: 35,
            slidesPerGroup: 2,
          },
        },

        a11y: {
          prevSlideMessage: "Предыдущий слайд",
          nextSlideMessage: "Следующий слайд",
        },
      });
    } else {
      const projectsSwiperContainer =
        document.querySelectorAll(".swiper-container")[2];

      new Swiper(projectsSwiperContainer, {
        navigation: {
          nextEl: ".pagination-round_next",
          prevEl: ".pagination-round_prev",
        },
        pagination: {
          el: ".pagination__number",
          type: "fraction",
        },

        breakpoints: {
          320: {
            slidesPerColumnFill: "column",
            slidesPerView: 1,
            spaceBetween: 15,
            slidesPerGroup: 1,
            slidesPerColumn: 1,
          },

          992: {
            slidesPerView: 2,
            spaceBetween: 50,
            slidesPerGroup: 2,
          },

          1400: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 50,
          },

          768: {
            slidesPerView: 2,
            spaceBetween: 35,
            slidesPerGroup: 2,
          },
        },

        a11y: {
          prevSlideMessage: "Предыдущий слайд",
          nextSlideMessage: "Следующий слайд",
        },
      });
    }

    const customSectionGalleryOne =
      document.querySelectorAll(".gallery__select")[0];
    new Choices(customSectionGalleryOne, {
      searchEnabled: false,
      shouldSort: false,
      renderSelectedChoices: false,
      position: "bottom",
      itemSelectText: "",
    });

    const customSectionGalleryTwo =
      document.querySelectorAll(".gallery__select")[1];
    new Choices(customSectionGalleryTwo, {
      searchEnabled: false,
      shouldSort: false,
      renderSelectedChoices: false,
      position: "bottom",
      itemSelectText: "",
    });

    const customSectionGalleryThree =
      document.querySelectorAll(".gallery__select")[2];
    new Choices(customSectionGalleryThree, {
      searchEnabled: false,
      shouldSort: false,
      renderSelectedChoices: false,
      position: "bottom",
      itemSelectText: "",
    });

    const selectList = document.querySelectorAll(
      ".header__secondary-inner-list"
    );
    selectList.forEach(
      (el) =>
        new SimpleBar(el, {
          scrollbarMaxSize: 28,
        })
    );

    ymaps.ready(init);

    function init() {
      const myMap = new ymaps.Map("map", {
        center: [55.75846306898368, 37.601079499999905],
        zoom: 14,
        controls: [],
      });

      const myPlacemark = new ymaps.Placemark(
        [55.75846306898368, 37.601079499999905],
        {},
        {
          iconLayout: "default#image",
          iconImageHref: "img/section-contacts/map-point.svg",
          iconImageSize: [20, 20],
          iconImageOffset: [-10, -10],
        }
      );

      // Размещение геообъекта на карте.
      myMap.geoObjects.add(myPlacemark);
      const crossOrigin = document.querySelector(".ymaps-2-1-78-gototech");
      crossOrigin.setAttribute("rel", "noreferrer");
    }

    const tel = document.querySelector('input[type="tel"]');

    Inputmask({
      mask: "+7 (999) 999-99-99",
    }).mask(tel);

    const name = document.querySelector('input[type="text"]');

    Inputmask({
      placeholder: "",
    }).mask(name);

    const search = document.querySelector('input[type="search"]');

    Inputmask({
      placeholder: "",
    }).mask(search);

    const searchInput = document.querySelector('input[type="search"]');

    searchInput.addEventListener("focus", function () {
      this.placeholder = "";
    });

    const nameInput = document.querySelector('input[type="text"]');

    nameInput.addEventListener("focus", function () {
      this.placeholder = "";
    });

    new window.JustValidate(".contacts__form", {
      colorWrong: "#9d5cd0",
      rules: {
        name: {
          required: true,
          minLength: 2,
          maxLength: 30,
        },
        phone: {
          required: true,
          function: () => {
            const phone = tel.inputmask.unmaskedvalue();
            return Number(phone) && phone.length === 10;
          },
        },
      },
      messages: {
        name: {
          required: "Как вас зовут?",
          minLength: "Минимальное число символов - 2",
          maxLength: "Максимальное число символов -30",
        },
        phone: "Укажите ваш телефон",
      },
    });

    const firstTooltip = document.querySelectorAll(".tooltip")[0];
    const secondTooltip = document.querySelectorAll(".tooltip")[1];
    const thirdTooltip = document.querySelectorAll(".tooltip")[2];

    tippy(firstTooltip, {
      content:
        "Пример современных тенденций - современная методология разработки",
    });

    tippy(secondTooltip, {
      content:
        "Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции",
    });

    tippy(thirdTooltip, {
      content: "В стремлении повысить качество",
    });

    function accessToButtons() {
      const buttons = document.querySelectorAll(".hero__btn");
      const activeButton = document.querySelector(
        ".swiper-slide-active .hero__btn"
      );
      buttons.forEach((el) => {
        el.setAttribute("tabindex", -1);
      });
      activeButton.setAttribute("tabindex", 0);
    }

    setInterval(accessToButtons, 2000);

    openOuterButtonsList();
    addEventsOnInnerButtons();
    setAriaAttribute();
    navigateAnchors();
    showCurrentPerson();
    selectCountry();
    showAndHideArticles();
    showDropDown();
    paintBorder();
    burgerActive();
    searchActive();
    addClass(".edition__checkbox-label", "edition__checkbox-label_active");
    managePopUps();

    if (document.documentElement.clientWidth <= 575) {
      initSlider();
      createSpoiler();
      document.querySelector(".active-on-desktop-and-tablet").innerHTML =
        document
          .querySelector(".active-on-desktop-and-tablet")
          .innerHTML.replace(/&nbsp;/gi, "");
    } else if (document.documentElement.clientWidth <= 767) {
      initSlider();
    }
  });
})();

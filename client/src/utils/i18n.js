import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { store } from "../redux/store";

const resources = {
  eng: {
    translation: {
      logout: "Logout",
      "Create your route": "Create your route",
      "There is nothing yet": "There is nothing yet (",
      About: "About",
      "Find your new journey": "Find your new journey",
      Country: "Country",
      Category: "Category",
      Search: "Search",
      Add: "Add",
      Remove: "Remove",
      "Show on map": "Show on map",
      More: "More",
      "Route name": "Route name",
      "Short description": "Short description",
      Description: "Description",
      Upload: "Upload photo",
      "Point name": "Point name",
      "Selected categories": "Selected categories",
      "Selected points": "Selected points",
      "Uploaded images": "Uploaded images",
      "Create route": "Create route",
      "Sign in": "Sign in",
      "Sign up": "Sign up",
      "Created by": "Created by",
      "Brief description": "Brief description",
      Photos: "Photos",
      Comments: "Comments",

      Points: "Points",
      Nothing: "There is nothing... yet",
      "Routes created by user": "Routes created by user",
      "Routes created by you": "Routes created by you",
      Followers: "Followers",
      Following: "Following",
      Comment: "Comment",

      "Enter new username": "Enter new username",
      "Enter new about information": "Enter new About information",
      Update: "Update",

      "About user": "About user",

      "New adventure": "Find your new adventure.",
      "We will help": "And we will help you with this.",

      "Welcome to LocalTravel": "Welcome to LocalTravel",
      Email: "Email",
      Password: "Password",
      Username: "Username",
      "Select categories": "Select categories",
      "Min 10 chars": "Minimum 10 characters",
      "Min 30 chars": "Minimum 30 characters",
      "Min 50 chars": "Minimum 50 characters",

      passReq: "Password requirements",

      AddLandmark: "Add landmark",
      Sub: "Subscription",
      CSub: "Cancel subscription",
      reqOne: "Length from 8 to 15",
      reqTwo: "At least 1 character in upper case and 1 in lower case",
      reqThree: "Minimum 1 digit and 1 special character (d@$!%*?&_)",
    },
  },
  ru: {
    translation: {
      logout: "Выйти",
      "Create your route": "Создайте свой маршрут",
      "There is nothing yet": "Здесь пока пусто (",
      About: "О вас",
      "Find your new journey": "Найдите новое приключение",
      Country: "Страна",
      Category: "Категория",
      Search: "Найти",
      Add: "Добавить",
      Remove: "Удалить",
      "Show on map": "Показать на карте",
      More: "Подробнее",
      "Route name": "Название маршрута",
      "Short description": "Короткое описание",
      Description: "Описание",
      Upload: "Загрузить фото",
      "Point name": "Имя точки",
      "Selected categories": "Выбранные категории",
      "Selected points": "Выбранные точки",
      "Uploaded images": "Загруженные фото",
      "Create route": "Создать маршрут",
      "Sign in": "Войти",
      "Sign up": "Регистрация",
      "Created by": "Создана",
      "Brief description": "Краткое описание",
      Photos: "Фото",
      Comments: "Комментарии",

      Points: "Точки",
      Nothing: "Здесь пока что ничего нет",
      "Routes created by user": "Маршруты созданные пользователем",
      "Routes created by you": "Маршруты созданные вами",
      Followers: "Подписчики",
      Following: "Отслеживаемые",
      Comment: "Комментировать",

      "Enter new username": "Введите новое имя",
      "Enter new about information": "Введите новую информацию",
      Update: "Обновить",

      "About user": "О пользователе",

      "New adventure": "Найдите ваше новое приключение.",
      "We will help": "А мы вам с этим поможем.",

      "Welcome to LocalTravel": "Добро пожаловать на LocalTravel",
      Email: "Адрес электронной почты",
      Password: "Пароль",
      Username: "Имя пользователя",
      "Select categories": "Выберите категории",
      "Min 10 chars": "Минимум 10 символов",
      "Min 30 chars": "Минимум 30 символов",
      "Min 50 chars": "Минимум 50 символов",

      AddLandmark: "Добавить достопримечательость",
      Sub: "Подписка",
      CSub: "Отменить подписку",

      passReq: "Требования к паролю",
      reqOne: "Длина от 8 до 15",
      reqTwo: "Минимум 1 символ в врехнем регистре и 1 в нижнем",
      reqThree: "Минимум 1 цифра и 1 специальный символ (d@$!%*?&_)",
    },
  },
};

const langDetector = {
  type: "languageDetector",
  async: false,
  detect: () => {
    const preferredLang = store.getState("lang");
    if (preferredLang) {
      return "ru";
    }

    return "en";
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(initReactI18next)
  .use(langDetector)
  .init({
    resources,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

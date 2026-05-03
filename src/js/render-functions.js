import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loaderOverlay = document.querySelector('.loader-overlay');

// Ініціалізація SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  // 1. Створюємо проміси для завантаження кожної картинки
  const promises = images.map(image => {
    return new Promise(resolve => {
      const img = new Image();
      img.src = image.webformatURL;
      img.onload = () => resolve();
      img.onerror = () => resolve(); // продовжуємо, навіть якщо одна впала
    });
  });

  // 2. Повертаємо результат тільки після завантаження всіх фото
  return Promise.all(promises).then(() => {
    const markup = images
      .map(
        image => `
      <li class="gallery-card">
        <a class="gallery-link" href="${image.largeImageURL}">
          <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" />
        </a>
        <div class="card-info">
          <div class="info-block"><span class="info-label">Likes</span><span class="info-value">${image.likes}</span></div>
          <div class="info-block"><span class="info-label">Views</span><span class="info-value">${image.views}</span></div>
          <div class="info-block"><span class="info-label">Comments</span><span class="info-value">${image.comments}</span></div>
          <div class="info-block"><span class="info-label">Downloads</span><span class="info-value">${image.downloads}</span></div>
        </div>
      </li>
      `
      )
      .join('');

    galleryContainer.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
  });
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  if (loaderOverlay) loaderOverlay.classList.add('is-active');
}

export function hideLoader() {
  if (loaderOverlay) loaderOverlay.classList.remove('is-active');
}

// ========================================================
// Для організації коду використовуй модульність та синтаксис export/import.
//
// У файлі render-functions.js створи екземпляр SimpleLightbox для роботи з модальним вікном та зберігай функції для відображення елементів інтерфейсу:
// ========================================================
// •	createGallery(images). Ця функція повинна приймати масив images, створювати HTML-розмітку для галереї, додавати її в контейнер галереї та викликати метод екземпляра SimpleLightbox refresh(). Нічого не повертає.
// •	clearGallery(). Ця функція нічого не приймає та повинна очищати вміст контейнера галереї. Нічого не повертає.
// •	showLoader(). Ця функція нічого не приймає, повинна додавати клас для відображення лоадера. Нічого не повертає.
// •	hideLoader(). Ця функція нічого не приймає, повинна прибирати клас для відображення лоадера. Нічого не повертає.
// ========================================================

// ---------------------------------
// IMPORT/EXPORT VIA ECMAScript Modules (ESM)
// ---------------------------------
// ECMAScript Modules (ESM) — сучасний стандарт системи модулів JavaScript, який відповідає за організацію та уніфікований підхід до імпорту та експорту даних між різними файлами в проєкті.
// ---------------------------------/named/ ---------------------------------
// Іменований експорт (named export) — це спосіб експортування одного або кількох значень з модуля під конкретними іменами.
// ---------------------------------
// За допомогою іменованого експорту можна отримати доступ до будь-якого значення: змінної, функції або об'єкта тощо під певним ім'ям. Пізніше ці значення можна імпортувати в іншому файлі за допомогою цього самого імені.
// --------------------------------------
// **************/export/**************/
// Операція іменованого експорту реалізована конструкцією з export.
// Ось так виглядає синтаксис для іменованого експорту.
// ----------------
// export const makeMessage = username => {
// 	return `Welcome, ${username}!`;
// };
// ----------------
// export const levels = ["easy", "medium", "hard"];
// ------------------------------------------
// Зверни увагу! Кількість іменованих експортів в одному модулі не обмежена, на відміну від експорту за замовчуванням, який може бути тільки один.
// --------------------------------------
//**************/ import /**************/
// Операція іменованого імпорту реалізована конструкцією з import.
// ----------------
// import { name } from "..."
// ----------------
// У будь-якому іншому файлі проєкту можна імпортувати конкретні елементи з іншого файлу (модуля), використовуючи їх імена в конструкції іменованого імпорту.
// ----------------
// import { makeMessage, levels } from "./makeMessage";
// console.log(makeMessage("Jacob")); // "Welcom, Jacob!"
// console.log(levels); // ["easy", "medium", "hard"]
// ------------------------------------------
// Зверни увагу, що при імпорті ми вказуємо конкретні імена, які були використані при експорті. Це дозволяє точно вказати, які значення ми хочемо імпортувати з модуля.

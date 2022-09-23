import { galleryItems } from "./gallery-items.js";
// Change code below this line
console.log(galleryItems);

const gallery = document.querySelector(".gallery");
const markupGallery = galleryItems.reduce(
  (acc, item) =>
    acc +
    `<div class="gallery__item">
            <a class="gallery__link" href="${item.original}">
            <img
                class="gallery__image"
                src="${item.preview}"
                data-source="${item.original}"
                alt="${item.description}"
            />
            </a>
        </div>`,
  ""
);
gallery.insertAdjacentHTML("beforeend", markupGallery);
//console.log(gallery);

gallery.addEventListener("click", onClickItem);

function onClickItem(evt) {
  evt.preventDefault();
  if (evt.target.classList.contains("gallery__image")) {
    const currentItem = evt.target;
    //console.log(currentItem);

    const instance = basicLightbox.create(`
      <div class="modal">
      <img src="${currentItem.dataset.source}"
                />
    </div>`);
    instance.show();

    const modal = document.querySelector(".modal");
    //console.log(modal);
    modal.addEventListener("click", onClickClose);
    function onClickClose(evt) {
      document.removeEventListener("keydown", onClickCloseEsc);
      instance.close();
    }

    document.addEventListener("keydown", onClickCloseEsc);
    function onClickCloseEsc(evt) {
      if (evt.code === "Escape") {
        instance.close();
      }
    }
  }
}

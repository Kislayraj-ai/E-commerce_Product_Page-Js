// select elements function
let get = (select) => {
  const element = document.querySelector(select);
  if (element) return element;
  throw new Error(`Please check the ${select}`);
};

const ImageContainer = get('.images_list');
const lightBoxModal = get('.lightBox');
const list = [...document.querySelectorAll('#main-section footer img')];
const lightBoxImage = get('.lightBox_list');
const lightBoxImageContainer = get('.lightBox_image-container');

const Btn = document.querySelectorAll('.lightBox_btn');
const closeLightBox = get('.closeLightBox');

closeLightBox.addEventListener('click', () => {
  if (lightBoxModal.classList.contains('Show'))
    lightBoxModal.classList.remove('Show');
});

ImageContainer.addEventListener('click', (e) => {
  if (e.target.src) {
    lightBoxModal.classList.add('Show');
    let front = e.target.src.slice(21);
    let newFront = front.slice(0, 23);
    lightBoxImageContainer.innerHTML = `
    <img  src=${newFront}.jpg  class="lightBox_Mainimage" alt="imagesSlide" />`;
  }

  lightBoxImage.innerHTML = list
    .map((img) => {
      return ` <img src=${img.src} class="thumbnail" alt="images"/>`;
    })
    .join(' ');
  lightBoxModal.append(lightBoxImage);
  const listImage = document.querySelectorAll('.thumbnail');
  const mainImage = document.querySelector('.lightBox_Mainimage');

  listImage.forEach((img) => {
    let imageSrc = `${mainImage.src.slice(0, 44)}-thumbnail.jpg`;
    if (mainImage) {
      if (img.src === imageSrc) img.classList.add('selected');
    }
  });

  Btn.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('prevBtn')) {
        const selected = document.querySelector('.selected');
        let previousImage = selected.previousElementSibling;
        if (!selected.previousElementSibling) return;
        listImage.forEach((img) => {
          img.classList.remove('selected');
        });
        previousImage.classList.add('selected');
      }

      if (btn.classList.contains('nextBtn')) {
        const selected = document.querySelector('.selected');
        let nextImage = selected.nextElementSibling;
        if (!selected.nextElementSibling) return;
        listImage.forEach((img) => {
          img.classList.remove('selected');
        });
        nextImage.classList.add('selected');
      }
      const selected = document.querySelector('.selected');
      let selectedImage = selected.src.slice(21);
      let selectedImageSrc = selectedImage.slice(0, 23);
      lightBoxImageContainer.innerHTML = `
      <img  src=${selectedImageSrc}.jpg  class="lightBox_Mainimage" alt="imagesSlide" />`;
    });
  });
});

export { get };

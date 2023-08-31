let title;
let publishDate;
let artist;


/**
 *@param img_index
 *
 * This function will search for art by id in Chicago Art API 
 * Upon clickEvent Get return title, artist, and publish date from API
 * Include promise
 */

async function clickedEvent(img_index){

    let art = document.getElementsByTagName('img')[img_index].attributes[1].value;

    let headers = new Headers([
        ['Content-Type', 'application/json'],
        ['AIC-User-Agent', 'aic-bash (engineering@artic.edu)']
    ]);

    let request = new Request(`https://api.artic.edu/api/v1/artworks/${art}`,{
        method: 'GET',
        headers: headers
    });

    let result = await fetch(request);

    let response = await result.json();

    title = response.data.title;
    publishDate = response.data.date_display;
    artist = response.data.artist_display;

    return { title, publishDate, artist };

}

const modal = document.getElementById("myModal");
const modalTitle = document.getElementById("modalTitle");
const modalPublished = document.getElementById("modalPublished");
const modalArtist = document.getElementById("modalArtist")
const closeButton = document.getElementsByClassName("close")[0];


// Open the modal with content
function openModalWithContent(data1, data2, data3) {
  return new Promise((resolve, reject) => {
    modalTitle.innerText = data1;
    modalPublished.innerText = data2;
    modalArtist.innerText = data3;
    modal.style.display = "block";
    resolve(); 
  })
};

// Close the modal
function closeModal() {
  modal.style.display = "none";
};

// Attach click event to close button
closeButton.addEventListener("click", closeModal);

// Attach click event to window to close modal when clicked outside
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});


const galleryItems = document.querySelectorAll('.gallery_item');

galleryItems.forEach((item, index) => {
  item.addEventListener('click', async () => {
    const {title, publishDate, artist} = await clickedEvent(index);
    openModalWithContent(title, publishDate, artist)
  })
})

 /*
  is it too much to create a switch statement that recycles the figure-image and make it appear in the modal?
   I want to show the image in a larger size 

 */ 
dsd
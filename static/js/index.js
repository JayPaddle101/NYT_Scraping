document.addEventListener('DOMContentLoaded', function () {

    const carousel = document.querySelector('.carousel');
    const cards = document.querySelectorAll('.card');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentCardIndex = 0;
        // Function to determine the number of cards per slide based on screen width
    function getCardsPerSlide() {
        if (window.innerWidth > 768) {
            return 3; // 3 cards for larger screens
        } else if (window.innerWidth > 480) {
            return 2; // 2 cards for medium screens
        } else {
            return 1; // 1 card for small screens
        }
    }

    // Function to show/hide cards based on the currentCardIndex
    function showCurrentCard() {
        let cardsPerSlide = getCardsPerSlide();
        cards.forEach((card, index) => {
            if (index >= currentCardIndex && index < currentCardIndex + cardsPerSlide) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Initialize the carousel
    showCurrentCard();

    // Function to handle the "Next" button click
    function nextCard() {
        let cardsPerSlide = getCardsPerSlide();
        currentCardIndex = (currentCardIndex + cardsPerSlide) % cards.length;
        showCurrentCard();
    }

    // Function to handle the "Previous" button click
    function prevCard() {
        let cardsPerSlide = getCardsPerSlide();
        currentCardIndex = (currentCardIndex - cardsPerSlide + cards.length) % cards.length;
        showCurrentCard();
    }

    // Event listeners for arrow buttons
    nextBtn.addEventListener('click', nextCard);
    prevBtn.addEventListener('click', prevCard);


    const aboutLink = document.getElementById('about-link');
    const aboutModal = document.getElementById('about-modal');
    const closeModal = document.getElementById('close-modal');

    aboutLink.addEventListener('click', (e) => {
        e.preventDefault();
        aboutModal.style.display = 'block'; // Show the modal
    });

    closeModal.addEventListener('click', () => {
        aboutModal.style.display = 'none'; // Hide the modal when close button is clicked
    });

  
});
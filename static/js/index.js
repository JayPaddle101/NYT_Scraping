document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel');
    const cards = document.querySelectorAll('.card');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentCardIndex = 0;
    const cardsPerSlide = 3; // Number of cards to show in each slide

    // Function to show/hide cards based on the currentCardIndex
    function showCurrentCard() {
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
        currentCardIndex = (currentCardIndex + cardsPerSlide) % cards.length;
        showCurrentCard();
    }

    // Function to handle the "Previous" button click
    function prevCard() {
        currentCardIndex = (currentCardIndex - cardsPerSlide + cards.length) % cards.length;
        showCurrentCard();
    }

    // Event listeners for arrow buttons
    nextBtn.addEventListener('click', nextCard);
    prevBtn.addEventListener('click', prevCard);
});
// alert('error');
document.addEventListener('DOMContentLoaded', function () {
  // Select all elements with the class 'search_btn'
  const allButtons = document.querySelectorAll('.search_btn');
  // Select the search bar element
  const searchBar = document.querySelector('.searchBar');
  // Select the search input element
  const searchInput = document.getElementById('searchInput');
  // Select the search close button element
  const searchClose = document.getElementById('searchClose');

  // Add click event listeners to all buttons with the class 'search_btn'
  for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener('click', function () {
      // Make the search bar visible and toggle the 'open' class
      searchBar.style.visibility = 'visible';
      searchBar.classList.toggle('open');
      // Set the aria-expanded attribute to true
      this.setAttribute('aria-expanded', 'true');
      // Focus on the search input element
      searchInput.focus();
    });
  }

  // Add click event listener to the search close button
  searchClose.addEventListener('click', function () {
    // Hide the search bar and remove the 'open' class
    searchBar.style.visibility = 'hidden';
    searchBar.classList.remove('open');
    // Set the aria-expanded attribute to false
    this.setAttribute('aria-expanded', 'false');
  });
});
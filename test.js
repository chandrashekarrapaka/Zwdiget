document.addEventListener('DOMContentLoaded', function() {
  var outerInput = document.getElementById('outer');
  var innerInput = document.getElementById('inner');
  var footer = document.getElementById('footer');
  var autopaginationCheckbox = document.getElementById('autopagination');
  var currentPage = 1;
  var divsPerPage = 2;
  var totalDivs = 0;
  var divs = [];
  var autopaginationInterval = null;

  outerInput.addEventListener('input', updateDivs);
  innerInput.addEventListener('input', updateDivs);
  autopaginationCheckbox.addEventListener('change', handleAutopagination);

  function updateDivs() {
    var outerValue = parseInt(outerInput.value);
    var innerValue = parseInt(innerInput.value);

    clearDivs();
    totalDivs = outerValue;

    for (var i = 0; i < outerValue; i++) {
      var outerDiv = document.createElement('div');
      outerDiv.classList.add('outerDiv');

      for (var j = 0; j < innerValue; j++) {
        var innerDiv = document.createElement('div');
        innerDiv.classList.add('innerDiv');

        var infoButton = document.createElement('button');
        infoButton.classList.add('infoButton');
        infoButton.innerHTML = 'ℹ️';
        infoButton.addEventListener('click', showTimerPopup);

        innerDiv.appendChild(infoButton);
        outerDiv.appendChild(innerDiv);
      }

      divs.push(outerDiv);
      document.body.appendChild(outerDiv);
    }

    showPage(1);
    generatePagination();
  }

  function clearDivs() {
    divs.forEach(function(div) {
      div.parentNode.removeChild(div);
    });
    divs = [];
  }

  function showPage(page) {
    var startIndex = (page - 1) * divsPerPage;
    var endIndex = startIndex + divsPerPage;

    divs.forEach(function(div, index) {
      if (index >= startIndex && index < endIndex) {
        div.style.display = 'block';
      } else {
        div.style.display = 'none';
      }
    });
  }

  function generatePagination() {
    var numPages = Math.ceil(totalDivs / divsPerPage);

    footer.innerHTML = '';

    for (var i = 1; i <= numPages; i++) {
      var pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.addEventListener('click', function() {
        currentPage = parseInt(this.textContent);
        showPage(currentPage);
      });

      footer.appendChild(pageButton);
    }
  }

  function showTimerPopup() {
    var timerPopup = document.createElement('div');
    timerPopup.classList.add('timerPopup');

    var timerDisplay = document.createElement('span');
    timerDisplay.classList.add('timerDisplay');

    timerPopup.appendChild(timerDisplay);
    document.body.appendChild(timerPopup);

    var seconds = 0;
    var timerInterval = setInterval(function() {
      seconds++;
      timerDisplay.textContent = formatTime(seconds);
    }, 1000);

    timerPopup.addEventListener('click', function() {
      clearInterval(timerInterval);
      timerPopup.parentNode.removeChild(timerPopup);
    });
  }

  function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;

    return `${padZero(minutes)}:${padZero(remainingSeconds)}`;
  }

  function padZero(number) {
    return number < 10 ? '0' + number : number;
  }

  function handleAutopagination() {
    if (this.checked) {
      autopaginationInterval = setInterval(function() {
        currentPage++;
        if (currentPage > Math.ceil(totalDivs / divsPerPage)) {
          currentPage = 1;
        }
        showPage(currentPage);
      }, 5000);
    } else {
      clearInterval(autopaginationInterval);
    }
  }
});

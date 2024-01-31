(() => {
    const movieBox = document.querySelector("#movie-box");
    const reviewTemplate = document.querySelector("#review-template");
    const reviewCon = document.querySelector("#review-con");
    const baseUrl = `https://swapi.dev/api/`;
    const spinnerCon = document.querySelector('#spinner-con');
    const spinner = `<svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
    <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
    <animateTransform
    attributeName="transform"
    attributeType="XML"
    type="rotate"
    dur="1s"
    from="0 50 50"
    to="360 50 50"
    repeatCount="indefinite" />
    </path>
    </svg>`;

    function getCharacters() {
        fetch(`${baseUrl}people`)
        .then(response => response.json())
        .then(function(response) {
            console.log(response.results);
            const people = response.results;
            const ul = document.createElement('ul');
            people.forEach(characters => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.textContent = characters.name;
                // store all URLs
                a.dataset.reviews = characters['films'].join(',');
                // a.dataset.reviews = person['films'][0];
                console.log(a.dataset.reviews);

                li.appendChild(a);
                ul.appendChild(li);

            });
            movieBox.appendChild(ul);
        })
        .then(function() {
            const links = document.querySelectorAll('#movie-box li a');
            links.forEach(link => {
                link.addEventListener("click", getReview);
            });
        })
        .catch(error => {
            console.log(error);
        });
    }
    

    function getReview(e) {
        e.preventDefault();
        spinnerCon.innerHTML = spinner;
        //split all urls from a.dataset.reviews, and display urls
        const movieUrls = e.currentTarget.dataset.reviews.split(',');
    
        // randomly choose one of URL
        const randomIndex = Math.floor(Math.random() * movieUrls.length);
        const movieUrl = movieUrls[randomIndex];

        fetch(`${movieUrl}`)
        .then(response => response.json())
        .then(function(response) {
            reviewCon.innerHTML = "";
            console.log(response.title);
            console.log(response.opening_crawl);
            const template = document.importNode(reviewTemplate.content, true);
            const reviewTitle = template.querySelector(".review-heading");
            const reviewBody = template.querySelector(".review-description");
            const episodeBg = document.querySelector("body");
            const img = document.createElement('img');
            const filmInfoWrapper = document.createElement('div');
            filmInfoWrapper.classList.add('filmBg');
            img.src = `images/${response.episode_id}.jpeg`;
            img.classList.add('filmsImg');
            console.log(response.episode_id);
            episodeBg.style.backgroundImage = `url('images/${response.episode_id}.png')`;
            episodeBg.style.backgroundSize = 'cover';
            episodeBg.style.backgroundPosition = 'center';
            episodeBg.style.backgroundRepeat = 'no-repeat';
            reviewTitle.innerHTML = response.title;
            reviewBody.innerHTML = response.opening_crawl;
            reviewCon.appendChild(template);
            reviewCon.appendChild(img);
            reviewCon.appendChild(filmInfoWrapper);
            spinnerCon.innerHTML = '';
        })
        .catch(error => {
            console.log(error);
            spinnerCon.innerHTML = '';
            // showing errors for users
            spinnerCon.innerHTML = `<p>Sorry, there was an error loading the data.</p>`;
        });
    }
    


    getCharacters();
})();


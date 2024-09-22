const categoriesDataLoad = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    const dataShow = data.data.news_category;

    // Categories Appended as a Child
    const ulCategoryElement = document.getElementById('category-main-list');
    dataShow.forEach((category) => {

        const liCategory = document.createElement('li');
        liCategory.innerHTML = `
                <a onclick="handleCategoryNews('${category.category_id}')" href="#">${category.category_name}</a>
        `;

        ulCategoryElement.appendChild(liCategory);

    })
}



// Access Categories NEWS
const handleCategoryNews = async (categoryId) => {
    loadSpinner(true);
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await response.json();
    const allDataShow = data.data;

    // category length
    const categoryLengthElement = document.getElementById('category-length');
    categoryLengthElement.innerText = allDataShow.length;

    // restart the append Value
    const newsWrapperContainer = document.getElementById('main-news-box');
    newsWrapperContainer.innerHTML = "";

    allDataShow.forEach((news) => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('news-singel-box-wrapper');
        newDiv.innerHTML = `
       
                        <div class="news-img">
                            <img src="${news.image_url}" alt="">
                        </div>
                        <div class="news-des-container">
                            <div class="only-news-des">
                                <h2>${news.title}</h2>
                                <p>${news.details}</p>
                            </div>
                            <div class="author-container">
                                <div class="author">
                                    <div class="author-img">
                                        <img src="Avatar.png" alt="">
                                    </div>
                                    <div class="author-des">
                                        <h4>${news?.author?.name}</h4>
                                        <span>${news?.author?.published_date}</span>
                                    </div>
                                </div>
                                <div class="news-views-container">
                                    <div class="news-views">
                                        <i class="material-icons">visibility</i>
                                        <span>${news?.total_view ? news?.total_view: "No Views"}</span>
                                    </div>
                                </div>
                                <div class="rating-star">
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star</i>
                                </div>
                                <div onclick="handleModal('${news._id}')" class="next-array">
                                    <i class="material-icons">east</i>
                                </div>
                            </div>
                        </div>
       
       `;

       newsWrapperContainer.appendChild(newDiv);

       loadSpinner(false);
    })

}


// Loading Spinner
const loadSpinner = (spinner) => {
    const  loaderSpinnerElement = document.getElementById('loaderSpinner');
    if(spinner){
       loaderSpinnerElement.classList.remove('hidden');
    }

    else{
        loaderSpinnerElement.classList.add('hidden')
    }
}




// Modal

const handleModal = async (newsID) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/${newsID}`);
    const data = await response.json();
    const dataAllShow = data.data[0];
    console.log(dataAllShow)
    const myModal = document.getElementById('myModal');
    myModal.classList.remove('hidden');

    const modalProudctImg = document.querySelector('.modal-proudct-img');
    modalProudctImg.innerHTML = `
            <img src="${dataAllShow.thumbnail_url}" alt="">
    `;

    const modalProductDetails = document.querySelector('.modal-product-details');
    modalProductDetails.innerHTML = `
    
                    <h3>${dataAllShow.title}</h3>
                    <p class="modal-des">${dataAllShow.details}</p>
    `;
}



// Modal Close BTN
const handleCloseBtn = () => {
    const myModalElement = document.getElementById('myModal');
    myModalElement.classList.add('hidden');
}

categoriesDataLoad();
handleCategoryNews('08');
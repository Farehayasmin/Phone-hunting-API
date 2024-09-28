let fullPhoneList = []; // To store the full list of phones for "Show All" functionality

const loadPhone = async (searchText='13', isShowAll) => {
    // Show the loading spinner
    toggleLoadingSpinner(true);

    // Fetch data from the API
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;

    // Store the full phone list
    fullPhoneList = phones;

    // Display the first 12 phones
    displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = ''; // Clear the container before adding new cards

    // Display the "Show All" button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }
    // console.log('is show all', isShowAll)
   
    // Display only the first 12 phones
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;

        phoneCard.innerHTML = `
            <figure>
                <img src="${phone.image}" alt="${phone.phone_name}" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>This phone is known for its great features!</p>
                <div class="card-actions justify-center">
                    <button onclick="handleShowDetail('${phone.slug}');"class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `;

        phoneContainer.appendChild(phoneCard);
    });

    // Hide the loading spinner
    toggleLoadingSpinner(false);
}

// 
const handleShowDetail = async(id) =>{
    // console.log('clicked show details', id)
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');

    showDetailContainer.innerHTML = ` <img src="${phone.image}"alt=""/>
    <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
    <p><span>GPS:</span>${phone?.others?.GPS || 'No GPS'}</p>
`
    // show the modal
    show_details_modal.showModal();

}

const handleSearch = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText);
};

const showAllPhones = () => {
    displayPhones(fullPhoneList); // Re-display all phones when "Show All" is clicked
};

// Toggle loading spinner visibility
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
};

// handle show All
const handleShowAll = () =>{
    handleSearch(true);
}
loadPhone();
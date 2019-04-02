

/*
   Inititalises the first ten items, the pagination links and search bar when the DOM content has suiccessfully loaded
 */
window.addEventListener('DOMContentLoaded', () => {
   const studentItems = document.querySelectorAll('.student-item');
   const page = document.querySelector('.page');

   showPage(studentItems);
   appendPageLink(studentItems, page);
   appendSearch(document.querySelector('.page-header'), studentItems);
   appendNoResultsMessage(page);
});

/* 
   Takes in a collectioon of elements and a page number as parameters and sets the display of the 10 elements 
   corresponding to the page number to block and all other elements in the collection to none to hide them.
*/
function showPage(itemsList, pageNumber = 1) {
   const numberOfItems = itemsList.length;
   const itemStartIndex = (pageNumber - 1) * 10; // calculates the start index of the elements in the collection to be shown 
   const itemEndIndex = (pageNumber * 10) - 1; // calculates the end index of the elements in the collection to be shown 
   for (let i = 0; i < numberOfItems; i++) {
      itemsList[i].style.display = (i >= itemStartIndex && i <= itemEndIndex) ? 'block' : 'none';
   }
}

/*
   Takes in a collection of elements and a parent element. Creates pagination links based on the collection length
   and appends it to the parent. Adds a listener to the pagination links to handle routing to desired page number
 */
function appendPageLink(itemsList, targetParent) {
   let pagesRequired = Math.ceil(itemsList.length / 10); // determines the number of pages reuired to have at most ten items per page
   const paginationContainer = document.createElement('div');
   let paginationList = document.createElement('ul');

   createPaginationnListOfLinks(paginationList, pagesRequired);

   paginationContainer.appendChild(paginationList);
   paginationContainer.className = 'pagination';
   targetParent.appendChild(paginationContainer);

   // add listener to handle page routing 
   paginationList.addEventListener('click', (event) => {
      handlePaginationLinks(event, itemsList);
   });
}

/*
   Dynamically creates links to pages based on the list size and appends them to a parent container. 
   Sets the first link to be active
 */
function createPaginationnListOfLinks(parentOfList, numberOfLinks) {

   for (let i = 0; i < numberOfLinks; i++) {
      const link = document.createElement('li');
      link.innerHTML = `<a href = "#">${i + 1}</a>`
      parentOfList.appendChild(link);
   }

   parentOfList.firstElementChild.querySelector('a').className = 'active';
}

/*
   Event handler to handle routing to correct page number when a link is clicked. Takes in the event object and 
   a collection of itemsIt sets thes the targeted page link to active and displayes the items corresponding to 
   the targeted page number
 */
function handlePaginationLinks(event, itemsList) {
   event.preventDefault();
   const clickedNode = event.target;
   const currentPageLink = document.querySelector('.active');
   const currentPageNumber = parseInt(currentPageLink.textContent, 10);
   if (clickedNode.tagName.toLowerCase() === 'a') { // checks if the target node is a link
      const targetPageNumber = parseInt(clickedNode.textContent, 10);
      if (currentPageNumber !== targetPageNumber) {
         currentPageLink.classList.remove('active'); // removes the current active link
         clickedNode.className = 'active'; // sets the target page number link to active
         showPage(itemsList, targetPageNumber); // displayes the targetted items for the corresponding page number
      }
   }
}

/*
   Takes in a target parent element and collection of items. Creates a search input and buttons and appens it it 
   to the parent element. Sets the vent listener to handle the searches for keyup and search button clicks 
 */
function appendSearch(targetParent, itemsList){
   const searchContainer = document.createElement('div');

   searchContainer.innerHTML = ` <input placeholder="Search for students...">
   <button>Search</button>`
   searchContainer.className = 'student-search';
   targetParent.appendChild(searchContainer);
   
   searchContainer.addEventListener('keyup', (event) => handleSearch(event, itemsList));
   searchContainer.querySelector('button').addEventListener('keyup', (event) => handleSearch(event, itemsList));
}

/*
   Event handler to handle searches. Takes in the event object and the collection of items. Displays the items
   with email or name mathcing the search query , hides rest and displays pagination list based on the number
   of displayed items 
 */
function handleSearch(event, itemsList){
   const targetNode = event.target;
   if(targetNode.tagName.toLowerCase() === 'input' || targetNode.tagName.toLowerCase() === 'button'){ 
      // filters the list for the searched query
      const filteredStudents = filterStudentItemsByPattern(itemsList, targetNode.value); 
      const page = document.querySelector('.page');
      const paginationContainer = page.querySelector('.pagination');
      const noResultContainer = document.querySelector('.no-result-container');
      
      // hides all items and removes original pagination links
      hidePage(itemsList, paginationContainer, page); 
      
      
      if(filteredStudents.length > 0){ 
         showPage(filteredStudents);
         appendPageLink(filteredStudents, page);
         // Hides the message for no results
         noResultContainer.style.display = 'none'; 
      }else{
         // shows the no search result message if the query returned no results
         showNoResultMessage(noResultContainer, targetNode.value);
      }
   }
}

/*
   takes in an item list, the pagination link container and it's parent. Hides all the items and removes the pagination links
 */
function hidePage(itemsList, linkContainer, parentContainer){
   const numberOfItems = itemsList.length;
   for (let i = 0; i < numberOfItems; i++) {
      itemsList[i].style.display = 'none';
   }

   if(linkContainer != null){
      parentContainer.removeChild(linkContainer);
   }
}

/*
   Takes in the parent container and the search query and displays the the message for no results with the coresponding query displayed
 */
function showNoResultMessage(parentContainer, searchedQuery){
   parentContainer.style.display = 'block';
   parentContainer.querySelector('.no-result-query').textContent = `"${searchedQuery}"`;
}

/*
   Takes in a collection of items and a string pattern. Filters the collections for the takes patern and returns it as a list
 */
function filterStudentItemsByPattern(itemsList, textPattern){
   /*
      The parameter is converted to an array list in case it is a collection of elements to be able to use the Array.filter method 
      https://stackoverflow.com/questions/32765157/filter-or-map-nodelists-in-es6
   */
   return Array.from(itemsList).filter((student) => {
      const studentName = student.querySelector('h3');
      const studentEmail = student.querySelector('.email')

      /*
         Checks if the items name or email matches the text pattern
          https://stackoverflow.com/questions/1789945/how-to-check-whether-a-string-contains-a-substring-in-javascript  
       */
      return studentName.textContent.includes(textPattern) || studentEmail.textContent.includes(textPattern);
   });
}

/*
 Takes in the parent node and appends a no results message to it and set's the display as hidden to not display it initially 
 */
function appendNoResultsMessage(parentNode){
   const messageContainer = document.createElement('div');

   messageContainer.innerHTML = `<h2>Sorry, we could not find any name or email matching <span class = "no-result-query"></span>. Please try something else ...</h2>`
   messageContainer.className = 'no-result-container';
   messageContainer.style.display ='none';
   parentNode.appendChild(messageContainer);
}



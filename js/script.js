/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

window.addEventListener('DOMContentLoaded', () => {
   const studentItems = document.querySelectorAll('.student-item');
   const page = document.querySelector('.page');

   showPage(studentItems);
   appendPageLink(studentItems, page);
   appendSearch(document.querySelector('.page-header'), studentItems);
   appendNoResultsMessage(page);
});

function showPage(itemsList, pageNumber = 1) {
   const numberOfItems = itemsList.length;
   const itemStartIndex = (pageNumber - 1) * 10;
   const itemEndIndex = (pageNumber * 10) - 1;
   for (let i = 0; i < numberOfItems; i++) {
      itemsList[i].style.display = (i >= itemStartIndex && i <= itemEndIndex) ? 'block' : 'none';
   }
}

function appendPageLink(itemsList, targetParent) {
   let pagesRequired = Math.ceil(itemsList.length / 10);
   const paginationContainer = document.createElement('div');
   let paginationList = document.createElement('ul');

   createPaginationnListOfLinks(paginationList, pagesRequired);

   paginationContainer.appendChild(paginationList);
   paginationContainer.className = 'pagination';
   targetParent.appendChild(paginationContainer);

   paginationList.addEventListener('click', (event) => {
      handlePaginationLinks(event, itemsList);
   });
}


function createPaginationnListOfLinks(parentOfList, numberOfLinks) {

   for (let i = 0; i < numberOfLinks; i++) {
      const link = document.createElement('li');
      link.innerHTML = `<a href = "#">${i + 1}</a>`
      parentOfList.appendChild(link);
   }

   parentOfList.firstElementChild.querySelector('a').className = 'active';
}

function handlePaginationLinks(event, itemsList) {
   event.preventDefault();
   const clickedNode = event.target;
   const currentPageLink = document.querySelector('.active');
   const currentPageNumber = parseInt(currentPageLink.textContent, 10);
   if (clickedNode.tagName.toLowerCase() === 'a') {
      const targetPageNumber = parseInt(clickedNode.textContent, 10);
      if (currentPageNumber !== targetPageNumber) {
         currentPageLink.classList.remove('active');
         clickedNode.className = 'active';
         showPage(itemsList, targetPageNumber);
      }
   }
}

function appendSearch(targetParent, itemsList){
   const searchContainer = document.createElement('div');

   searchContainer.innerHTML = ` <input placeholder="Search for students...">
   <button>Search</button>`

   searchContainer.className = 'student-search';
   targetParent.appendChild(searchContainer);

   searchContainer.addEventListener('keyup', (event) => handleSearch(event, itemsList))
   searchContainer.querySelector('button').addEventListener('keyup', (event) => handleSearch(event, itemsList))
}

function handleSearch(event, itemsList){
   const targetNode = event.target;
   if(targetNode.tagName.toLowerCase() === 'input' || targetNode.tagName.toLowerCase() === 'button'){
      const filteredStudents = filterStudentItemsByPattern(itemsList, targetNode.value);
      const page = document.querySelector('.page');
      const paginationContainer = page.querySelector('.pagination');
      const noResultContainer = document.querySelector('.no-result-container');

      hidePage(itemsList, paginationContainer, page);
      
      if(filteredStudents.length > 0){
         showPage(filteredStudents);
         appendPageLink(filteredStudents, page);
         noResultContainer.style.display = 'none';
      }else{
         showNoResultMessage(noResultContainer, targetNode.value);
      }
   }
}

function hidePage(itemsList, linkContainer, parentContainer){
   const numberOfItems = itemsList.length;
   for (let i = 0; i < numberOfItems; i++) {
      itemsList[i].style.display = 'none';
   }

   if(linkContainer != null){
      parentContainer.removeChild(linkContainer);
   }
}

function showNoResultMessage(parentContainer, searchedQuery){
   parentContainer.style.display = 'block';
   parentContainer.querySelector('.no-result-query').textContent = `"${searchedQuery}"`;
}

function filterStudentItemsByPattern(itemsList, textPattern){
   // https://stackoverflow.com/questions/32765157/filter-or-map-nodelists-in-es6
   // https://stackoverflow.com/questions/1789945/how-to-check-whether-a-string-contains-a-substring-in-javascript
   return Array.from(itemsList).filter((student) => {
      const studentName = student.querySelector('h3');
      const studentEmail = student.querySelector('.email')
      return studentName.textContent.includes(textPattern) || studentEmail.textContent.includes(textPattern);
   });
}

function appendNoResultsMessage(parentNode){
   const messageContainer = document.createElement('div');

   messageContainer.innerHTML = `<h2>Sorry, we could not find any name or email matching <span class = "no-result-query"></span>. Please try something else ...</h2>`
   messageContainer.className = 'no-result-container';
   messageContainer.style.display ='none';
   parentNode.appendChild(messageContainer);
}



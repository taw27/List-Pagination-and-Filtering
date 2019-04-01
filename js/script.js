/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
window.addEventListener('DOMContentLoaded', () => {
   const studentItems = document.querySelectorAll('.student-item');
   appendPageLink(studentItems, document.querySelector('.page'));
   showPage(studentItems);
   appendSearch(document.querySelector('.page-header'), studentItems);
});
/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
function showPage(itemsList, pageNumber = 1) {
   const numberOfItems = itemsList.length;
   const itemStartIndex = (pageNumber - 1) * 10;
   const itemEndIndex = (pageNumber * 10) - 1;
   for (let i = 0; i < numberOfItems; i++) {
      itemsList[i].style.display = (i >= itemStartIndex && i <= itemEndIndex) ? 'block' : 'none';
   }
}



/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
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
      hideAllItems(itemsList);
      if(paginationContainer != null){
         page.removeChild(paginationContainer);
      }

      if(filteredStudents.length > 0){
         showPage(filteredStudents);
         appendPageLink(filteredStudents, page);
      }
   }
}

function hideAllItems(itemsList){
   const numberOfItems = itemsList.length;
   for (let i = 0; i < numberOfItems; i++) {
      itemsList[i].style.display = 'none';
   }
}

function filterStudentItemsByPattern(itemsList, textPattern){
   return Array.from(itemsList).filter((student) => {
      const studentName = student.querySelector('h3');
      const studentEmail = student.querySelector('.email')
      return studentName.textContent.includes(textPattern) || studentEmail.textContent.includes(textPattern);
   });
}

// Remember to delete the comments that came with this file, and replace them with your own code comments.
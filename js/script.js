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
const studentItems = document.querySelectorAll('.student-item');
appendPageLink(studentItems, document.querySelector('.page'));
showPage(studentItems);

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
function showPage(itemList, pageNumber = 1) {
   const numberOfItems = itemList.length;
   const itemStartIndex = (pageNumber - 1) * 10 ;
   const itemEndIndex = (pageNumber * 10) - 1;
   for(let i = 1; i < numberOfItems; i++) {
      itemList[i].style.display = (i >= itemStartIndex && i <= itemEndIndex ) ?  'block' : 'none'; 
   }
}



/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
function appendPageLink(itemsList, targetParent){
   let pagesRequired = Math.ceil(itemsList.length/10);
   const paginationContainer = document.createElement('div');
   let paginationList = document.createElement('ul');

   createPaginationnListOfLinks(paginationList, pagesRequired); 

   paginationContainer.appendChild(paginationList);
   paginationContainer.className = 'pagination';
   targetParent.appendChild(paginationContainer);
}

  


function createPaginationnListOfLinks(parentOfList, numberOfLinks) {

   for(let i = 0; i < numberOfLinks; i++) {
      const link = document.createElement('li');
      link.innerHTML = `<a href = "#">${i+1}</a>`
      parentOfList.appendChild(link);
   }

   parentOfList.firstElementChild.querySelector('a').className = 'active';

}




// Remember to delete the comments that came with this file, and replace them with your own code comments.
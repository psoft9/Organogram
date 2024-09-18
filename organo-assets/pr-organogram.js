  
  // Function to convert JSON to HTML structure
  function jsonToHtml(obj) {
    // Create the base pr-wrap div
    var wrap = document.createElement('div');
    wrap.classList.add('pr-wrap');
  
    // Create the pr-box-wrap div and append the box
    var boxWrap = document.createElement('div');
    boxWrap.classList.add('pr-box-wrap');
    boxWrap.innerHTML = obj.prBoxWrap;
    wrap.appendChild(boxWrap);
  
    // Recursively process the children
    if (obj.children && obj.children.length > 0) {
      var childrenDiv = document.createElement('div');
      childrenDiv.classList.add('children');
      obj.children.forEach(function(child) {
        var childHtml = jsonToHtml(child.prWrap);
        childrenDiv.appendChild(childHtml);
      });
      wrap.appendChild(childrenDiv);
      wrap.classList.add('pr-has-child');
    }
  
    return wrap;
  }
  
  // Append generated HTML to .pr-organogram
  document.addEventListener('DOMContentLoaded', function() {
    var organogramDiv = document.querySelector('.pr-organogram');
    var htmlStructure = jsonToHtml(prOrganogram.prWrap);
    organogramDiv.appendChild(htmlStructure);



    /////////////////////////////////////////////////////
    // const childrenElements = document.querySelectorAll('.pr-organogram .children');

    // childrenElements.forEach(childrenElement => {
    //     debugger
    // const firstChild = childrenElement.querySelector('.pr-wrap:first-child');
    // const lastChild = childrenElement.querySelector('.pr-wrap:last-child');
    // console.log("last",lastChild); // This will log the last child element of each .children element


    //   let left = firstChild ? firstChild.offsetWidth / 2 : 0;
    //   let right = lastChild ? lastChild.offsetWidth / 2 : 0;

    // //   console.log(left, right, lastChild.offsetWidth);
  
    //   // Assuming you want to apply these values to the ::before pseudo-element
    //   // This part might require more specific use of styles or CSS variables.
    //   childrenElement.style.setProperty('--before-left', `${left}px`);
    //   childrenElement.style.setProperty('--before-right', `${right}px`);

    // });

    $('.pr-organogram .children').each(function(){
        let left = ($(this).children('.pr-wrap:first-child').width()) / 2;
        let right = ($(this).children('.pr-wrap:last-child').width()) / 2;
        $(this).css({'--before-left': `${left}px`, '--before-right': `${right}px`});
    })
    

  });
  






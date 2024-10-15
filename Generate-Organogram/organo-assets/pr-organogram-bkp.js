
var prOrganogram = {
  prWrap: {
    id: "level_1",
    level: 1,
    prBoxWrap: `<div class='pr-box'>Main</div> <ul>
                <li onclick="addChild(this)">Add Child</li>
                <li onclick="editBox(this)">Edit</li>
                <li onclick="deleteBox(this)">Delete</li>
              </ul>`,
    children: []
  }
};


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


  function writeHtml() {
    var organogramDiv = document.querySelector('.pr-organogram');
    var htmlStructure = jsonToHtml(prOrganogram.prWrap);
    organogramDiv.appendChild(htmlStructure);


    $('.pr-organogram .children').each(function(){
        let left = ($(this).children('.pr-wrap:first-child').width()) / 2;
        let right = ($(this).children('.pr-wrap:last-child').width()) / 2;
        $(this).css({'--before-left': `${left}px`, '--before-right': `${right}px`});
    });
    
  }
  
  // Append generated HTML to .pr-organogram
  // document.addEventListener('DOMContentLoaded', writeHtml);
  
$(document).ready(function(){
  writeHtml();
});

function createBox(d){
  let parent = $('.org-parent').val();
  let box = '<div class="pr-box">' + $(d).val() + '</div>';

      box += `<ul>
                <li onclick="addChild(this)">Add Child</li>
                <li onclick="editBox(this)">Edit</li>
                <li onclick="deleteBox(this)">Delete</li>
              </ul>`;

    prOrganogram.prWrap.prBoxWrap = box;
    prOrganogram.prWrap.level = 1;
    prOrganogram.prWrap.childId = 1;
    prOrganogram.prWrap.id = "prlevel_1_1";

    if($('.org-parent').children('option[value="prlevel_1"]').length <= 0){
      $('.org-parent').append('<option value="prlevel_1">Level 1</option>');
    }

    // console.log(prOrganogram.prWrap.prBoxWrap);
    
    $('.pr-organogram').html('');
    writeHtml();
}


function addChild(d){

}
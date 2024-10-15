let childCounter = 0;

// Organogram structure
var prOrganogram = {
  prWrap: {
    id: "prorg_" + childCounter,
    level: 1,
    child: 1,
    prBoxWrap: `
      <div class='pr-box'>Main</div>
      <ul editMode>
        <li class="add-child">Add Child</li>
        <li class="edit-box">Edit</li>
        <li class="delete-box">Delete</li>
      </ul>`,
    children: []
  }
};

// Rich Text
var editor1cfg = {}
editor1cfg.toolbar = "basic";
var editor1 = new RichTextEditor("#div_editor1", editor1cfg);


// Function to convert JSON to HTML structure
// let oLevel = 0;
function jsonToHtml(obj) {
  // debugger
  let oLevel = obj.level;
  const wrap = document.createElement('div');
  wrap.classList.add('pr-wrap');
  wrap.setAttribute('data-id', obj.id);
  wrap.setAttribute('data-level', obj.level);
  wrap.setAttribute('data-child', obj.child);

  const boxWrap = document.createElement('div');
  boxWrap.classList.add('pr-box-wrap');
  boxWrap.innerHTML = obj.prBoxWrap;
  wrap.appendChild(boxWrap);

  // Recursively process the children
  if (obj.children && obj.children.length > 0) {
    const childrenDiv = document.createElement('div');
    childrenDiv.classList.add('children');
    let nthChild = 0;
    obj.children.forEach(function(child) {
      nthChild++;
      const childHtml = jsonToHtml(child.prWrap);
      childHtml.setAttribute("data-child", nthChild);
      childrenDiv.appendChild(childHtml);
    });
    wrap.appendChild(childrenDiv);
    wrap.classList.add('pr-has-child');
  }

  return wrap;
}

// Function to render the organogram
function writeHtml() {
  // debugger;
  oLevel = 0;
  const organogramDiv = document.querySelector('.pr-organogram');
  organogramDiv.innerHTML = '';  // Clear existing content

  const htmlStructure = jsonToHtml(prOrganogram.prWrap);
  organogramDiv.appendChild(htmlStructure);

  // Adjust child positioning (optimize if necessary)
  document.querySelectorAll('.pr-organogram .children').forEach(function(child) {
    const firstChild = child.querySelector('.pr-wrap:first-child');
    const lastChild = child.querySelector('.pr-wrap:last-child');

    const left = firstChild.offsetWidth / 2;
    const right = lastChild.offsetWidth / 2;

    child.style.setProperty('--before-left', `${left}px`);
    child.style.setProperty('--before-right', `${right}px`);
  });

  // Attach event listeners after rendering
  attachEventListeners();
}

// Attach event listeners to dynamically created elements
function attachEventListeners() {
  document.querySelectorAll('.add-child').forEach(function(el) {
    el.addEventListener('click', function() {
      addChild(el);
    });
  });

  document.querySelectorAll('.edit-box').forEach(function(el) {
    el.addEventListener('click', function() {
      editBox(el);
    });
  });

  document.querySelectorAll('.delete-box').forEach(function(el) {
    el.addEventListener('click', function() {
      deleteBox(el);
    });
  });
}

// Function to create a new box and add to the organogram
function createBox(inputElement) {
  const parent = document.querySelector('.org-parent').value;
  const boxContent = `<div class="pr-box">${inputElement.value}</div>
                      <ul editMode>
                        <li class="add-child">Add Child</li>
                        <li class="edit-box">Edit</li>
                        <li class="delete-box">Delete</li>
                      </ul>`;

  prOrganogram.prWrap.prBoxWrap = boxContent;
  prOrganogram.prWrap.level = 1;
  prOrganogram.prWrap.childId = 1;
  prOrganogram.prWrap.id = "prlevel_1_1";

  // Add new option to parent dropdown only if not already present
  const orgParent = document.querySelector('.org-parent');
  if (!orgParent.querySelector('option[value="prlevel_1"]')) {
    const newOption = document.createElement('option');
    newOption.value = "prlevel_1";
    newOption.text = "Level 1";
    orgParent.appendChild(newOption);
  }

  // Re-render the organogram
  writeHtml();
}

// Function to dynamically add a child
function addChild(element) {
  const parentWrap = element.closest('.pr-wrap');
  const parentId = parentWrap.getAttribute('data-id'); // Get parent ID

  childCounter++; // Increment the global child counter for unique ID

  // Create a new child object
  const newChild = {
    prWrap: {
      id: `prorg_${childCounter}`,
      level: parseInt(parentWrap.dataset.level) + 1, // Set the level to one deeper than the parent
      child: childCounter,
      prBoxWrap: `
        <div class='pr-box'>Child ${childCounter}</div>
        <ul editMode>
          <li class="add-child">Add Child</li>
          <li class="edit-box">Edit</li>
          <li class="delete-box">Delete</li>
        </ul>`,
      children: []
    }
  };

  // Find the parent node in the prOrganogram and add the new child
  const parentNode = findNodeById(prOrganogram.prWrap, parentId);
  if (parentNode) {
    parentNode.children.push(newChild); // Add new child to the parent's children array
  }

  writeHtml();
}

// Edit box function
function editBox(element) {
  const childWrap = element.closest('.pr-wrap'); // Find the closest .pr-wrap
  const childId = childWrap.getAttribute('data-id'); // Get the ID of the child to be edited

  let existingData = childWrap.querySelector('.pr-box').innerHTML;
  editor1.detachEvent("change");
  editor1.setHTMLCode(existingData);

  document.querySelector('.form-organo').classList.add('in');

  // Prompt for new name
  // const newName = prompt("Enter the new name for this child:", childWrap.querySelector('.pr-box').textContent);

  editor1.attachEvent("change", function () {
    const newName = editor1.getHTMLCode();
  
    if (newName !== null && newName.trim() !== "") {
      // Find the child node in the prOrganogram
      const childNode = findNodeById(prOrganogram.prWrap, childId);
      if (childNode) {
        // Update the child's prBoxWrap
        childNode.prBoxWrap = `
          <div class='pr-box'>${newName}</div>
          <ul editMode>
            <li class="add-child">Add Child</li>
            <li class="edit-box">Edit</li>
            <li class="delete-box">Delete</li>
          </ul>`;
        
        // Re-render the organogram
        writeHtml();
        
        // Remove <ul editMode> from prOrganogram
        let jsonExport = JSON.parse(JSON.stringify(prOrganogram));
        removeBoxMenusFromOrganogram(jsonExport);

        console.log("prOrganogram", prOrganogram);
        console.log("jsonExport", jsonExport);
        
        document.getElementById("json_code").innerText = JSON.stringify(jsonExport);
      }
    }
  });

}


function removeBoxMenusFromOrganogram(node) {
  // Modify prBoxWrap to remove the <ul editMode> part
  if (node.prWrap && node.prWrap.prBoxWrap) {
    node.prWrap.prBoxWrap = node.prWrap.prBoxWrap.replace(/<ul editMode>[\s\S]*?<\/ul>/g, '');
  }

  // Recursively process children
  if (node.prWrap && node.prWrap.children && node.prWrap.children.length > 0) {
    node.prWrap.children.forEach(child => {
      removeBoxMenusFromOrganogram(child); // Recursive call for each child
    });
  }
}

// Function to delete a child
function deleteBox(element) {
  const childWrap = element.closest('.pr-wrap'); // Find the closest .pr-wrap
  const childId = childWrap.getAttribute('data-id'); // Get the ID of the child to be deleted

  // Find the parent node in the prOrganogram
  const parentNode = findParentNodeById(prOrganogram.prWrap, childId);
  if (parentNode) {
    // Remove the child from the parent's children array
    parentNode.children = parentNode.children.filter(
      (child) => child.prWrap.id !== childId
    );
  }

  // Re-render the organogram
  writeHtml();
}

// Helper function to find the parent node of a child by ID
function findParentNodeById(node, childId) {
  if (node.children && node.children.length > 0) {
    for (let i = 0; i < node.children.length; i++) {
      const childNode = node.children[i].prWrap;
      if (childNode.id === childId) {
        return node; // Return the parent node
      }
      const foundParent = findParentNodeById(childNode, childId);
      if (foundParent) {
        return foundParent;
      }
    }
  }
  return null; // Return null if parent not found
}

// Helper function to find a node by its ID
function findNodeById(node, id) {
  if (node.id === id) {
    return node;
  }
  if (node.children && node.children.length > 0) {
    for (let childNode of node.children) {
      const foundNode = findNodeById(childNode.prWrap, id);
      if (foundNode) {
        return foundNode;
      }
    }
  }
  return null;
}

// Helper function to find the parent node of a child by level and child index
function findParentNodeByLevelAndChild(node, level, child) {
  if (node.children && node.children.length > 0) {
    for (let i = 0; i < node.children.length; i++) {
      const childNode = node.children[i].prWrap;
      if (childNode.level === level && childNode.child === child) {
        return node; // Return the parent node
      }
      const foundParent = findParentNodeByLevelAndChild(childNode, level, child);
      if (foundParent) {
        return foundParent;
      }
    }
  }
  return null;
}

function closeOrganoEdit(){
  document.querySelector('.form-organo').classList.remove('in');
}

function copyToClipboard(element) {
  // Create a temporary textarea to hold the content for copying
  const tempTextArea = document.createElement('textarea');
  
  // Get the content from the element (innerText for text or innerHTML for HTML)
  tempTextArea.value = element.innerText || element.textContent;
  
  // Append the textarea to the body (required for it to be in the DOM for copying)
  document.body.appendChild(tempTextArea);
  
  // Select the content
  tempTextArea.select();
  
  // Execute the copy command
  document.execCommand('copy');
  
  // Remove the temporary textarea
  document.body.removeChild(tempTextArea);
  
  // Optionally, notify the user (e.g., with an alert or console log)
  alert("Copied to clipboard!");
}

// Initialize and render the organogram on page load
document.addEventListener('DOMContentLoaded', function() {
  writeHtml();
});

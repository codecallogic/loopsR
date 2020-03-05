tinymce.init({
    selector:'.TypeHere',
    paste_as_text: true,
    width: "100%",
    format: 'text',
    // content_css : "/stylesheets/style.css",
    // setup : function(ed)
    // {
    // // set the editor font size
    // ed.onInit.add(function(ed)
    // {
    // ed.getBody().style.fontSize = '80px';
    // });
    // },
    plugins: [
        // "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak spellchecker",
        // "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
        // "table contextmenu directionality emoticons template textcolor paste "
    ],
});

const tagContainer = document.querySelector('.tag-container');
const input = document.querySelector('.tag-container input');
const database = document.querySelector('#database').value

console.log(database)

let tags = [];

if(database){
    let split = database.split(',')
    tags = split
}

function createTag(label) {
  const div = document.createElement('div');
  div.setAttribute('class', 'tag');
  const span = document.createElement('span');
  span.innerHTML = label;
  const closeIcon = document.createElement('i');
  closeIcon.innerHTML = 'close';
  closeIcon.setAttribute('class', 'material-icons');
  closeIcon.setAttribute('data-item', label);
  div.appendChild(span);
  div.appendChild(closeIcon);
  return div;
}

function clearTags() {
  document.querySelectorAll('.tag').forEach(tag => {
    tag.parentElement.removeChild(tag);
  });
}

function addTags() {
  clearTags();
  tags.slice().reverse().forEach(tag => {
    tagContainer.prepend(createTag(tag));
  });
  let tagValues = document.querySelectorAll(".tag > span")
  let input = document.getElementById("tagValue")
  let values = []
    tagValues.forEach( e => {
        values.push(e.innerText)
    })
    console.log(values)
    input.setAttribute('value', values)   
}

input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      e.target.value.split(',').forEach(tag => {
        tags.push(tag);  
      });
      
      addTags();
      input.value = '';
    }
});
document.addEventListener('click', (e) => {
  console.log(e.target.tagName);
  if (e.target.tagName === 'I') {
    const tagLabel = e.target.getAttribute('data-item');
    const index = tags.indexOf(tagLabel);
    tags = [...tags.slice(0, index), ...tags.slice(index+1)];
    addTags();    
  }
})

input.focus();

$("form").keypress(function(e) {
    //Enter key
    if (e.which == 13) {
      return false;
    }
});
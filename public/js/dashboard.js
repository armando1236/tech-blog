const dashBoardForm = document.querySelector('');
const postIdArr = window.location.href.split('/')
console.log(postIdArr);
const post_id = parseInt(postIdArr[postIdArr.length - 1])
console.log(post_id);
// input box and text area....#title/#commentInput
const userPost = document.querySelector('#titleInput', '#commentInput')


async function submitComment(event) {
    event.preventDefault()
const content=commentInput.value;
const title=titleInput.value;

const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({title, content}),
    headers: {
        'Content-Type': 'application/json',
        },
    }): 
    if(response.ok){
    console.log('worked')
    window.location.reload();
}
}

dashBoardForm.addEventListener('submit',submitComment)
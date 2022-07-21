const dashBoardForm = document.querySelector('#post-form');
const titleInput = document.querySelector('#titleInput')
const contentInput = document.querySelector('#contentInput')


async function submitComment(event) {
    event.preventDefault()
const content=contentInput.value;
const title=titleInput.value;

const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({title, content}),
    headers: {
        'Content-Type': 'application/json',
        },
    })
    if(response.ok){
    console.log('worked')
    window.location.reload();
}
}

dashBoardForm.addEventListener('submit',submitComment)
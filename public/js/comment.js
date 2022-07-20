const saveBtn = document.querySelector('#save-btn');
const postIdArr = window.location.href.split('/')
const post_id = parseInt(postIdArr[postIdArr.length - 1])
async function sumbitReview(event) {
  event.preventDefault()
const userComment=userComment.value;



const response = await fetch(`/api/comments`, {
    method: 'POST',
    body: JSON.stringify({ userComment }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if(response.ok){
      console.log('worked')
      window.location.reload();

  }
}





saveBtn.addEventListener('click', userComment)
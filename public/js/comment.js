const commentForm = document.querySelector('#comment-form');
const postIdArr = window.location.href.split('/')
console.log(postIdArr);
const post_id = parseInt(postIdArr[postIdArr.length - 1])
console.log(post_id);
const userComment = document.querySelector('#userComment')


async function submitComment(event) {
  event.preventDefault()
const content=userComment.value;

const response = await fetch(`/api/comments`, {
    method: 'POST',
    // for dashboard.....sending over title and content....different endpoint  '/api/posts' method is the same. on line 11 similar but with 2 ....line 6    /for line 6 querySelector: input box and text area
    body: JSON.stringify({ content, post_id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if(response.ok){
      console.log('worked')
      window.location.reload();

  }
}


// heroku on express channel/ heroku jawsdb mvc channel


commentForm.addEventListener('submit', submitComment)
const commentHandler = async (event) => {
    event.preventDefault();
  
    const comment_text = document.querySelector('#comment-input').value.trim();
    const review_id = window.location.toString().split('/')[window.location.toString().split('/').length -1];
   
  
    if (comment_text) {
      
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({comment_text, review_id}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        
        document.location.reload();
      } else {
        alert('Request Failed');
      }
    }
  };
  

  document.querySelector('.login-form').addEventListener('submit', commentHandler);
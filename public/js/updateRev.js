
const updateReview = async () => {
    const id = window.location.toString().split('/')[ window.location.toString().split('/').length - 1];
    const content = document.getElementById('update-input').value.trim();
    const title = document.getElementById('title-input').value.trim();
    
    if(content && title){
    var response = await fetch(`/api/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify({title, content}),
      headers: { 'Content-Type': 'application/json' },
    });
    }
    else if (content && !title){
        var response = await fetch(`/api/reviews/${id}`, {
            method: 'PUT',
            body: JSON.stringify({content}),
            headers: { 'Content-Type': 'application/json' },
          });
    }
    else if(title && !content){
        var response = await fetch(`/api/reviews/${id}`, {
            method: 'PUT',
            body: JSON.stringify({title}),
            headers: { 'Content-Type': 'application/json' },
          });
    }
    if (response.ok) {
      
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update.');
    }
  };
  
  document
  .querySelector('.updateReview')
  .addEventListener('click', updateReview);
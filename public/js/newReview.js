//Handles all newly created reviews. 
const newReviewHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title-input').value.trim();
    const content = document.querySelector('#content-input').value.trim();
    
  
    if (title && content) {
      console.log(content);
      const response = await fetch(`/api/reviews`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {'Content-Type': 'application/json'},
      });
     
      if (response.ok) {
        
        document.location.replace('/dashboard');
      } else {
        alert('screw this I quit');
      }
    }
  };
  document
  .querySelector('.new-review-form')
  .addEventListener('submit', newReviewHandler);
//will delete a review from database 
const deleteReview = async () => {
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1]
        console.log("are we here?");
    const response = await fetch(`/api/reviews/${id}`, {
      method: 'DELETE',
      
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
       
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete.');
    }
  };
  
  document
  .querySelector('.delReview')
  .addEventListener('click', deleteReview);

const updateReview = async () => {
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1]
    const response = await fetch(`/api/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
       
      document.location.reload();
    } else {
      alert('Failed to update.');
    }
  };
  
  document
  .querySelector('.delReview')
  .addEventListener('click', updateReview);
document.getElementById('burnup-btn').onclick = async () => {
  console.log('Burn-up chart button clicked');

  try {
    const response = await fetch('http://localhost:3001/api/burnup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message);
    } else {
      alert('Error: ' + (result.error || 'Unknown error'));
    }
  } catch (err) {
    console.error('Fetch failed:', err);
    alert('Failed to call backend API');
  }
};

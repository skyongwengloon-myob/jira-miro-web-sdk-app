window.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  if (code) {
    try {
      const response = await fetch('http://localhost:3001/api/oauth/callback', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
         },
        body: JSON.stringify({ code })
      });

      const result = await response.json();
      if (response.ok) {
        alert('OAuth successful!');
        // Optionally: Redirect to main app or dashboard
        window.location.href = '/';
      } else {
        alert('OAuth failed: ' + (result.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Callback error:', err);
      alert('OAuth callback failed');
    }
  } else {
    alert('No code found in URL');
  }
});

// This listens for the app icon click in Miro
miro.board.ui.on("icon:click", async () => {
  await miro.board.ui.openPanel({ url: "index.html" });
});

const button = document.getElementById('burnup-btn');

button.onclick = async () => {
  if (button.disabled) return; // prevent double click

  console.log('Burn-up chart button clicked');

  button.disabled = true;
  const originalText = button.textContent;
  button.textContent = 'Working...';

  try {
    const response = await fetch('http://localhost:3001/api/burnup', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
       }
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
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
};

const stickyNoteButton = document.getElementById('sticky-note-btn');

stickyNoteButton.onclick = async () => {
  if (stickyNoteButton.disabled) return; // prevent double click

  console.log('Sticky note button clicked');

  stickyNoteButton.disabled = true;
  const originalText = stickyNoteButton.textContent;
  stickyNoteButton.textContent = 'Working...';

  try {
    const response = await fetch('http://localhost:3001/api/burnup/sticky-note', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
       }
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message);
    } else {
      alert('Error: ' + (result.error || 'Unknown error'));
    }
  } catch (err) {
    console.error('Fetch failed:', err);
    alert('Failed to call backend API: ' + (err.message || 'Unknown error'));
  } finally {
    stickyNoteButton.disabled = false;
    stickyNoteButton.textContent = originalText;
  }
}

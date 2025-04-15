document.addEventListener('DOMContentLoaded', () => {
  const emailSelect = document.getElementById('emailNotifications');

  // Fetch current settings when page loads
  fetch('http://localhost:5500/api/settings')
      .then(res => res.json())
      .then(data => {
          if (data.emailNotifications) {
              emailSelect.value = data.emailNotifications;
          }
      })
      .catch(err => {
          console.error('Error loading settings:', err);
          alert('Failed to load settings.');
      });

  // Save settings when form is submitted
  document.getElementById('settingsForm').addEventListener('submit', (e) => {
      e.preventDefault();

      const newSettings = {
          emailNotifications: emailSelect.value
      };

      fetch('http://localhost:5500/api/settings', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newSettings)
      })
      .then(res => res.json())
      .then(data => {
          alert('✅ ' + data.message);
      })
      .catch(err => {
          console.error('Error saving settings:', err);
          alert('❌ Failed to save settings.');
      });
  });
});

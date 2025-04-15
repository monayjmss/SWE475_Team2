document.addEventListener('DOMContentLoaded', () => {
    const emailNotifications = document.getElementById('emailNotifications');
    const emailSubject = document.getElementById('emailSubject');
    const emailTemplate = document.getElementById('emailTemplate');
    const interviewToggle = document.getElementById('interviewToggle');
    const reportFrequency = document.getElementById('reportFrequency');
  
    // Load settings from backend
    fetch('http://localhost:5500/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.emailNotifications) emailNotifications.value = data.emailNotifications;
        if (data.emailSubject) emailSubject.value = data.emailSubject;
        if (data.emailTemplate) emailTemplate.value = data.emailTemplate;
        if (data.interviewToggle) interviewToggle.value = data.interviewToggle;
        if (data.reportFrequency) reportFrequency.value = data.reportFrequency;
      })
      .catch(err => {
        console.error('Error loading settings:', err);
        alert('Failed to load settings');
      });
  
    // Save settings
    document.getElementById('settingsForm').addEventListener('submit', (e) => {
      e.preventDefault();
  
      const updatedSettings = {
        emailNotifications: emailNotifications.value,
        emailSubject: emailSubject.value,
        emailTemplate: emailTemplate.value,
        interviewToggle: interviewToggle.value,
        reportFrequency: reportFrequency.value
      };
  
      fetch('http://localhost:5500/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedSettings)
      })
      .then(res => res.json())
      .then(data => {
        alert('✅ ' + data.message);
      })
      .catch(err => {
        console.error('Error saving settings:', err);
        alert('❌ Failed to save settings');
      });
    });
  });
  
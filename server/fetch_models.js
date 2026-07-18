fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + process.env.GEMINI_API_KEY)
  .then(res => res.json())
  .then(data => {
    if (data.models) {
      data.models.forEach(m => console.log(m.name));
    } else {
      console.log('Error:', data);
    }
  });

document.getElementById('bmiForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const result = document.getElementById('result');
    const tips = document.getElementById('tips');
  
    if (height > 0 && weight > 0) {
      const heightM = height / 100;
      const bmi = (weight / (heightM * heightM)).toFixed(2);
      let status = '';
      let healthTip = '';
  
      if (bmi < 18.5) {
        status = 'Underweight';
        healthTip = 'Eat more frequently, choose nutrient-rich foods, and exercise to build muscle.';
      } else if (bmi < 24.9) {
        status = 'Normal';
        healthTip = 'Maintain your current lifestyle with balanced meals and regular workouts.';
      } else if (bmi < 29.9) {
        status = 'Overweight';
        healthTip = 'Incorporate more cardio and reduce high-calorie foods.';
      } else {
        status = 'Obese';
        healthTip = 'Seek a medical consultation. Focus on portion control and daily exercise.';
      }
  
      result.textContent = `${name}, your BMI is ${bmi} (${status})`;
      tips.textContent = `Health Tip: ${healthTip}`;
  
      // Send to server
      const data = `name=${encodeURIComponent(name)}&height=${height}&weight=${weight}&bmi=${bmi}&status=${status}`;
      fetch('save_bmi.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: data
      });
    } else {
      result.textContent = 'Enter valid height and weight';
      tips.textContent = '';
    }
  });
  
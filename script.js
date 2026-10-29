document.addEventListener('DOMContentLoaded', function() {

  const bookingForm = document.querySelector('form');
  
  if (bookingForm && window.location.href.includes('contact')) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const inputs = bookingForm.querySelectorAll('input');
      const fullName = inputs[0] ? inputs[0].value : 'Guest';
      const email = bookingForm.querySelector('input[type="email"]');
      const passwordInput = bookingForm.querySelectorAll('input')[2];
      const phoneInput = bookingForm.querySelector('input[placeholder*="266"]') || inputs[3];
      const numPeopleInput = bookingForm.querySelector('input[type="number"]');
      const dateInput = bookingForm.querySelector('input[type="date"]');
      const message = bookingForm.querySelector('textarea');

      const password = passwordInput ? passwordInput.value : '';
      const phone = phoneInput ? phoneInput.value : '';
      const numPeople = numPeopleInput ? parseInt(numPeopleInput.value) || 1 : 1;
      const travelDate = dateInput ? dateInput.value : '';

      
      if (password && (password.length < 4 || password.length > 12)) {
        alert('Password must be 4 to 12 digits lala!');
        return;
      }
      if (password && isNaN(password)) {
        alert('Password must be digits only! e.g. 1234');
        return;
      }

      
      if (travelDate) {
        const today = new Date().toISOString().split('T')[0];
        if (travelDate < today) {
          alert('Travel date cannot be in the past!');
          return;
        }
      }

      
      let basePrice = 250;
      const checkedRadio = bookingForm.querySelector('input[type="radio"]:checked');
      if (checkedRadio) {
        const text = checkedRadio.parentElement.textContent;
        if (text.includes('Pony')) basePrice = 400;
        if (text.includes('Cultural')) basePrice = 300;
      }

      let extraTotal = 0;
      bookingForm.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
        const t = cb.parentElement.textContent.toLowerCase();
        if (t.includes('guide')) extraTotal += 150;
        if (t.includes('transport')) extraTotal += 200;
        if (t.includes('food')) extraTotal += 100;
      });

      const total = (basePrice * numPeople) + extraTotal;

      alert(`Thank you ${fullName}! 🥾\n\nTotal: M${total}\nWe will contact you on WhatsApp: ${phone}`);
      
      if (phone) {
        const waMsg = `Hello Lesotho Tourism, I'm ${fullName}. Booking total M${total} for ${numPeople} people on ${travelDate}.`;
        window.open(`https://wa.me/26622314687?text=${encodeURIComponent(waMsg)}`, '_blank');
      }

      bookingForm.reset();
    });
  }

  
  const totalPriceEl = document.getElementById('totalPrice');
  if (totalPriceEl) {
    
    console.log('Services page totalPrice found');
  }

});
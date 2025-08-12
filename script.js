// ----- LOGIN FUNCTION (index.html) -----
function login() {
  const username = document.getElementById('username')?.value.trim();
  const password = document.getElementById('password')?.value.trim();

  if (username && password) {
    window.location.href = "dashboard.html";
  } else {
    alert("Please enter username and password");
  }
}

// Toggle show/hide password on login page
const togglePassword = document.getElementById('togglePassword');
if (togglePassword) {
  togglePassword.textContent = "🙈";
  togglePassword.style.cursor = "pointer";

  togglePassword.addEventListener('click', function () {
    const passField = document.getElementById('password');
    if (passField.type === "password") {
      passField.type = "text";
      this.textContent = "👁";
    } else {
      passField.type = "password";
      this.textContent = "🙈";
    }
  });
}

// ----- HOTEL DETAILS & SELECTION (hotels.html) -----
function showDetails(hotelName) {
  const hotels = {
    "SeaView Residency": {
      features: "Beach view, Rooftop restaurant",
      rooms: "20 AC / 10 Non-AC",
      ratings: "⭐⭐⭐⭐☆",
      desc: "Experience luxury and comfort with stunning ocean views.",
      img: "sea.tmp"
    },
    "City Center Inn": {
      features: "Near shopping mall, Conference hall",
      rooms: "15 AC / 5 Non-AC",
      ratings: "⭐⭐⭐⭐☆",
      desc: "Stay in the heart of the city with all conveniences nearby.",
      img: "OIP.jpg"
    },
    "Budget Stay": {
      features: "Affordable, Free WiFi",
      rooms: "5 AC / 15 Non-AC",
      ratings: "⭐⭐⭐☆☆",
      desc: "Comfortable and affordable stay for budget travelers.",
      img: "normal.jpg"
    }
  };

  const hotel = hotels[hotelName];
  if (!hotel) return;

  const container = document.getElementById("hotel-container");
  if (container) {
    container.innerHTML = `
      <div style="text-align:center">
        <h1>${hotelName}</h1>
        <img src="${hotel.img}" style="width:300px; border-radius:8px;" alt="${hotelName}">
        <p><strong>Special Features:</strong> ${hotel.features}</p>
        <p><strong>Rooms Available:</strong> ${hotel.rooms}</p>
        <p><strong>Ratings:</strong> ${hotel.ratings}</p>
        <p>${hotel.desc}</p>
        <br>
        <button onclick="location.reload()">⬅ Back to Hotels</button>
        <br><br>
        <button onclick="window.location.href='online_register.html'">🖥 Online Register</button>
        <button onclick="window.location.href='direct_register.html'">📝 Direct Register</button>
      </div>
    `;
    // Save selected hotel to localStorage for dashboard page
    localStorage.setItem("selectedHotel", hotelName);
  }
}

// ----- DASHBOARD (dashboard.html) -----
// Set hotel name from localStorage if exists
const hotelNameEl = document.getElementById("hotelName");
if (hotelNameEl) {
  hotelNameEl.textContent = "M'Nick";

}

// ----- REGISTRATION FORM HANDLERS -----
// Offline registration form handler (direct_register.html)
const offlineForm = document.getElementById('registrationForm');
const offlineConfirmation = document.getElementById('confirmation');

if (offlineForm && offlineConfirmation) {
  offlineForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = offlineForm.name.value.trim();
    const contact = offlineForm.contact.value.trim();
    const email = offlineForm.email.value.trim();
    const checkin = offlineForm.checkin.value;
    const checkout = offlineForm.checkout.value;
    const host = offlineForm.host.value.trim();
    const roomType = offlineForm.roomType.value;
    const idProofType = offlineForm.idProofType ? offlineForm.idProofType.value : "";
    const idProofNumber = offlineForm.idProofNumber ? offlineForm.idProofNumber.value.trim() : "";

    if (checkout < checkin) {
      alert("Check-out date cannot be before Check-in date.");
      return;
    }

    offlineConfirmation.style.display = 'block';
    offlineConfirmation.innerHTML = `
      <h3>Registration Successful!</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Contact:</strong> ${contact}</p>
      <p><strong>Email ID:</strong> ${email}</p>
      <p><strong>Check-in:</strong> ${checkin}</p>
      <p><strong>Check-out:</strong> ${checkout}</p>
      <p><strong>Host:</strong> ${host}</p>
      <p><strong>Room Type:</strong> ${roomType}</p>
      ${idProofType ? `<p><strong>ID Proof Type:</strong> ${idProofType}</p>` : ""}
      ${idProofNumber ? `<p><strong>ID Proof Number:</strong> ${idProofNumber}</p>` : ""}
    `;

    offlineForm.reset();
  });
}

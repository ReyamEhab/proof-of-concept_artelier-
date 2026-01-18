// ====================== SIDE MENU ======================

// Get references to menu elements
const menuBtn = document.getElementById('menuBtn');       // Button to open menu
const menuPanel = document.getElementById('menuPanel');   // Side menu panel
const closeBtn = document.getElementById('closeBtn');     // Button to close menu

// Open the menu when menuBtn is clicked
menuBtn.addEventListener('click', () => menuPanel.classList.add('open'));

// Close the menu when closeBtn is clicked
closeBtn.addEventListener('click', () => menuPanel.classList.remove('open'));
const generateBtn = document.getElementById('generateBtn');
const moodInput = document.getElementById('moodInput');
const descInput = document.getElementById('descInput');
const generatedArt = document.getElementById('generatedArt');

generateBtn.addEventListener('click', async () => {
    const mood = moodInput.value.trim();
    const description = descInput.value.trim();

    if (!mood) {
        alert("Please enter a mood!");
        return;
    }

    // --- 1️⃣ Fetch art from JSON ---
    try {
        const response = await fetch('mood_art.json');
        const data = await response.json();

        const art = data.find(a => a.mood.toLowerCase() === mood.toLowerCase()) || {
            title: "Custom Mood Art",
            type: "Abstract Art",
            colors: ["#f6d32d","#3e64ff","#ffb347","#6bcB77","#ff7e5f"],
            exampleImage: "https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=800&q=60"
        };

        generatedArt.innerHTML = `
            <h3>${art.title}</h3>
            <p><strong>Mood Type:</strong> ${art.type}</p>
            <div class="colors-container">
                ${art.colors.map(color => `<div style="background:${color}"></div>`).join("")}
            </div>
            <p><strong>Description:</strong> ${description || "No description provided."}</p>
            <img src="${art.exampleImage}" alt="${art.title}">
        `;
    } catch (err) {
        console.error("Error fetching JSON:", err);
        generatedArt.innerHTML = "<p>Error loading art</p>";
    }

    // --- 2️⃣ Send mood & description to backend ---
    try {
        const res = await fetch("http://localhost:5000/api/moods", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mood, description })
        });

        const result = await res.json();

        if (result.success) {
            console.log("Mood saved in MongoDB!");
        } else {
            console.error("Error saving mood:", result.error);
        }
    } catch (err) {
        console.error("Server error:", err);
    }

    // Clear inputs
    moodInput.value = "";
    descInput.value = "";
});

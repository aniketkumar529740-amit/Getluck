document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Dynamic Image Rotation Matrix (Refresh Trigger) ---
    // Beautiful random lifestyle and portraits collection array to switch on page load
    const imagesPool = [
        "https://unsplash.com",
        "https://unsplash.com",
        "https://unsplash.com",
        "https://unsplash.com",
        "https://unsplash.com",
        "https://unsplash.com",
        "https://unsplash.com",
        "https://unsplash.com"
    ];

    // Helper to shuffle array elements randomly
    function shuffleArray(array) {
        return array.sort(() => 0.5 - Math.random());
    }

    // Assigning random fresh images to each frame slot on reload
    try {
        const shuffledImages = shuffleArray([...imagesPool]);
        
        const mainCard = document.getElementById("mainImg");
        const leftCard = document.getElementById("bgImgLeft");
        const rightCard = document.getElementById("bgImgRight");

        if(mainCard) mainCard.src = shuffledImages[0];
        if(leftCard) leftCard.src = shuffledImages[1];
        if(rightCard) rightCard.src = shuffledImages[2];
    } catch (error) {
        console.error("Error setting dynamic preview deck images:", error);
    }

    // --- 2. Interactive Input Utilities ---
    const passwordInput = document.getElementById("password");
    const togglePasswordBtn = document.getElementById("togglePassword");

    // Native Hide/Show toggle button mechanism matching real platform behavior
    if (togglePasswordBtn && passwordInput) {
        // Toggle viewability states
        passwordInput.addEventListener("input", () => {
            if (passwordInput.value.length > 0) {
                togglePasswordBtn.style.display = "block";
            } else {
                togglePasswordBtn.style.display = "none";
            }
        });

        togglePasswordBtn.addEventListener("click", () => {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                togglePasswordBtn.textContent = "Hide";
            } else {
                passwordInput.type = "password";
                togglePasswordBtn.textContent = "Show";
            }
        });
    }

});

        document.getElementById("loginBtn").addEventListener("click", async () => {

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const response = await fetch("/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const data = await response.json();

            alert(data.message);
        });

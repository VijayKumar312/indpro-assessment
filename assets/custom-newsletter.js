const customNewsletterButton = document.querySelector(".custom-newsletter-form .newsletter-button")
if(customNewsletterButton){
    customNewsletterButton.addEventListener("click", async function (event) {
        event.preventDefault();
    
        const emailInput = document.getElementById("custom-email");
        const responseMessage = document.getElementById("response-message");
        responseMessage.textContent=''
        const email = emailInput.value.trim();
    
        // Clear the response message and display a loader
        customNewsletterButton.textContent = "Submitting...";
        responseMessage.style.color = "#555"; // Neutral color for the loader message
    
        if (!email) {
            responseMessage.textContent = "Please enter a valid email.";
            responseMessage.style.color = "red";
            return;
        }
    
        try {
            const response = await fetch(`https://shopify-vercel-indpro-main.vercel.app/api/user?email=${email}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
    
            // Check if the response is okay
            if (response.ok) {
                responseMessage.textContent = "Thank you for subscribing!";
                responseMessage.style.color = "#2c6e49"; // Success color
                emailInput.value = ""; // Clear the input field
            } else {
                const errorData = await response.json();
                responseMessage.textContent = errorData.error || "Failed to subscribe.";
                responseMessage.style.color = "red";
            }
        } catch (error) {
            responseMessage.textContent = "An error occurred. Please try again.";
            responseMessage.style.color = "red";
        } finally {
            customNewsletterButton.innerText = "Subscribe"
            // Clear loader (if any) or update the message
            responseMessage.textContent += " ";
        }
    });
}


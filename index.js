import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// Fetch your API_KEY
const API_KEY = "AIzaSyCkYbutyE2xQ-rTDuJcb8kcuRhmtJ2wDMM";

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
$("#find").click(async function run() {
    const statement = document.getElementById('statement').value.trim();
    const popover = document.getElementById('popover');
    const inputField = document.getElementById('statement');

    if (statement === "") {
        inputField.classList.add('border-red-500');
        popover.classList.add('shake');
        popover.textContent = 'Please enter a statement!';
        popover.classList.remove('hidden');
        setTimeout(() => {
            popover.classList.remove('shake');
        }, 500);
        return;
    } else {
        inputField.classList.remove('border-red-500');

        const prompt = "say only true or false : " + statement;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);


        popover.textContent = text;

        popover.classList.remove('hidden');
        popover.classList.add('fade-in');

        setTimeout(() => {
            popover.classList.remove('fade-in');
        }, 500);
    }

});
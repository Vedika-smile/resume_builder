document.addEventListener("DOMContentLoaded", function () {
    const templates = document.querySelectorAll(".template");
    let selectedTemplate = null;

    //  select a resume template
    function selectTemplate(templateId) {
        // Remove already selected
        templates.forEach(template => template.classList.remove("selected"));

        // Highlight
        selectedTemplate = templateId;
        document.querySelector(`.template:nth-child(${templateId})`).classList.add("selected");

        alert(`Template ${templateId} selected!`);
    }

    // Attach click event to all template divs
    templates.forEach((template, index) => {
        template.addEventListener("click", () => selectTemplate(index + 1));
    });

    // Form Submission
    document.getElementById("resume-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const experience = document.getElementById("experience").value.trim();

        // Validation
        if (name === "" || email === "" || experience === "") {
            alert("All fields are required!");
            return;
        }

        if (!selectedTemplate) {
            alert("Please select a resume template!");
            return;
        }

        // Save data in local storage (for further use)
        localStorage.setItem("resumeData", JSON.stringify({ name, email, experience, selectedTemplate }));

        // Redirect to resume preview page (create `preview.html` to show resume)
        window.location.href = "preview.html";
    });
});

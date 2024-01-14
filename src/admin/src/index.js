// Function to add a new usage input
function addUsage() {
    const usagesContainer = document.getElementById("usagesContainer");
    const newUsageInput = document.createElement("input");
    newUsageInput.type = "text";
    newUsageInput.className = "form-control";
    newUsageInput.placeholder = "Enter usage";
    usagesContainer.appendChild(newUsageInput);
  }
  
  document.getElementById("medicineForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const button = e.target.querySelector("button");
  
    const name = document.getElementById("name").value;
    const code = parseInt(document.getElementById("code").value, 10);
    const manufacturedDate = document.getElementById("manufacturedDate").value;
    const expiryDate = document.getElementById("expiryDate").value;
    const usages = Array.from(document.querySelectorAll("#usagesContainer input"))
      .map(input => input.value);
  
    button.setAttribute("disabled", true);
  
    // Interact with ussd_backend actor, calling the createMedicine method
    const response = await ussd_backend.createMedicine({
      name,
      code,
      manufacturedDate,
      expiryDate,
      status: 0,  // Assuming you want to set the status to 0 by default
      usages,
    });
    console.log(response);
  
    button.removeAttribute("disabled");
  });
  
import { ussd_backend } from "../../declarations/ussd_backend";

const callingMedicine = async () => {
  const medicine = ussd_backend.createMedicine()
}

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("button");

  const code = parseInt(document.getElementById("code").value, 10);

  button.setAttribute("disabled", true);

  const response  = await ussd_backend.read(code);
  console.log(response);

  var holder = document.querySelector('.services-item h4');
  var holder2 = document.querySelector('.services-item h3');

  if (response && response.length > 0) {
    console.log("Response has values:", response);
    const firstObject = response[0];

    const name = firstObject.name;
    const expiryDate = firstObject.expiryDate;

    console.log("Name:", name);
    console.log("Expiry Date:", expiryDate);

    holder.textContent = "Medicine Name: " + name;
    holder2.textContent = "Expiry Date: " + expiryDate;
    holder.style.color = 'green';
  } else {
    console.log("Response is an empty array or falsy");
    holder.textContent = "Counterfeit drug! Discard";
    holder2.textContent = "";
    holder.style.color = 'red';
  }

  button.removeAttribute("disabled");

  return false;
});

function testSubmit() {
  alert("Request about to be submitted");
}

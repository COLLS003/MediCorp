import { ussd_backend } from "../../declarations/ussd_backend";

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("button");

  const code = document.getElementById("code").value.toString();

  button.setAttribute("disabled", true);

  // Interact with foo actor, calling the greet method
  // const greeting = await ussd_backend.greet(name);
  const verification = await ussd_backend.validate(code);
  

  button.removeAttribute("disabled");

  document.getElementById("greeting").innerText = verification;

  return false;
});

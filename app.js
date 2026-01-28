function analyze() {
  const text = document.getElementById("text").value;
  const personality = document.getElementById("personality").value;
  const resultDiv = document.getElementById("result");

  if (!text) {
    resultDiv.innerHTML = "<p class='warning'>Please enter some text.</p>";
    return;
  }

  // Simple rule-based tone analysis
  let soundsLike = [];
  let warning = "";

  const lower = text.toLowerCase();

  if (lower.includes("i guess") || lower.includes("whatever")) soundsLike.push("passive-aggressive");
  if (lower.includes("sorry") && text.length > 40) {
    soundsLike.push("over-apologizing");
    warning = "🚩 You might be shrinking yourself here.";
  }
  if (lower.includes("you never") || lower.includes("you always")) {
    soundsLike.push("accusatory");
    warning = "⚠️ This could put them on defense.";
  }

  let coreIntent = "You’re trying to be understood.";
  if (lower.includes("miss")) coreIntent = "You’re saying you miss connection.";
  if (lower.includes("tired")) coreIntent = "You sound emotionally exhausted.";

  // Personality-based rewrites
  let rewrite = "";
  switch (personality) {
    case "soft":
      rewrite = "I don’t want this to come off wrong, but I’ve been feeling a little disconnected lately.";
      break;
    case "rough":
      rewrite = "I’m not asking for a lot. I just need to feel like I matter to you.";
      break;
    case "blunt":
      rewrite = "Something feels off between us and we need to talk about it.";
      break;
    default:
      rewrite = "I’ve been feeling some distance and I want to understand what’s going on.";
  }

  resultDiv.innerHTML = `
    <p><strong>How it sounds:</strong> ${soundsLike.length > 0 ? soundsLike.join(", ") : "Pretty neutral."}</p>
    <p><strong>What they might feel:</strong> ${soundsLike.includes("accusatory") ? "Defensive" : "Open but unsure"}</p>
    <p><strong>What you mean:</strong> ${coreIntent}</p>
    ${warning ? `<p class='warning'>${warning}</p>` : ""}
    <p><strong>Rewrite (your vibe):</strong> ${rewrite}</p>
  `;
}
if(personality === "rough") rewrite = "Yo, don’t sugarcoat—say what you mean.";

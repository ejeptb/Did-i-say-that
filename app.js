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
  if (lower.includes("love you") || lower.includes("luv u")) soundsLike.push("affectionate");
if (lower.includes("ugh") || lower.includes("smh")) soundsLike.push("frustrated");
if (lower.includes("hey") && text.length < 20) soundsLike.push("casual");
if (lower.includes("idk") || lower.includes("not sure")) soundsLike.push("uncertain");
  if (lower.includes("you never") || lower.includes("you always")) {
    soundsLike.push("accusatory");
    warning = "⚠️ This could put them on defense.";
  }

  let coreIntent = "You’re trying to be understood.";
  if (lower.includes("miss")) coreIntent = "You’re saying you miss connection.";
  if (lower.includes("tired")) coreIntent = "You sound emotionally exhausted.";

  // Personality-based rewrites
  let rewrite = "";

if (soundsLike.includes("passive-aggressive")) {
  rewrite = personality === "blunt" ? 
    "Stop beating around the bush—say what you mean." :
    "I feel a bit annoyed, can we clear this up?";
} else if (soundsLike.includes("over-apologizing")) {
  rewrite = personality === "soft" ?
    "I hope this doesn’t come off wrong, but…" :
    "I might be overthinking, but I wanted to say this:";
} else if (soundsLike.includes("accusatory")) {
  rewrite = personality === "rough" ?
    "You need to hear me, something’s off." :
    "I feel hurt, can we talk?";
} else if (soundsLike.includes("affectionate")) {
  rewrite = "Just wanted you to know I care about you 💖";
} else if (soundsLike.includes("frustrated")) {
  rewrite = "This is getting annoying… let's figure it out.";
} else if (soundsLike.includes("casual")) {
  rewrite = "Hey! Just checking in 🙂";
} else if (soundsLike.includes("uncertain")) {
  rewrite = "I’m not sure how to say this, but…";
} else {
  // fallback default
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
const endings = ["😅", "🤔", "💀", "🔥"];
rewrite += " " + endings[Math.floor(Math.random()*endings.length)];

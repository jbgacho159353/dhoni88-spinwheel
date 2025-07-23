document.addEventListener("DOMContentLoaded", () => {
  // Check if all required elements exist before proceeding
  const spinButton = document.getElementById("spinButton");
  const wheel = document.querySelector(".spin-wheel");
  const popup = document.getElementById("popup");
  const prizeName = document.getElementById("prize-name");
  const redirectButton = document.getElementById("redirect-button");
  const closePopup = document.getElementById("close-popup");
  const bannerImage = document.querySelector(".banner-image");

  // Exit if any element is missing
  if (
    !spinButton ||
    !wheel ||
    !popup ||
    !prizeName ||
    !redirectButton ||
    !closePopup ||
    !bannerImage
  )
    return;

  let spinning = false;
  const landingAngles = [-115, -90, -75]; // Only these 3

  // Start idle wobble
  wheel.classList.add("idle-wobble");

  spinButton.addEventListener("click", () => {
    if (spinning) return;
    spinning = true;

    // Stop idle wobble
    wheel.classList.remove("idle-wobble");
    wheel.style.animation = "none";
    wheel.offsetHeight; // Force reflow

    // Choose one of the fixed landing angles
    const landingOffset =
      landingAngles[Math.floor(Math.random() * landingAngles.length)];
    const fullSpins = 8;
    const totalRotation = fullSpins * 360 + landingOffset;

    // Spin animation - 4 seconds
    wheel.style.transition = "transform 4s cubic-bezier(0.33, 1, 0.68, 1)";
    wheel.style.transform = `rotate(${totalRotation}deg)`;

    // After spin
    setTimeout(() => {
      // Normalize wheel back to landing position
      wheel.style.transition = "none";
      wheel.style.transform = `rotate(${landingOffset}deg)`;
      wheel.classList.add("idle-wobble");

      // Confetti and popup at the same time
      confettiShower();
      prizeName.textContent = "💰 ১০০% ডিপোজিট বোনাস!";
      popup.classList.add("active");
      redirectButton.classList.add("nudge"); // start nudge animation
    }, 4000); // match spin time
  });

  // Allow re-spin on close
  closePopup.addEventListener("click", () => {
    popup.classList.remove("active");
    spinning = false;
    redirectButton.classList.remove("nudge");
  });

  // ✅ Redirect "Claim Prize" button, with URL parameters
  redirectButton.addEventListener("click", () => {
    redirectButton.classList.remove("nudge");
    const params = window.location.search || ""; // Append parameters only if they exist
    const targetURL = "https://dhoni88.site/" + params;
    window.location.href = targetURL;
  });

  // ✅ Redirect banner image to fixed URL + forward parameters
  if (bannerImage) {
    bannerImage.style.cursor = "pointer";

    bannerImage.addEventListener("click", () => {
      const currentParams = new URLSearchParams(window.location.search);
      const baseParams = new URLSearchParams({
        utm_source: "pushads",
        utm_medium: "website",
        utm_campaign: "bd-new-wheel",
        utm_content: "20250702-new-wheel-ad",
      });

      currentParams.forEach((value, key) => {
        baseParams.append(key, value);
      });

      const finalBannerURL =
        "https://babu88agents.com/bd/registration/?" + baseParams.toString();
      window.location.href = finalBannerURL;
    });
  }

  // Confetti from top to bottom
  function confettiShower() {
    const colors = ["#f1c40f", "#e74c3c", "#2ecc71", "#3498db", "#9b59b6"];

    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.position = "fixed";
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.top = "-10px";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = Math.random() * 8 + 4 + "px";
      confetti.style.height = Math.random() * 8 + 4 + "px";
      confetti.style.opacity = "1";
      confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
      confetti.style.zIndex = "9999";

      document.body.appendChild(confetti);

      const animation = confetti.animate(
        [
          { transform: "translateY(0)", opacity: 1 },
          {
            transform: `translateY(${window.innerHeight}px) rotate(${
              Math.random() * 360
            }deg)`,
            opacity: 0,
          },
        ],
        {
          duration: Math.random() * 3000 + 2000,
          easing: "ease-out",
        }
      );

      animation.onfinish = () => {
        confetti.remove();
      };
    }
  }

  // Babu88 Integration - Adding tracking parameters
  var params = new URLSearchParams(location.href);
  window.kmnr = {
    kmnrKey: "177152497",
    cnvId: params.get("s2") || "default_value",
    sub1: params.get("s2") || "default_value",
    sub2: params.get("campaignid") || "default_value",
    sub3: params.get("publisher") || "default_value",
    sub4: params.get("domain") || "default_value",
    sub5: params.get("zone") || "default_value",
    sub6: params.get("subzone") || "default_value",
    sub7: params.get("network") || "default_value",
  };

  var kmnrSc = document.createElement("script");
  var kmnrPrnt = document.getElementsByTagName("head")[0] || document.body;
  kmnrSc.setAttribute("async", true);
  kmnrSc.setAttribute("charset", "utf-8");
  kmnrSc.src = "//afrdtech.com/v1/script.js?kmnrKey=" + window.kmnr.kmnrKey;
  kmnrPrnt && kmnrPrnt.appendChild(kmnrSc);
});

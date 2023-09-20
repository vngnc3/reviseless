// Create and append notice element above everything in the given container.
// Tapping/clicking anywhere dismiss the notice.
// Everything else under is blocked.
// Use custom CSS for styling. noticeStyle.css available in /styles/

// Set target container div. Use body to block everything.
const container = document.querySelector("body");

function showNotice(noticeObject) {
  const title = noticeObject.title;
  const message = noticeObject.message;

  // Generate elements
  const noticeBg = document.createElement("div");
  const notice = document.createElement("div");
  noticeBg.classList.add("noticeBg", "noticeSpawn");
  notice.classList.add("notice");

  // Build Notice window template
  notice.innerHTML = `
        <img src='images/help.svg' /> <br />
        <b>${title}</b> <br />
        \&nbsp;
        <br />
        ${message} <br />
        \&nbsp;
        <br />
        <span class='dismissNote'>Tap anywhere to dismiss.</span>
    `;

  // Append and mount to container
  noticeBg.appendChild(notice);
  container.appendChild(noticeBg);
  setTimeout(() => {
    noticeBg.classList.remove("noticeSpawn");
  }, 300);

  // Tap to dismiss
  noticeBg.addEventListener("click", function () {
    noticeBg.classList.add("noticeDespawn");
    setTimeout(() => {
      noticeBg.remove();
    }, 300);
  });
}

// Usage example
// showNotice({object});

// reviseless app implementation:
// Curve, Base revision rate, Number of revisions, Use currency, Enable rounding.

const curveInfo = {
  title: "Curve",
  message: `
        Set the slope of the curve function. <br />Defaults to 1.05.<br />
        \&nbsp;
        <br />
        The curve function takes this value to mathematically define how fast (or how slow) 
        the value should go up at every step of revision.<br />
        \&nbsp;
        <br />
        A value between 1 to 1.29 is ideal for most cases.
        `,
};

const baseFeeInfo = {
  title: "Base revision rate",
  message: `
        Set your base revision rate. <br />Defaults to 150.<br />
        \&nbsp;
        <br />
        This should be the rate of your first (1st!) revision. <br />
        In Reviseless, all revisions will slightly cost more than the previous one.
    `,
};

const revisionCountInfo = {
  title: "Number of revisions",
  message: `
        Set the amount of revisions you would like to simulate. <br />Defaults to 4.<br />
        \&nbsp;
        <br />
        Tip: Click on the number input and then scroll to change the value easily.
    `,
};

const useCurrencyInfo = {
  title: "Use currency",
  message: `
        Set a preferred currency and formatting. <br />
        This preference is saved to your browser.
    `,
};

const enableRoundingInfo = {
  title: "Enable rounding",
  message: `
        Rounds every value calculated in this app to the nearest unit. <br />
        Enabled by default.
    `,
};

const donationInfo = {
  title: "Donations",
  message: `
        Donations are not required, but always appreciated. <br />
        \&nbsp;<br />
        <a
            href="https://saweria.co/izzy/"
            target="_blank"
            rel="noopener noreferrer">
                🔗 🇮🇩 IDR
        </a><br />
        <a
            href="https://etherscan.io/address/0x37b7458c5f14822bf423965aed077a20269011c5"
            target="_blank"
            rel="noopener noreferrer">
                🔗 🔮 ETH
        </a><br />
    `,
};

const differenceInfo = {
  title: "Difference to linear pricing",
  message: `
        Calculated total fee difference between curved pricing (fee gets more expensive with more revisions) and flat revision fee.
    `,
};
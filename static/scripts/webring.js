// https://css-tricks.com/how-you-might-build-a-modern-day-webring/

const WEBRING_DATA_SOURCE = `https://raw.githubusercontent.com/CoralineAda/oomlagus-webring/no-gods-no-masters/oomlagus-webring.json`;

const template = document.createElement("template");
template.innerHTML = `
<div class="webring">
  <div class="icon"></div>
  <div id="copy">

  </div>
  <div class="icon"></div>
</div>`;

const HEADINGS = [
  "Nothing is true, everything must go!",
  "Warning: Information Hazard",
  "Be a man, be a mystery man! Be a doll, be a baby doll!",
  "neatneatneat",
  "Have you kids been exploding frogs again?",
  "Exclusive Interview with Infamous 'Hamburger Lady'",
];

class WebRing extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const thisSite = this.getAttribute("site");

    fetch(WEBRING_DATA_SOURCE)
      .then((response) => response.json())
      .then((sites) => {
        // Find the current site in the data
        const matchedSiteIndex = sites.findIndex(
          (site) => site.url === thisSite
        );
        const matchedSite = sites[matchedSiteIndex];

        let prevSiteIndex = matchedSiteIndex - 1;
        if (prevSiteIndex === -1) prevSiteIndex = sites.length - 1;

        let nextSiteIndex = matchedSiteIndex + 1;
        if (nextSiteIndex > sites.length) nextSiteIndex = 0;

        const randomSiteIndex = this.getRandomInt(0, sites.length - 1);

        const cp = `
          <h1>${HEADINGS[this.getRandomInt(0, HEADINGS.length - 1)]}</h1>
          <h2>
            Thank you for visiting my Web Site. If you want to join my webring,
            please <a href="https://github.com/CoralineAda/oomlagus-webring/" title="mailto:root@nosignal.zone">email me</a>.
          </p>

          <p>
            <a href="${sites[prevSiteIndex].url}">[Prev]</a>
            <a href="${sites[nextSiteIndex].url}">[Next]</a>
            <a href="${sites[randomSiteIndex].url}">[Random]</a>
          </p>
        `;

        this.shadowRoot
          .querySelector("#copy")
          .insertAdjacentHTML("afterbegin", cp);
      });
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

window.customElements.define("webring-css", WebRing);
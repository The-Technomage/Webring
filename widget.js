const DATA_FOR_WEBRING = `https://the-technomage.github.io/Webring/members.json`;

const template = document.createElement("template");
template.innerHTML = `<span id="map"></span>`;

class WebRing extends HTMLElement {
	connectedCallback() {
		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(template.content.cloneNode(true));

		const thisSite = this.getAttribute("site");

		fetch(DATA_FOR_WEBRING)
			.then((response) => response.json())
			.then((sites) => {
			
				const matchedSiteIndex = sites.findIndex((site) => site.url === thisSite);
				const matchedSite = sites[matchedSiteIndex];

				let prevSiteIndex = matchedSiteIndex - 1;
				if (prevSiteIndex === -1) prevSiteIndex = sites.length - 1;

				let nextSiteIndex = matchedSiteIndex + 1;
				if (nextSiteIndex > sites.length) nextSiteIndex = 0;

				const cp = `
				<img src="https://lostweb.neocities.org/webring.gif" usemap="#workmap">
				<map name="workmap">
				<area shape="rect" coords="0,0,20,31" href="${sites[prevSiteIndex].url}">
				<area shape="rect" coords="31,0,57,31" href="https://lostweb.neocities.org/webring/webring">
				<area shape="rect" coords="68,08,88,31" href="${sites[nextSiteIndex].url}">
				</map>
				`;

				this.shadowRoot.querySelector("#map").insertAdjacentHTML("afterbegin", cp);
			});
	}
}

window.customElements.define("webring-lost", WebRing);

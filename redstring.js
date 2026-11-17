class TeamMember {
    #name;
    #role;
    #image;
    #description;

    constructor(name, role, image, description) {
        this.#name = name;
        this.#role = role;
        this.#image = image;
        this.#description = description;
    }

    getName() { return this.#name; }
    getRole() { return this.#role; }
    getImage() { return this.#image; }
    getDescription() { return this.#description; }

    introduce() {
        return `${this.#name} is part of our ${this.#role} team.`;
    }

    renderCard() {
        const card = document.createElement("article");
        card.className = "member";

        const image = document.createElement("img");
        image.src = this.#image;
        image.alt = this.#name;
        image.onerror = () => {
            image.style.display = "none";
            const fallback = document.createElement("div");
            fallback.className = "image-fallback";
            fallback.textContent = this.#name;
            card.prepend(fallback);
        };

        const heading = document.createElement("h3");
        heading.textContent = this.getName();

        const role = document.createElement("p");
        role.className = "role";
        role.textContent = this.getRole();

        const description = document.createElement("p");
        description.textContent = this.getDescription();

        const intro = document.createElement("p");
        intro.className = "intro";
        intro.textContent = this.introduce();

        card.append(image, heading, role, description, intro);
        return card;
    }
}

// Inheritance 
class DesignMember extends TeamMember {
    constructor(name, image, description) {
        super(name, "Design", image, description);
    }

    introduce() {
        return `${this.getName()} creates clear and engaging visual designs.`;
    }
}

class WriterMember extends TeamMember {
    constructor(name, image, description) {
        super(name, "Content Writer", image, description);
    }

    //Polymorphism (method overriding)
    introduce() {
        return `${this.getName()} prepares clear information about corruption and accountability.`;
    }
}

class LayoutMember extends TeamMember {
    constructor(name, image, description) {
        super(name, "Layout Manager", image, description);
    }

    introduce() {
        return `${this.getName()} organizes the website layout and content.`;
    }
}

//Abstraction 
class WebsiteSection {
    constructor(title) {
        if (new.target === WebsiteSection) {
            throw new Error("WebsiteSection is abstract and cannot be created directly.");
        }
        this.title = title;
    }

    render() {
        throw new Error("Subclasses must implement the render() method.");
    }
}

class InformationSection extends WebsiteSection {
    constructor(title, text) {
        super(title);
        this.text = text;
    }

    render() {
        const section = document.createElement("section");
        section.className = "content-section";
        const heading = document.createElement("h2");
        heading.textContent = this.title;
        const paragraph = document.createElement("p");
        paragraph.textContent = this.text;
        section.append(heading, paragraph);
        return section;
    }
}

//Main website setup
(async function () {
    const app = document.getElementById("app");
    if (!app) {
        console.error('Missing element with id="app". Check index.html.');
        return;
    }

    const response = await fetch(
    "https://formspree.io/f/mpppnejq",
    {
        method: "POST",
        body: new FormData(storyForm),
        headers: {
            "Accept": "application/json"
        }
    }
);

    // Arrays/Data Handling: navigation, evidence, and team data are arrays.
    const links = [
        ["Home", "home"],
        ["About", "about"],
        ["Understand", "understand"],
        ["RA No. 3019", "ra3019"],
        ["Facts & Awareness", "facts"],
        ["Success Stories", "success"],
        ["Know Your Rights", "rights"], 
        ["Meet Us", "meet"],
        ["Contact", "contact"]
    ];

    const team = [
        new DesignMember(
            "Jolo",
            "images/icon1.jpg",
            "Creates visuals that help visitors understand the issue of corruption."
        ),
        new WriterMember(
            "Jimlord",
            "images/icon2.jpg",
            "Writes clear explanations about public accountability and the law."
        ),
        new LayoutMember(
            "Zyeon",
            "images/Icon3.jpg",
            "Organizes the website so information is easy to find and read."
        )
    ];

    // Build the page using JavaScript-created elements.
    const header = document.createElement("header");
    header.className = "site-header";
    const brand = document.createElement("a");
    brand.className = "brand";
    brand.href = "#home";
    brand.textContent = "⚖ RedScale";
    header.appendChild(brand);

    const nav = document.createElement("nav");
    nav.setAttribute("aria-label", "Main navigation");
    links.forEach(([label, id]) => {
        const link = document.createElement("a");
        link.href = "#" + id;
        link.textContent = label;
        nav.appendChild(link);
    });
    header.appendChild(nav);
    app.appendChild(header);

    const main = document.createElement("main");
    app.appendChild(main);

    const hero = document.createElement("section");
    hero.id = "home";
    hero.className = "hero";
    const heroTag = document.createElement("p");
    heroTag.className = "eyebrow";
    heroTag.textContent = "PUBLIC ACCOUNTABILITY";
    const heroTitle = document.createElement("h1");
    heroTitle.textContent = "Understand. Speak Up. Stand Against Corruption.";
    const heroText = document.createElement("p");
    heroText.textContent = "An educational website about Republic Act No. 3019 and the importance of integrity in public service.";
    const heroButton = document.createElement("a");
    heroButton.className = "button";
    heroButton.href = "#ra3019";
    heroButton.textContent = "Learn About RA 3019";
    hero.append(heroTag, heroTitle, heroText, heroButton);
    main.appendChild(hero);

    const about = new InformationSection(
        "About This Website",
        "This student project shares general educational information about corruption, accountability, and Republic Act No. 3019. Its goal is to encourage awareness, responsible citizenship, and integrity."
    );
    const understand = new InformationSection(
        "Understand Corruption",
        "Corruption can undermine public trust and divert resources from communities. Learning about transparency, ethical conduct, and reporting channels helps people understand why accountability matters."
    );
    const law = new InformationSection(
        "Republic Act No. 3019",
        "Republic Act No. 3019, also known as the Anti-Graft and Corrupt Practices Act, identifies certain corrupt practices of public officers and private persons. This page is for general education, not legal advice."
    );

    about.render().id = "about";
    understand.render().id = "understand";
    law.render().id = "ra3019";
    // Append rendered sections and then set IDs reliably.
    const aboutEl = about.render();
    aboutEl.id = "about";
    const understandEl = understand.render();
    understandEl.id = "understand";
    const lawEl = law.render();
    lawEl.id = "ra3019";
    main.append(aboutEl, understandEl, lawEl);

    const evidenceSection = document.createElement("section");
    evidenceSection.id = "evidence";
    evidenceSection.className = "content-section";
    const evidenceTitle = document.createElement("h2");
    evidenceTitle.textContent = "Evidence and Learning Resources";
    const evidenceIntro = document.createElement("p");
    evidenceIntro.textContent = "Add your class-approved screenshots or project evidence to the images folder. Replace the placeholder descriptions with accurate captions.";
    const evidenceGrid = document.createElement("div");
    evidenceGrid.className = "evidence-grid";

    const evidenceItems = [
        ["images/Evidence1.png"],
        ["images/Evidence2.png"],
        ["images/Evidence3.png"],
        ["images/Evidence4.png"],
        ["images/Evidence5.png"],
        ["images/Evidence6.png"]
    ];

    evidenceItems.forEach(([src, captionText]) => {
        const figure = document.createElement("figure");
        figure.className = "evidence-card";
        const image = document.createElement("img");
        image.src = src;
        image.alt = captionText;
        image.onerror = () => {
            image.style.display = "none";
            const placeholder = document.createElement("div");
            placeholder.className = "evidence-placeholder";
            placeholder.textContent = "Add image";
            figure.prepend(placeholder);
        };
        const caption = document.createElement("figcaption");
        caption.textContent = captionText;
        figure.append(image, caption);
        evidenceGrid.appendChild(figure);
    });

    evidenceSection.append(evidenceTitle, evidenceIntro, evidenceGrid);
    main.appendChild(evidenceSection);

    const teamSection = document.createElement("section");
    teamSection.id = "meet";
    teamSection.className = "content-section";
    const teamTitle = document.createElement("h2");
    teamTitle.textContent = "Meet Our Team";
    const teamIntro = document.createElement("p");
    teamIntro.textContent = "The students behind this awareness project.";
    const teamGrid = document.createElement("div");
    teamGrid.className = "team-grid";
    team.forEach(member => teamGrid.appendChild(member.renderCard()));
    teamSection.append(teamTitle, teamIntro, teamGrid);
    main.appendChild(teamSection);

    const contactSection = document.createElement("section");
    contactSection.id = "contact";
    contactSection.className = "content-section";
    const contactTitle = document.createElement("h2");
    contactTitle.textContent = "Contact Us";
    const contactIntro = document.createElement("p");
    contactIntro.textContent = "Send a message or comment about this educational project.";
    const form = document.createElement("form");
    form.id = "contactForm";

    function addLabelInput(labelText, id, type) {
        const label = document.createElement("label");
        label.htmlFor = id;
        label.textContent = labelText;
        const input = document.createElement("input");
        input.id = id;
        input.name = id;
        input.type = type;
        if (type === "email") input.required = true;
        label.appendChild(input);
        form.appendChild(label);
        return input;
    }

    const nameInput = addLabelInput("Name", "cName", "text");
    const emailInput = addLabelInput("Email", "cEmail", "email");
    const anonymousLabel = document.createElement("label");
    anonymousLabel.className = "checkbox-label";
    const anonymousInput = document.createElement("input");
    anonymousInput.type = "checkbox";
    anonymousInput.id = "cAnon";
    anonymousLabel.append(anonymousInput, document.createTextNode(" Send anonymously"));
    form.appendChild(anonymousLabel);

    const messageLabel = document.createElement("label");
    messageLabel.htmlFor = "cMsg";
    messageLabel.textContent = "Message";
    const messageInput = document.createElement("textarea");
    messageInput.id = "cMsg";
    messageInput.rows = 5;
    messageInput.required = true;
    messageLabel.appendChild(messageInput);
    form.appendChild(messageLabel);

    const submit = document.createElement("button");
    submit.type = "submit";
    submit.className = "button";
    submit.textContent = "Send Message";
    const status = document.createElement("p");
    status.id = "cStatus";
    status.setAttribute("role", "status");
    form.append(submit, status);

    anonymousInput.addEventListener("change", () => {
        nameInput.disabled = anonymousInput.checked;
        nameInput.required = !anonymousInput.checked;
        if (anonymousInput.checked) nameInput.value = "";
    });

    //Exception Handling 
    form.addEventListener("submit", function(event) {
    event.preventDefault();

    status.className = "message-status";

    try {
        if (!anonymousInput.checked && nameInput.value.trim() === "") {
            throw new Error("Please enter your name or choose anonymous.");
        }

        if (emailInput.value.trim() === "") {
            throw new Error("Please enter your email.");
        }

        if (messageInput.value.trim() === "") {
            throw new Error("Please enter a message.");
        }

        status.textContent = "Thank you! Your message is ready.";
        status.classList.add("success");

        form.reset();

    } catch (error) {
        status.textContent = error.message;
        status.classList.add("error");
    }
});

    contactSection.append(contactTitle, contactIntro, form);
    main.appendChild(contactSection);

    const footer = document.createElement("footer");
    footer.textContent = "© 2026 RedScale | Student educational project about public accountability.";
    app.appendChild(footer);

    // Highlight words beginning with "corrupt" in selected content.
    // Use text nodes so existing HTML markup is not interpreted as user text.
    function highlightCorruptWords(root) {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        const nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);

        nodes.forEach(node => {
            const text = node.nodeValue;
            if (!/\bcorrupt\w*/i.test(text)) return;

            const fragment = document.createDocumentFragment();
            const parts = text.split(/(\bcorrupt\w*)/gi);
            parts.forEach(part => {
                if (/^corrupt\w*$/i.test(part)) {
                    const span = document.createElement("span");
                    span.className = "corrupt";
                    span.textContent = part;
                    fragment.appendChild(span);
                } else {
                    fragment.appendChild(document.createTextNode(part));
                }
            });
            node.replaceWith(fragment);
        });
    }

    main.querySelectorAll(".content-section p, .hero p").forEach(highlightCorruptWords);


})();

import { Component, onMounted, onWillUnmount, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";

const ROLES = [
    "Odoo Developer",
    "Software Developer",
    "Python Developer",

];
const ROLE_INTERVAL_MS = 2500;

const LOADER_TECHS = [
    { label: "Python", short: "Py", color: "#3776ab", text: "#ffffff" },
    { label: "JavaScript", short: "JS", color: "#f7df1e", text: "#111111" },
    { label: "OWL", short: "OWL", color: "#35979c", text: "#ffffff" },
    { label: "Odoo", short: "Odoo", color: "#714b67", text: "#ffffff" },
];
const TECH_INTERVAL_MS = 450;
const LOADER_MIN_MS = LOADER_TECHS.length * TECH_INTERVAL_MS;
const LOADER_FADE_MS = 600;

export class PortfolioGame extends Component {
    static template = "web_portfolio_dev.PortfolioGame";
    static props = {};

    setup() {
        this.roles = ROLES;
        this.loaderTechs = LOADER_TECHS;

        this.projects = [
            {
                id: 1,
                name: "Vialidad Paraná — Affidavit Management",
                status: "Private",
                language: "Python",
                langColor: "#3572a5",
                description: "Custom Odoo 16 module to digitize and manage employee affidavits through web forms, role-based approval workflows, automated email notifications, and integration with Odoo Sign.",
                tags: ["Odoo 16", "Python", "XML", "Odoo Sign"],
                url: "",
            },
            {
                id: 2,
                name: "Grupo Macua — Loyalty & Product Redemption",
                status: "Private",
                language: "Python",
                langColor: "#3572a5",
                description: "Customized Odoo 17 eCommerce to support a points-based loyalty system, including user registration, physical loyalty card linking, product point pricing, and product redemption.",
                tags: ["Odoo 17", "Python", "eCommerce", "JavaScript"],
                url: "",
            },
            {
                id: 3,
                name: "ADA — Interactive Map for Unregistered Construction Reports",
                status: "Private",
                language: "Python",
                langColor: "#3572a5",
                description: "Custom Odoo 18 module featuring an interactive Leaflet map, geographic location selection, and integration with ARBA external services to retrieve location-related information for reports concerning unregistered construction.",
                tags: ["Odoo 18", "Python", "JavaScript", "Leaflet", "API Integration"],
                url: "",
            },
        ];

        this.experience = [
            {
                company: "Ingenio Solutions",
                role: "Odoo Developer",
                period: "2022 - 2024",
                description: "Customizes Odoo modules and integrations for client workflows, with automated reports and custom website pages.",
            },
            {
                company: "Be The Driver",
                role: "Odoo Developer",
                period: "2024 - 2026",
                description: "Built backend modules in Python and maintained internal tools used by the operations team.",
            },
        ];

        this.state = useState({
            roleIndex: 0,
            techIndex: 0,
            loading: true,
            loaderGone: false,
        });

        onMounted(() => {
            const minDelay = new Promise((resolve) => setTimeout(resolve, LOADER_MIN_MS));
            const fontsReady = document.fonts?.ready ?? Promise.resolve();

            this.techTimer = setInterval(() => {
                this.state.techIndex = (this.state.techIndex + 1) % this.loaderTechs.length;
            }, TECH_INTERVAL_MS);

            Promise.all([minDelay, fontsReady]).then(() => {
                clearInterval(this.techTimer);
                this.state.loading = false;
                this.loaderTimer = setTimeout(() => {
                    this.state.loaderGone = true;
                }, LOADER_FADE_MS);
            });

            this.roleTimer = setInterval(() => {
                this.state.roleIndex = (this.state.roleIndex + 1) % this.roles.length;
            }, ROLE_INTERVAL_MS);
        });

        onWillUnmount(() => {
            clearInterval(this.roleTimer);
            clearInterval(this.techTimer);
            clearTimeout(this.loaderTimer);
        });
    }

    get currentTech() {
        return this.loaderTechs[this.state.techIndex];
    }
}

registry
    .category("public_components")
    .add("web_portfolio_dev.PortfolioGame", PortfolioGame);
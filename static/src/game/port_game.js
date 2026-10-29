import { Component, onMounted, onWillUnmount, useRef, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";

const ORBS = [
    { id: 1, x: 8, y: 18 },
    { id: 2, x: 92, y: 28 },
    { id: 3, x: 21, y: 74 },
    { id: 4, x: 84, y: 69 },
    { id: 5, x: 56, y: 8 },
];

const STEP_PX = 18;
const PICKUP_DISTANCE_PX = 26;

const DIRECTIONS = {
    arrowup: [0, -1], w: [0, -1],
    arrowdown: [0, 1], s: [0, 1],
    arrowleft: [-1, 0], a: [-1, 0],
    arrowright: [1, 0], d: [1, 0],
};

export class PortfolioGame extends Component {
    static template = "web_portfolio_dev.PortfolioGame";
    static props = {};

    setup() {
        this.arenaRef = useRef("arena");
        this.orbs = ORBS.map((orb) => ({
            ...orb,
            style: `left:${orb.x}%;top:${orb.y}%;`,
        }));

        this.state = useState({
            x: 50,
            y: 50,
            score: 0,
            collected: [],
        });

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


        this.onKeyDown = this.onKeyDown.bind(this);
        onMounted(() => window.addEventListener("keydown", this.onKeyDown));
        onWillUnmount(() => window.removeEventListener("keydown", this.onKeyDown));
    }

    get playerStyle() {
        return `left:${this.state.x}%;top:${this.state.y}%;`;
    }

    onKeyDown(event) {
        if (event.ctrlKey || event.metaKey || event.altKey) {
            return;
        }
        const direction = DIRECTIONS[event.key.toLowerCase()];
        const arenaEl = this.arenaRef.el;
        if (!direction || !arenaEl) {
            return;
        }

        event.preventDefault();

        const arena = arenaEl.getBoundingClientRect();
        const stepX = (STEP_PX / arena.width) * 100;
        const stepY = (STEP_PX / arena.height) * 100;

        this.state.x = Math.max(1, Math.min(99, this.state.x + direction[0] * stepX));
        this.state.y = Math.max(1, Math.min(99, this.state.y + direction[1] * stepY));

        this.collectNearbyOrbs(arena);
    }

    collectNearbyOrbs(arena) {
        for (const orb of this.orbs) {
            if (this.state.collected.includes(orb.id)) {
                continue;
            }
            const dx = ((orb.x - this.state.x) / 100) * arena.width;
            const dy = ((orb.y - this.state.y) / 100) * arena.height;
            if (Math.hypot(dx, dy) < PICKUP_DISTANCE_PX) {
                this.state.collected.push(orb.id);
            }
        }
        this.state.score = this.state.collected.length;
    }

    restart() {
        this.state.x = 50;
        this.state.y = 50;
        this.state.score = 0;
        this.state.collected = [];
    }
}


registry
    .category("public_components")
    .add("web_portfolio_dev.PortfolioGame", PortfolioGame);
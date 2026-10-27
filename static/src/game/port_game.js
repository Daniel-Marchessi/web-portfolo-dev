/** @odoo-module **/

import { Component, onMounted, onWillUnmount, useRef, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";

const ORBS = [
    { id: 1, x: 8, y: 18 },
    { id: 2, x: 92, y: 28 },
    { id: 3, x: 21, y: 74 },
    { id: 4, x: 84, y: 69 },
    { id: 5, x: 56, y: 8 },
];

export class PortfolioGame extends Component {
    static template = "web_portfolio_dev.PortfolioGame";
    static props = {};

    setup() {
        this.arenaRef = useRef("arena");
        this.playerRef = useRef("player");
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

        this.onKeyDown = this.onKeyDown.bind(this);
        onMounted(() => window.addEventListener("keydown", this.onKeyDown));
        onWillUnmount(() => window.removeEventListener("keydown", this.onKeyDown));
    }

    get playerStyle() {
        return `left:${this.state.x}%;top:${this.state.y}%;`;
    }

    onKeyDown(event) {
        const key = event.key.toLowerCase();
        const directions = {
            arrowup: [0, -1], w: [0, -1],
            arrowdown: [0, 1], s: [0, 1],
            arrowleft: [-1, 0], a: [-1, 0],
            arrowright: [1, 0], d: [1, 0],
        };
        const direction = directions[key];

        if (!direction || !this.arenaRef.el || !this.playerRef.el) {
            return;
        }

        event.preventDefault();

        const arena = this.arenaRef.el.getBoundingClientRect();
        const stepX = (18 / arena.width) * 100;
        const stepY = (18 / arena.height) * 100;

        this.state.x = Math.max(1, Math.min(99, this.state.x + direction[0] * stepX));
        this.state.y = Math.max(1, Math.min(99, this.state.y + direction[1] * stepY));

        this.collectNearbyOrbs();
    }

    collectNearbyOrbs() {
        const player = this.playerRef.el.getBoundingClientRect();
        const playerCenterX = player.left + player.width / 2;
        const playerCenterY = player.top + player.height / 2;

        for (const orb of this.arenaRef.el.querySelectorAll(".portfolio-game__orb")) {
            const rect = orb.getBoundingClientRect();
            const orbCenterX = rect.left + rect.width / 2;
            const orbCenterY = rect.top + rect.height / 2;
            const distance = Math.hypot(playerCenterX - orbCenterX, playerCenterY - orbCenterY);

            if (distance < 26) {
                const id = Number(orb.dataset.orbId);
                if (id && !this.state.collected.includes(id)) {
                    this.state.collected.push(id);
                    this.state.score = this.state.collected.length;
                }
            }
        }
    }

    restart() {
        this.state.x = 50;
        this.state.y = 50;
        this.state.score = 0;
        this.state.collected = [];
    }
}

registry.category("public_components").add("web_portfolio_dev.PortfolioGame", PortfolioGame);
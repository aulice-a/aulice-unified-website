// /js/modal.js - Keep the data and functions here!

// Data for all the course links (This is now centralized)
const courseLinks = {
    "Banking Professionals": [
        { title: "Pathway", url: "/banking-pathway/" },
        { title: "Scenario", url: "/banking-scenarios/" },
        { title: "Unit 1", url: "/banking-unit1/" },
        { title: "Simulator: Financial Portfolio Crisis", url: "/banking-simulator/" }
    ],
    "Logistics Coordinators": [
        { title: "Pathway", url: "/logistics-pathway/" },
        { title: "Scenario", url: "/logistics-scenarios/" },
        { title: "Unit 1", url: "/logistics-unit1/" },
        { title: "Simulator: Supply Chain Simulation", url: "/logistics-simulator/" }
    ],
    // ... (All other course links go here)
    "Mining Engineers": [
        { title: "Pathway", url: "/mining-pathway/" },
        { title: "Scenario", url: "/mining-scenarios/" },
        { title: "Unit 1", url: "/mining-unit1/" },
        { title: "Simulator: Mine collapse crisis", url: "/mining-simulator/" }
    ],
    "Medical Professionals": [
        { title: "Pathway", url: "/medical-pathway/" },
        { title: "Scenario", url: "/medical-scenario/" },
        { title: "Unit 1", url: "/medical-unit1/" },
        { title: "Simulator: Medical Triage Simulator", url: "/medical-simulator/" }
    ],
    "Oil & Gas Professionals": [
        { title: "Pathway", url: "/oil-gas-pathway/" },
        { title: "Scenario", url: "/oil-gas-scenarios/" },
        { title: "Unit 1", url: "/oil-gas-unit1/" },
        { title: "Simulator: Drilling Operations Scenario", url: "/oil-gas-simulator/" }
    ],
    "Civil Aviation Professionals": [
        { title: "Pathway", url: "/pilot-atc-pathway/" },
        { title: "Scenario", url: "/pilot-scenarios/" },
        { title: "Unit 1", url: "/pilot-unit1/" },
        { title: "Simulator: Aviation Crisis", url: "/pilot-atc-simulator/" }
    ],
    "Cabin Crew Professionals": [
        { title: "Pathway", url: "/cabin-crew-pathway/" },
        { title: "Scenario", url: "/cabin-crew-scenarios/" },
        { title: "Unit 1", url: "/cabin-crew-unit1/" },
        { title: "Simulator: Cabin Crew Simulation", url: "/cabin-crew-simulator/" }
    ],
    "Aestheticians": [
        { title: "Pathway", url: "/aesthetician-pathway/" },
        { title: "Scenario", url: "/aesthetician-scenarios/" },
        { title: "Unit 1", url: "/aesthetician-unit1/" },
        { title: "Simulator: Aesthetician Crisis", url: "/aesthetician-simulator/" }
    ],
    "Legal Professionals": [
        { title: "Pathway", url: "/legal-pathway/" },
        { title: "Scenario", url: "/legal-scenarios/" },
        { title: "Unit 1", url: "/legal-unit1/" },
        { title: "Simulator: Legal Crisis Simulation", url: "/legal-simulator/" }
    ],
    "Hotel & Hospitality Professionals": [
        { title: "Pathway", url: "/hotel-pathway/" },
        { title: "Scenario", url: "/hotel-scenarios/" },
        { title: "Unit 1", url: "/hotel-unit1/" },
        { title: "Simulator: Hotel Emergency crisis", url: "/hotel-simulator/" }
    ]
};

const modal = document.getElementById('course-modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const closeModalBtn = document.getElementById('close-modal-btn');

// Function to show the modal (UNCHANGED)
function showModal(courseName) {
    modalTitle.textContent = courseName;
    modalContent.innerHTML = '';
    
    const links = courseLinks[courseName] || [];
    
    if (links.length > 0) {
        links.forEach(link => {
            const linkItem = document.createElement('a');
            linkItem.href = link.url;
            linkItem.target = "_blank"; // Open link in a new tab
            linkItem.className = "flex items-center space-x-3 p-4 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 ease-in-out rounded-lg shadow-sm";
            linkItem.innerHTML = `
                <span class="text-blue-600 font-semibold text-xl">${link.title}</span>
                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            `;
            modalContent.appendChild(linkItem);
        });
    } else {
        modalContent.innerHTML = `<p class="text-center text-gray-500">No links available for this course yet.</p>`;
    }
    
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0', 'scale-95');
        modal.classList.add('opacity-100', 'scale-100');
    }, 10);
}

// Function to hide the modal (UNCHANGED)
function hideModal() {
    modal.classList.remove('opacity-100', 'scale-100');
    modal.classList.add('opacity-0', 'scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// Add event listeners to close the modal (UNCHANGED)
closeModalBtn.addEventListener('click', hideModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        hideModal();
    }
});
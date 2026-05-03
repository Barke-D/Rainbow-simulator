/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Step {
  title: string;
  description: string;
}

interface Screenshot {
  fig: string;
  caption: string;
  placement: string;
}

interface Simulation {
  id: string;
  num: string;
  name: string;
  color: string;
  difficulty: "Easy" | "Medium" | "Hard";
  time: string;
  platform: string;
  section: string;
  figures: string[];
  ppt: string;
  url: string;
  description: string;
  whatItDoes: string;
  steps: Step[];
  screenshots: Screenshot[];
  crossRef: string;
  codeBlock?: string;
}

const SIMULATIONS: Simulation[] = [
  {
    id: "sim1",
    num: "SIM 01",
    name: "PHET BENDING LIGHT",
    color: "#ef4444", // Red
    difficulty: "Easy",
    time: "~20 min",
    platform: "Browser — phet.colorado.edu",
    section: "VII.A",
    figures: ["Fig 13A", "Fig 13B"],
    ppt: "Slide 3",
    url: "https://phet.colorado.edu/sims/html/bending-light/latest/bending-light_en.html",
    description: "Refraction behavior and prism dispersion.",
    whatItDoes: "PhET Bending Light has three tabs: (1) Intro — basic refraction at a flat interface between two selectable media; (2) More Tools — same as Intro but with protractors, speed indicators, and wavelength slider; (3) Prisms — place prisms of various shapes in a white-light beam and watch the full spectrum disperse.",
    steps: [
      { title: "Open Simulation", description: "Navigate to the URL. Simulation loads in ~5 seconds. Select the INTRO tab." },
      { title: "Set Media", description: "Material 1 dropdown → \"Air\" (n=1.000). Material 2 dropdown → \"Water\" (n=1.333)." },
      { title: "Enable Laser", description: "Click the red laser button on the left. A green laser ray appears." },
      { title: "Change Wavelength", description: "Click the color wheel icon next to the laser. Drag the wavelength slider from 400 nm (violet) to 700 nm (red). Observe the refraction angle changing." },
      { title: "Read Angles", description: "Enable the \"Normal\" checkbox (shows the dashed perpendicular line). Enable \"Angles\" checkbox. Read θᵢ and θᵣ numerically." },
      { title: "Verify Snell's Law", description: "For each wavelength, record θᵢ and θᵣ. Calculate n = sin(θᵢ)/sin(θᵣ). Compare to the dropdown n value." },
      { title: "Take Screenshot A1", description: "At λ=589 nm (yellow), record the screen showing angles. This is Screenshot A1." },
      { title: "Change to Glass", description: "Switch Material 2 to \"Glass\" (n=1.500). Repeat angle measurements. Take Screenshot A2." },
      { title: "Select Prisms Tab (Extra)", description: "Click the third tab (Prisms) at the top of the simulation window." },
      { title: "Enable White Light", description: "Click the white circle in the \"Beam\" panel on the left. The laser now shows a rainbow beam." },
      { title: "Add Prism", description: "Click \"Prisms\" in the tool area. Drag the triangular equilateral prism onto the canvas. Rotate it so one face is roughly perpendicular to the beam." },
      { title: "Adjust Beam Angle", description: "Click and drag the laser pointer to aim the white beam at one face of the prism at approximately 45° incidence angle." },
      { title: "Observe Spectrum", description: "The white beam disperses into a full ROYGBV spectrum on the far side. Adjust rotation until the spectrum fans out clearly." },
      { title: "Enable Intensity", description: "Toggle on the \"Intensity\" checkbox. The beam thickness shows relative intensity." },
      { title: "Annotate Screenshot", description: "Take a screenshot of the prism producing a rainbow spectrum. In any image editor, draw arrows labeling: Incident White Beam, Refracted Violet Ray, Refracted Red Ray, Angle of Deviation D." },
      { title: "Compare to Experiment A", description: "Note which color deviates most (violet, ~48°) and least (red, ~45°)." }
    ],
    screenshots: [
      { fig: "Fig 13A", caption: "PhET Bending Light, Intro Tab showing refraction at air-water interface at λ=589 nm. Angles θᵢ and θᵣ clearly labeled. Material labels (Air n=1.000, Water n=1.333) visible.", placement: "Section VII.A of paper — first screenshot. Also Slide 3 of PPT." },
      { fig: "Fig 13B", caption: "PhET Bending Light, Prisms Tab showing white beam dispersed into ROYGBV spectrum by equilateral prism. Arrows added labeling violet deviation angle (~48°) and red deviation angle (~45°).", placement: "Section VII.A of paper — second screenshot. Also Slide 4 of PPT." }
    ],
    crossRef: "\"The PhET Bending Light simulation (Simulation 1) confirmed our Experiment A setup — at an angle of incidence of 45°, the simulation predicted a refraction angle of [read from simulation]° in water, consistent with our measured [YOUR VALUE]° (Snell's Law: sin 45° / sin [θᵣ] = 1.333).\""
  },
  {
    id: "sim2",
    num: "SIM 02",
    name: "OPHYSICS 2D RAINBOW",
    color: "#f97316", // Orange
    difficulty: "Easy",
    time: "~15 min",
    platform: "Browser — ophysics.com (GeoGebra powered)",
    section: "VII.B",
    figures: ["Fig 14A", "Fig 14B"],
    ppt: "Slide 3",
    url: "https://ophysics.com/l17.html",
    description: "Internal reflection and wavelength dependent exit angles.",
    whatItDoes: "A circular cross-section represents a single raindrop. An incoming ray (black line) can be dragged to any position on the droplet (impact parameter b). The simulation shows: refraction as the ray enters, internal reflection off the back, and refraction again as it exits. A wavelength selector shows how each color follows a slightly different path — violet exits at ~40.6°, red at ~42.5°.",
    steps: [
      { title: "Open Simulation", description: "Go to https://ophysics.com/l17.html. The circular raindrop appears centrally." },
      { title: "Select Red Light", description: "In the wavelength panel (left), drag the slider to maximum (red, ~700 nm) or click the red option." },
      { title: "Drag the Ray", description: "Click and drag the incoming black ray up and down. Watch the exit angle change in the numerical readout." },
      { title: "Find Minimum Deviation", description: "Notice that as you drag the ray, the exit angle decreases, then INCREASES. The minimum point is the rainbow angle (~42.5° for red)." },
      { title: "Mark the Rainbow Angle", description: "Stop dragging when the exit angle shows its minimum (~42.5°). Take Screenshot A." },
      { title: "Switch to Violet", description: "Drag the wavelength slider to minimum (violet, ~400 nm). Repeat the sweep." },
      { title: "Compare Rainbow Angles", description: "The minimum for violet is ~40.6°. The difference (1.9°) is the angular width of the rainbow. Take Screenshot B." },
      { title: "Annotate Screenshots", description: "Label path, refraction at entry, internal reflection, refraction at exit, exit angle. Draw a protractor arc showing the 42.5° measurement." },
      { title: "Relate to Experiment C", description: "This simulation shows the physics behind your spray rainbow. The 42° arc you measured in your spray experiment is this minimum exit angle." }
    ],
    screenshots: [
      { fig: "Fig 14A", caption: "oPhysics 2D — Red ray showing minimum deviation angle of ~42.5°. Arrows added labeling: Incident Ray, First Refraction (Air→Water), Internal Reflection, Second Refraction (Water→Air), Exit Angle = 42.5° (Rainbow Angle for Red).", placement: "Section VII.B. Cross-reference from Experiment C description. Also Slide 3 of PPT." },
      { fig: "Fig 14B", caption: "oPhysics 2D — Violet ray showing minimum deviation angle of ~40.6°. Side-by-side comparison with Figure 14A shows 1.9° angular spread = width of rainbow.", placement: "Section VII.B. Place directly next to Figure 14A." }
    ],
    crossRef: "N/A"
  },
  {
    id: "sim3",
    num: "SIM 03",
    name: "OPHYSICS 3D RAINBOW",
    color: "#eab308", // Yellow
    difficulty: "Easy",
    time: "~15 min",
    platform: "Browser — ophysics.com (GeoGebra powered)",
    section: "VII.C",
    figures: ["Fig 15A"],
    ppt: "Slide 3",
    url: "https://ophysics.com/l18.html",
    description: "Observer viewpoint and solar elevation.",
    whatItDoes: "3D GeoGebra simulation showing the observer's viewpoint, solar position, and the rainbow arc's position in the sky. Adjusting the sun's elevation changes the rainbow's apparent position.",
    steps: [
      { title: "Open", description: "Go to https://ophysics.com/l18.html. A 3D scene shows observer (blue dot), sun (yellow), and rainbow arc." },
      { title: "Read Default State", description: "At default solar elevation (~25°), the rainbow arc appears at approximately 42° from the antisolar point." },
      { title: "Adjust Solar Elevation", description: "Use the slider to change the sun's height above the horizon (10°, 25°, 35°, 40°)." },
      { title: "Observe Arc Movement", description: "As sun elevation increases, the rainbow arc moves lower. When the sun reaches 42°, the rainbow is at the horizon." },
      { title: "Key Insight", description: "When sun is at 25°, the top appears at 42°−25° = 17° above the horizon." },
      { title: "Screenshot", description: "Set sun elevation to 25°. Take screenshot showing observer dot, sun, and the arc." },
      { title: "Annotate", description: "Label: Observer, Sun (25°), Antisolar Point, Rainbow Arc (42° cone), Primary Arc." }
    ],
    screenshots: [
      { fig: "Fig 15A", caption: "oPhysics 3D — Rainbow arc in sky with sun at 25° elevation. Observer dot visible on green ground plane. Rainbow cone labeled with 42° angle. Antisolar point direction marked.", placement: "Section VII.C of paper. Also reference from Experiment C (Slide 3 of PPT)." }
    ],
    crossRef: "N/A"
  },
  {
    id: "sim4",
    num: "SIM 04",
    name: "GEOGEBRA 3D RAINBOW",
    color: "#22c55e", // Green
    difficulty: "Medium",
    time: "~20 min",
    platform: "Browser — geogebra.org",
    section: "VII.D",
    figures: ["Fig 15B"],
    ppt: "Slide 3 (featured)",
    url: "https://www.geogebra.org/m/HWxADKYH",
    description: "Simultaneous 2D/3D visualization.",
    whatItDoes: "The most sophisticated free rainbow simulation available. Two-panel display: LEFT — 2D cross-section of a raindrop with refraction angles. RIGHT — 3D view of observer, sun, and rainbow arc in the sky dome.",
    steps: [
      { title: "Open", description: "Go to https://www.geogebra.org/m/HWxADKYH. Wait for the engine to load." },
      { title: "Identify Panels", description: "LEFT panel = raindrop cross-section (2D). RIGHT panel = 3D sky view." },
      { title: "Adjust Sun Elevation", description: "Drag \"Sun angle\" slider from 0° to 40°. Both panels update." },
      { title: "Read Raindrop Panel", description: "Incoming white ray splits into red (~42.5°) and violet (~40.6°)." },
      { title: "Read Sky Panel", description: "Observe the arc elevation movement." },
      { title: "Optimal Position", description: "Set sun to 20°–25° for dramatic visualization." },
      { title: "Screenshot", description: "Capture the FULL window showing BOTH panels. This is the project's main visual." },
      { title: "Annotate", description: "Add: \"42.5° Red Angle\", \"40.6° Violet Angle\", \"Rainbow Arc\", \"Observer\", \"Sun Position\"." }
    ],
    screenshots: [
      { fig: "Fig 15B", caption: "GeoGebra 3D — FULL window showing both panels: LEFT: raindrop cross-section with red ray at 42.5° and violet ray at 40.6° labeled. RIGHT: 3D rainbow arc in sky dome with observer and sun at 25° labeled.", placement: "Section VII.D (featured simulation). ALSO Slide 3 of PPT — use as the MAIN visual for the simulations slide." }
    ],
    crossRef: "N/A"
  },
  {
    id: "sim5",
    num: "SIM 05",
    name: "PHYDEMO RAY OPTICS",
    color: "#3b82f6", // Blue
    difficulty: "Medium",
    time: "~25 min",
    platform: "Browser — phydemo.app (open source)",
    section: "VII.E",
    figures: ["Fig 16"],
    ppt: "Slide 3",
    url: "https://phydemo.app/ray-optics/",
    description: "Advanced custom ray optics design.",
    whatItDoes: "Open-source simulator with a \"Simulate Colors\" mode that models wavelength-dependent refraction through user-drawn elements. Allows numerical measurement of deviation angles.",
    steps: [
      { title: "Open", description: "Go to https://phydemo.app/ray-optics/. Toolbar appears on a blank canvas." },
      { title: "Enable Colors", description: "Click \"Simulate Colors\" in the top menu bar." },
      { title: "Draw a Prism", description: "Select \"Glass\" → \"Prism\". Draw three points forming an equilateral triangle." },
      { title: "Set Refractive Index", description: "Right-click prism. Set \"n\" to 1.52 (crown glass)." },
      { title: "Add White Beam", description: "Select \"Beam\" in the toolbar. Aim a horizontal beam at the prism face." },
      { title: "Observe Dispersion", description: "Violet bends most, red least as expected by Cauchy prediction." },
      { title: "Measure Angles", description: "Hover over colored rays to see the angle tooltip. Record for each color." },
      { title: "Compare to Experiment A", description: "Build a comparison table: PhyDemo vs. Prism Measurement vs. Cauchy." },
      { title: "Screenshot", description: "Capture prism with separated rays and the angle tooltip visible." }
    ],
    screenshots: [
      { fig: "Fig 16", caption: "PhyDemo Ray Optics — Custom glass prism (n=1.52) with white beam dispersed into ROYGBV spectrum. Angle tooltip visible showing deviation angle for violet ray.", placement: "Section VII.E. Compare numerical angle readout with Table 2 (Experiment A data) in Results." }
    ],
    crossRef: "N/A"
  },
  {
    id: "sim6",
    num: "SIM 06",
    name: "PYTHON SIMULATION (ORIGINAL)",
    color: "#a855f7", // Violet
    difficulty: "Hard",
    time: "~60 min",
    platform: "Python 3 — local or Google Colab",
    section: "VII.F + Appendix A",
    figures: ["Fig 17A", "Fig 17B"],
    ppt: "Slide 3 (Our Simulation box)",
    url: "https://colab.research.google.com",
    description: "Original team code for Cauchy curves and analysis.",
    whatItDoes: "Original work built by the team. Demonstrates CS skills and physics knowledge. Output 1: Cauchy Dispersion Curve (n vs λ) with experimental data points. Output 2: Rainbow Angle vs Wavelength powered by Descartes' geometric deviation formula.",
    steps: [
      { title: "Install Python", description: "Download Python 3.10+. Verify installation with `python --version` and `pip --version`." },
      { title: "Install Libraries", description: "Run: `pip install numpy matplotlib scipy`" },
      { title: "Create File", description: "Create `rainbow_simulation.py`. Copy code from Appendix A of the project paper." },
      { title: "Run Simulation", description: "Run: `python rainbow_simulation.py`. Two graphs appear and save as PNG files." },
      { title: "Insert Data", description: "Replace placeholder values in the \"# REPLACE THESE WITH YOUR ACTUAL EXPERIMENTAL DATA\" section." },
      { title: "Run Again", description: "Verify updated graphs show YOUR experimental data points." },
      { title: "Deploy to Colab", description: "Paste code into a Colab notebook for public access. Include URL in paper." }
    ],
    screenshots: [
      { fig: "Fig 17A", caption: "Python Simulation Output 1 — Cauchy dispersion curve for water (blue) and glass (red) with experimental data points overlaid as colored circles with error bars.", placement: "Section VII.F (Fig 17). Results section Fig 18. Slide 3 of PPT." },
      { fig: "Fig 17B", caption: "Python Simulation Output 2 — Rainbow angle vs. wavelength with horizontal dashed lines at theoretical values and solid measured lines from Exp C.", placement: "Section VII.F (Fig 19). Include measured vs. theory comparison in Results." }
    ],
    crossRef: "\"We developed an original interactive simulation using Python 3 with the NumPy and Matplotlib libraries (see Appendix A for source code). The simulation computes the Cauchy dispersion curve for water (A=1.3240, B=0.00311 µm²) and crown glass, overlays our experimentally measured refractive indices from Experiments A and B, and computes the primary rainbow angle as a function of wavelength using Descartes' geometric deviation formula. The root-mean-square error between our simulated Cauchy curve and published refractive index tables was [calculated from code]. The simulation is publicly accessible at [YOUR COLAB LINK].\"",
    codeBlock: `exp_lambda = [400, 450, 550, 589, 620, 700]  # keep these wavelengths
# FROM EXPERIMENT B (Water):
exp_n_water = [1.343, 1.340, 1.334, 1.333, 1.332, 1.331]  # ← replace these
exp_n_glass = [1.534, 1.527, 1.519, 1.517, 1.514, 1.510]  # ← replace these (Exp A)
exp_errors  = [0.002, 0.002, 0.001, 0.001, 0.001, 0.001]  # ← your ± uncertainties
# FROM EXPERIMENT C (Spray Rainbow) — uncomment and fill in:
# ax2.axhline(YOUR_MEASURED_RED_ANGLE, color='red', ls='-', lw=2.5,
#             label=f'Red measured: {YOUR_MEASURED_RED_ANGLE}°')
# ax2.axhline(YOUR_MEASURED_VIOLET_ANGLE, color='violet', ls='-', lw=2.5,
#             label=f'Violet measured: {YOUR_MEASURED_VIOLET_ANGLE}°')`
  }
];


export default function App() {
  const [selectedSim, setSelectedSim] = useState<Simulation | null>(null);

  const closeModal = useCallback(() => setSelectedSim(null), []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeModal]);

  return (
    <div className="min-h-screen pb-20 selection:bg-purple-500/30">
      {/* 4px Rainbow Bar */}
      <div className="h-1 rainbow-bar w-full sticky top-0 z-50" id="rainbow-top-bar" />

      <main className="max-w-7xl mx-auto px-6 pt-12">
        {/* Header Section */}
        <header className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div className="flex flex-col gap-6">
              <div className="h-20 w-48 overflow-hidden self-start">
                <img 
                  src="/src/sit-logo.png" 
                  alt="SIT Logo" 
                  className="h-[200%] w-[200%] max-w-none object-cover"
                  style={{ transform: 'translate(-50.5%, -1.5%)' }} 
                />
              </div>
              <div>
                <p className="font-medium text-xs uppercase tracking-[0.2em] text-[#8AC4C7] mb-2">
                  Shaggar Institute of Technology · Group 26 · Physics 2026
                </p>
                <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">
                  Rainbow Simulation Hub
                </h1>
              </div>
            </div>
            <div className="text-right md:max-w-xs border-l border-white/10 pl-6 h-fit">
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#F15A24] mb-3">Group 26 Researchers</p>
              <p className="text-sm text-gray-400 leading-relaxed font-light">
                Barkot Desalegn · Kenenisa Temesgen<br />
                Hana Getu · Segni Seyoum · Wario Gagna
              </p>
            </div>
          </div>

          <p className="text-[#CFDFDC]/70 text-lg mb-8 max-w-2xl font-light leading-relaxed">
            A centralized hub for 6 physics simulations exploring the mechanics of dispersion, 
            Snell's Law, and the formation of atmospheric rainbows.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-b border-white/10 py-6">
            {[
              "6 Simulations",
              "9+ Screenshots",
              "~2.5h Total Time",
              "1 Original Python Sim"
            ].map((stat, i) => (
              <div key={i} className="text-sm">
                <span className="text-[#8AC4C7] block text-[10px] font-bold uppercase mb-1">METRIC-0{i+1}</span>
                <span className="text-gray-300 font-medium">{stat}</span>
              </div>
            ))}
          </div>
        </header>

        {/* Grid Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20" id="simulation-grid">
          {SIMULATIONS.map((sim) => (
            <motion.div
              key={sim.id}
              whileHover={{ y: -3 }}
              onClick={() => setSelectedSim(sim)}
              className="group cursor-pointer bg-[#0a363f] border border-white/5 transition-all hover:border-[#F15A24]/40 p-8 flex flex-col justify-between min-h-[240px] shadow-xl"
              style={{ borderTopWidth: '4px', borderTopColor: sim.color }}
              id={`card-${sim.id}`}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-bold tracking-widest text-[#8AC4C7]">{sim.num}</span>
                  <span className={`text-[9px] font-bold uppercase px-2 py-1 bg-white/5 text-white tracking-widest`}>
                    {sim.difficulty}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-[#F15A24] transition-colors">
                  {sim.name}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {sim.description}
                </p>
              </div>


            </motion.div>
          ))}
        </section>
      </main>

      {/* Modal / Side Drawer Drawer */}
      <AnimatePresence>
        {selectedSim && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 modal-overlay"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl max-h-full overflow-y-auto bg-surface border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col"
              id="detail-modal"
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-surface border-b border-white/10 p-8 flex justify-between items-center">
                <div className="flex items-center gap-6">
                  <div className="w-1.5 h-12" style={{ backgroundColor: selectedSim.color }} />
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-[#8AC4C7] uppercase">{selectedSim.num}</span>
                    <h2 className="text-3xl font-bold text-white uppercase tracking-tight">
                      {selectedSim.name}
                    </h2>
                  </div>
                </div>
                <button 
                  onClick={closeModal}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white/5 text-gray-500 hover:text-white transition-all rounded-full border border-white/5"
                  title="Close (Esc)"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-10 space-y-16">
                {/* What it does */}
                <section>
                  <h4 className="text-[10px] font-bold text-[#8AC4C7] uppercase tracking-[0.3em] mb-6">Simulation Scope</h4>
                  <p className="text-gray-300 text-lg leading-relaxed max-w-2xl font-light">
                    {selectedSim.whatItDoes}
                  </p>
                </section>

                {/* Steps */}
                <section>
                  <h4 className="text-[10px] font-bold text-[#8AC4C7] uppercase tracking-[0.3em] mb-10">Technical Workflow</h4>
                  <div className="space-y-10">
                    {selectedSim.steps.map((step, idx) => (
                      <div key={idx} className="flex gap-8 group">
                        <span className="text-[10px] font-black text-white/20 pt-1.5 transition-colors group-hover:text-[#F15A24]">{(idx + 1).toString().padStart(2, '0')}</span>
                        <div className="pb-8 border-b border-white/5 w-full last:border-0 group">
                          <h5 className="text-white font-bold mb-2 group-hover:text-[#F15A24] transition-colors uppercase tracking-tight">
                            {step.title}
                          </h5>
                          <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Code Block for Sim 6 */}
                {selectedSim.codeBlock && (
                  <section className="bg-dark/50 p-8 border border-white/5 rounded-sm">
                    <h4 className="text-[10px] font-bold text-[#F15A24] uppercase tracking-[0.3em] mb-6">Local Environment Configuration</h4>
                    <pre className="text-xs text-green-500/80 overflow-x-auto leading-relaxed border-l-2 border-green-500/30 pl-6">
                      <code className="font-mono">{selectedSim.codeBlock}</code>
                    </pre>
                  </section>
                )}

                {/* Screenshots */}
                <section>
                  <h4 className="text-[10px] font-bold text-[#8AC4C7] uppercase tracking-[0.2em] mb-8">Visualization Deliverables</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedSim.screenshots.map((shot, idx) => (
                      <div key={idx} className="bg-dark/30 p-8 border border-white/5 hover:border-white/10 transition-colors">
                        <span className="text-[10px] uppercase font-black text-white tracking-widest bg-[#F15A24] px-2 py-0.5 mb-4 inline-block">{shot.fig}</span>
                        <p className="text-sm text-gray-400 mb-6 leading-relaxed">{shot.caption}</p>
                        <div className="pt-4 border-t border-white/5 text-[10px] font-bold uppercase tracking-widest text-[#8AC4C7]">
                          Loc: {shot.placement}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Cross-reference */}
                {selectedSim.crossRef !== "N/A" && (
                  <section className="bg-[#CFDFDC]/5 p-8 border-l-4 border-[#F15A24]">
                    <h4 className="text-[10px] font-bold text-[#F15A24] uppercase tracking-[0.2em] mb-4">Official Manuscript Reference</h4>
                    <p className="text-sm italic text-gray-400 leading-relaxed font-serif">
                      {selectedSim.crossRef}
                    </p>
                  </section>
                )}

                {/* Launch Button */}
                <div className="pt-16 pb-12">
                  <a
                    href={selectedSim.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center w-full py-6 text-center text-sm bg-[#F15A24] text-white hover:bg-[#F15A24]/90 transition-all uppercase font-bold tracking-[0.3em] shadow-[0_10px_40px_rgba(241,90,36,0.2)]"
                  >
                    {selectedSim.id === "sim6" ? "Cloud Integration: Google Colab" : "Initialize Remote Simulation"}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

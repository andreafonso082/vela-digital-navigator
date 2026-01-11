import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const NauWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !svgRef.current || !pathRef.current || !labelRef.current) return;

    const container = containerRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    const label = labelRef.current;

    // ====== Configs - Estilo Nau Portuguesa Holográfica Vermelha ======
    const STYLE = {
      primary: 0xff3333,      // Vermelho vivo
      secondary: 0xff6666,    // Vermelho mais claro (glow)
      accent: 0xff1111,       // Vermelho intenso
      bright: 0xff8888,       // Rosa/vermelho para highlights
      wireOpacity: 0.7,
      glowOpacity: 0.2,
      detailOpacity: 0.45,
      particles: 500,
      calloutOffsetX: 150,
      calloutOffsetY: -60,
      elbowX: 70,
      margin: 14
    };

    const cannonTexts: Record<number, string> = {
      1: "Criação de Website",
      2: "Integração de Agentes IA",
      3: "Gestão de SEO e Google Meu Negócio",
      4: "Branding e Criação de Logotipos",
      5: "Gestão de Redes Sociais",
      6: "Fotografia e Vídeo Profissional"
    };

    // ====== Three.js setup ======
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 2.0, 8);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;

    // Luzes subtis
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    
    const pointLight = new THREE.PointLight(STYLE.primary, 0.8, 25);
    pointLight.position.set(0, 3, 5);
    scene.add(pointLight);

    // ====== Materiais wireframe holográficos vermelhos ======
    function makeWireMat(opacity: number, color = STYLE.primary) {
      return new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
    }

    const matWire = makeWireMat(STYLE.wireOpacity);
    const matGlow = makeWireMat(STYLE.glowOpacity, STYLE.secondary);
    const matDetail = makeWireMat(STYLE.detailOpacity);
    const matBright = makeWireMat(0.9, STYLE.bright);

    // ====== Nau Portuguesa Detalhada ======
    const ship = new THREE.Group();
    scene.add(ship);

    // === CASCO (Hull) - Mais elaborado com múltiplos níveis ===
    const hullShape = new THREE.Shape();
    hullShape.moveTo(-2.8, 0.0);
    hullShape.bezierCurveTo(-2.6, -0.6, -1.3, -0.85, 0.0, -0.8);
    hullShape.bezierCurveTo(1.3, -0.75, 2.7, -0.4, 3.0, 0.1);
    hullShape.bezierCurveTo(1.8, 0.7, -1.5, 0.8, -2.8, 0.0);

    const hullGeo = new THREE.ExtrudeGeometry(hullShape, {
      depth: 2.0,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.08,
      bevelSegments: 4,
      steps: 3
    });
    hullGeo.center();

    const hull1 = new THREE.Mesh(hullGeo, matWire);
    const hull2 = new THREE.Mesh(hullGeo, matGlow);
    hull2.scale.set(1.03, 1.03, 1.03);
    ship.add(hull1, hull2);

    // Faixas decorativas do casco
    for (let i = 0; i < 3; i++) {
      const stripeGeo = new THREE.BoxGeometry(5.2, 0.04, 1.95);
      const stripe = new THREE.Mesh(stripeGeo, matDetail);
      stripe.position.set(0, -0.25 + i * 0.25, 0);
      ship.add(stripe);
    }

    // Vigias/janelas do casco
    for (let i = 0; i < 8; i++) {
      const windowGeo = new THREE.BoxGeometry(0.15, 0.12, 0.05);
      const windowMesh = new THREE.Mesh(windowGeo, matBright);
      windowMesh.position.set(-2.5 + i * 0.65, 0.15, 1.0);
      ship.add(windowMesh);
      const windowMesh2 = windowMesh.clone();
      windowMesh2.position.z = -1.0;
      ship.add(windowMesh2);
    }

    // === CONVÉS Principal ===
    const deckGeo = new THREE.BoxGeometry(4.5, 0.1, 1.7);
    const deck = new THREE.Mesh(deckGeo, matWire);
    deck.position.set(0.2, 0.65, 0);
    ship.add(deck);

    // Linhas do convés (tábuas)
    for (let i = 0; i < 6; i++) {
      const plankGeo = new THREE.BoxGeometry(4.3, 0.02, 0.02);
      const plank = new THREE.Mesh(plankGeo, matDetail);
      plank.position.set(0.2, 0.71, -0.7 + i * 0.28);
      ship.add(plank);
    }

    // === CASTELO DE PROA (Forecastle) ===
    const forecastleGeo = new THREE.BoxGeometry(1.4, 0.6, 1.55);
    const forecastle = new THREE.Mesh(forecastleGeo, matWire);
    forecastle.position.set(2.3, 1.0, 0);
    ship.add(forecastle);

    // Deck do forecastle
    const foreDeckGeo = new THREE.BoxGeometry(1.35, 0.05, 1.5);
    const foreDeck = new THREE.Mesh(foreDeckGeo, matDetail);
    foreDeck.position.set(2.3, 1.35, 0);
    ship.add(foreDeck);

    // === CASTELO DE POPA (Sterncastle) - Múltiplos níveis ===
    // Nível 1
    const stern1Geo = new THREE.BoxGeometry(1.8, 0.7, 1.65);
    const stern1 = new THREE.Mesh(stern1Geo, matWire);
    stern1.position.set(-2.0, 1.05, 0);
    ship.add(stern1);

    // Nível 2
    const stern2Geo = new THREE.BoxGeometry(1.4, 0.55, 1.45);
    const stern2 = new THREE.Mesh(stern2Geo, matWire);
    stern2.position.set(-2.1, 1.7, 0);
    ship.add(stern2);

    // Nível 3 - Cabine do capitão
    const cabinGeo = new THREE.BoxGeometry(1.0, 0.4, 1.2);
    const cabin = new THREE.Mesh(cabinGeo, matWire);
    cabin.position.set(-2.15, 2.2, 0);
    ship.add(cabin);

    // Janelas da popa (grandes janelas típicas)
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 3; col++) {
        const sternWindowGeo = new THREE.BoxGeometry(0.25, 0.2, 0.05);
        const sternWindow = new THREE.Mesh(sternWindowGeo, matBright);
        sternWindow.position.set(-2.9, 1.2 + row * 0.6, -0.35 + col * 0.35);
        sternWindow.rotation.y = Math.PI / 2;
        ship.add(sternWindow);
      }
    }

    // === BALAUSTRADAS (Rails) ===
    const createRail = (startX: number, endX: number, y: number, z: number) => {
      const length = endX - startX;
      const railGeo = new THREE.BoxGeometry(length, 0.06, 0.03);
      const rail = new THREE.Mesh(railGeo, matDetail);
      rail.position.set(startX + length/2, y, z);
      ship.add(rail);
      
      // Postes verticais
      const postCount = Math.floor(length / 0.4);
      for (let i = 0; i <= postCount; i++) {
        const postGeo = new THREE.BoxGeometry(0.03, 0.25, 0.03);
        const post = new THREE.Mesh(postGeo, matDetail);
        post.position.set(startX + i * (length / postCount), y - 0.1, z);
        ship.add(post);
      }
    };
    
    createRail(-0.8, 1.5, 0.85, 0.85);
    createRail(-0.8, 1.5, 0.85, -0.85);
    createRail(1.7, 2.9, 1.5, 0.75);
    createRail(1.7, 2.9, 1.5, -0.75);

    // === MASTROS E VELAS ===
    
    // Função para criar mastro completo com velas
    function createMast(x: number, baseHeight: number, mastHeight: number, numSails: number, hasTopsail: boolean = true) {
      // Mastro principal
      const mastGeo = new THREE.CylinderGeometry(0.06, 0.09, mastHeight, 12);
      const mast = new THREE.Mesh(mastGeo, matWire);
      mast.position.set(x, baseHeight + mastHeight / 2, 0);
      ship.add(mast);
      
      // Mastro de topo (se tiver)
      if (hasTopsail) {
        const topMastGeo = new THREE.CylinderGeometry(0.04, 0.06, mastHeight * 0.5, 10);
        const topMast = new THREE.Mesh(topMastGeo, matDetail);
        topMast.position.set(x, baseHeight + mastHeight + mastHeight * 0.25, 0);
        ship.add(topMast);
      }

      // Vergas e velas
      for (let i = 0; i < numSails; i++) {
        const yardY = baseHeight + mastHeight * (0.45 + i * 0.28);
        const yardWidth = 2.0 - i * 0.35;
        
        // Verga
        const yardGeo = new THREE.CylinderGeometry(0.025, 0.03, yardWidth, 8);
        const yard = new THREE.Mesh(yardGeo, matWire);
        yard.rotation.z = Math.PI / 2;
        yard.position.set(x, yardY, 0);
        ship.add(yard);

        // Vela com curvatura
        const sailWidth = yardWidth * 0.85;
        const sailHeight = 1.4 - i * 0.25;
        const sailGeo = new THREE.PlaneGeometry(sailWidth, sailHeight, 16, 16);
        const positions = sailGeo.attributes.position;
        for (let j = 0; j < positions.count; j++) {
          const px = positions.getX(j);
          const py = positions.getY(j);
          // Curvatura natural da vela cheia de vento
          const z = Math.sin(px * 1.5) * 0.25 + Math.sin(py * 0.8) * 0.1;
          positions.setZ(j, z);
        }
        sailGeo.computeVertexNormals();
        
        const sail = new THREE.Mesh(sailGeo, matWire);
        sail.position.set(x, yardY - sailHeight / 2 - 0.1, 0);
        ship.add(sail);

        // Glow da vela
        const sailGlow = new THREE.Mesh(sailGeo, matGlow);
        sailGlow.position.copy(sail.position);
        sailGlow.scale.set(1.02, 1.02, 1.02);
        ship.add(sailGlow);
      }

      // Cesto de vigia (gávea)
      const nestGeo = new THREE.CylinderGeometry(0.22, 0.18, 0.12, 12);
      const nest = new THREE.Mesh(nestGeo, matDetail);
      nest.position.set(x, baseHeight + mastHeight * 0.72, 0);
      ship.add(nest);

      // Bandeira no topo
      const flagShape = new THREE.Shape();
      flagShape.moveTo(0, 0);
      flagShape.lineTo(0.5, 0.1);
      flagShape.lineTo(0.45, 0.35);
      flagShape.lineTo(0, 0.28);
      const flagGeo = new THREE.ShapeGeometry(flagShape);
      const flag = new THREE.Mesh(flagGeo, matBright);
      flag.position.set(x, baseHeight + mastHeight + (hasTopsail ? mastHeight * 0.55 : 0.15), 0);
      ship.add(flag);
    }

    // Mastro de Proa (Foremast)
    createMast(1.6, 0.7, 2.8, 2, true);
    
    // Mastro Principal (Mainmast) - o maior
    createMast(0.0, 0.7, 3.6, 3, true);
    
    // Mastro de Mezena (Mizzenmast)
    createMast(-1.5, 0.7, 2.6, 2, false);

    // === GURUPÉS (Bowsprit) ===
    const bowspritGeo = new THREE.CylinderGeometry(0.04, 0.06, 2.5, 10);
    const bowsprit = new THREE.Mesh(bowspritGeo, matWire);
    bowsprit.rotation.z = Math.PI / 4.5;
    bowsprit.position.set(3.4, 0.95, 0);
    ship.add(bowsprit);

    // Vela do gurupés (Spritsail)
    const spritsailGeo = new THREE.PlaneGeometry(1.2, 1.0, 8, 8);
    const spritsailPos = spritsailGeo.attributes.position;
    for (let i = 0; i < spritsailPos.count; i++) {
      const px = spritsailPos.getX(i);
      spritsailPos.setZ(i, Math.sin(px * 1.2) * 0.15);
    }
    const spritsail = new THREE.Mesh(spritsailGeo, matWire);
    spritsail.position.set(3.8, 0.55, 0);
    spritsail.rotation.z = 0.15;
    ship.add(spritsail);

    // Vela latina de popa (Lateen sail)
    const lateenYardGeo = new THREE.CylinderGeometry(0.02, 0.03, 2.8, 8);
    const lateenYard = new THREE.Mesh(lateenYardGeo, matDetail);
    lateenYard.rotation.z = Math.PI / 3;
    lateenYard.position.set(-2.2, 2.5, 0);
    ship.add(lateenYard);

    const lateenShape = new THREE.Shape();
    lateenShape.moveTo(0, 0);
    lateenShape.lineTo(1.6, 2.2);
    lateenShape.lineTo(0, 2.6);
    lateenShape.lineTo(0, 0);
    const lateenGeo = new THREE.ShapeGeometry(lateenShape, 12);
    const lateen = new THREE.Mesh(lateenGeo, matWire);
    lateen.position.set(-2.6, 1.0, 0.05);
    lateen.rotation.y = 0.1;
    ship.add(lateen);
    
    const lateenGlow = new THREE.Mesh(lateenGeo, matGlow);
    lateenGlow.position.copy(lateen.position);
    lateenGlow.rotation.copy(lateen.rotation);
    ship.add(lateenGlow);

    // === CORDAME (Rigging) ===
    const lineMat = new THREE.LineBasicMaterial({ 
      color: STYLE.primary, 
      transparent: true, 
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });
    
    const createLine = (from: THREE.Vector3, to: THREE.Vector3) => {
      const geo = new THREE.BufferGeometry().setFromPoints([from, to]);
      return new THREE.Line(geo, lineMat);
    };
    
    // Estais (cabos dos mastros para proa/popa)
    ship.add(createLine(new THREE.Vector3(0, 4.5, 0), new THREE.Vector3(3.8, 1.3, 0)));
    ship.add(createLine(new THREE.Vector3(0, 4.5, 0), new THREE.Vector3(-2.5, 2.5, 0)));
    ship.add(createLine(new THREE.Vector3(1.6, 3.7, 0), new THREE.Vector3(4.2, 1.0, 0)));
    ship.add(createLine(new THREE.Vector3(-1.5, 3.4, 0), new THREE.Vector3(-2.8, 2.2, 0)));
    
    // Brandais (cabos laterais)
    [0, 1.6, -1.5].forEach(x => {
      const topY = x === 0 ? 4.5 : 3.6;
      ship.add(createLine(new THREE.Vector3(x, topY, 0), new THREE.Vector3(x, 0.65, 0.9)));
      ship.add(createLine(new THREE.Vector3(x, topY, 0), new THREE.Vector3(x, 0.65, -0.9)));
    });

    // Enfrechates (escadas de corda)
    [0.0, 1.6].forEach(x => {
      for (let i = 0; i < 8; i++) {
        const y = 1.0 + i * 0.4;
        const z = 0.88 - i * 0.03;
        ship.add(createLine(new THREE.Vector3(x - 0.15, y, z), new THREE.Vector3(x + 0.15, y, z)));
        ship.add(createLine(new THREE.Vector3(x - 0.15, y, -z), new THREE.Vector3(x + 0.15, y, -z)));
      }
    });

    // === CANHÕES ===
    const cannons: { id: number; target: THREE.Mesh }[] = [];
    const clickTargets: THREE.Mesh[] = [];

    function addCannon(id: number, x: number, y: number, z: number) {
      const cannonGeo = new THREE.CylinderGeometry(0.06, 0.08, 0.45, 10);
      const cannon = new THREE.Mesh(cannonGeo, matWire);
      cannon.rotation.x = Math.PI / 2;
      cannon.position.set(x, y, z);
      ship.add(cannon);

      // Rodas do canhão
      const wheelGeo = new THREE.TorusGeometry(0.06, 0.015, 6, 12);
      const wheel1 = new THREE.Mesh(wheelGeo, matDetail);
      wheel1.position.set(x - 0.1, y - 0.06, z * 0.8);
      wheel1.rotation.y = Math.PI / 2;
      ship.add(wheel1);
      const wheel2 = wheel1.clone();
      wheel2.position.x = x + 0.1;
      ship.add(wheel2);

      // Target invisível
      const tGeo = new THREE.SphereGeometry(0.28, 12, 12);
      const tMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
      const target = new THREE.Mesh(tGeo, tMat);
      target.position.set(x, y, z);
      target.userData.cannonId = id;
      ship.add(target);

      cannons.push({ id, target });
      clickTargets.push(target);
    }

    // 6 canhões de cada lado
    const cannonY = 0.5;
    for (let i = 0; i < 6; i++) {
      addCannon(i + 1, -1.8 + i * 0.7, cannonY, 1.0);
    }
    for (let i = 0; i < 6; i++) {
      addCannon(i + 1, -1.8 + i * 0.7, cannonY, -1.0);
    }

    // === EFEITO DE PROJEÇÃO HOLOGRÁFICA NA BASE ===
    
    // Anel de luz na base
    const ringGeo = new THREE.RingGeometry(1.5, 1.8, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: STYLE.primary,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -1.5;
    scene.add(ring);

    // Cone de luz (projeção)
    const coneGeo = new THREE.ConeGeometry(1.8, 2.5, 32, 1, true);
    const coneMat = new THREE.MeshBasicMaterial({
      color: STYLE.primary,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const cone = new THREE.Mesh(coneGeo, coneMat);
    cone.position.y = -2.75;
    cone.rotation.x = Math.PI;
    scene.add(cone);

    // Ponto brilhante central
    const glowSphereGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const glowSphereMat = new THREE.MeshBasicMaterial({
      color: STYLE.bright,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const glowSphere = new THREE.Mesh(glowSphereGeo, glowSphereMat);
    glowSphere.position.y = -1.5;
    scene.add(glowSphere);

    // === PARTÍCULAS ===
    const ptsGeo = new THREE.BufferGeometry();
    const pts = new Float32Array(STYLE.particles * 3);
    const ptsVelocities = new Float32Array(STYLE.particles);
    
    for (let i = 0; i < STYLE.particles; i++) {
      const isBaseParticle = i < STYLE.particles * 0.3;
      const isShipParticle = i < STYLE.particles * 0.6 && !isBaseParticle;
      
      if (isBaseParticle) {
        // Partículas na base (efeito projeção)
        const angle = Math.random() * Math.PI * 2;
        const radius = 0.5 + Math.random() * 1.5;
        pts[i * 3 + 0] = Math.cos(angle) * radius;
        pts[i * 3 + 1] = -1.5 + Math.random() * 1.5;
        pts[i * 3 + 2] = Math.sin(angle) * radius;
        ptsVelocities[i] = 0.01 + Math.random() * 0.02;
      } else if (isShipParticle) {
        // Partículas ao redor do navio
        pts[i * 3 + 0] = (Math.random() - 0.5) * 6;
        pts[i * 3 + 1] = (Math.random() - 0.3) * 4;
        pts[i * 3 + 2] = (Math.random() - 0.5) * 4;
        ptsVelocities[i] = 0.003 + Math.random() * 0.005;
      } else {
        // Partículas ambiente distantes
        const r = 4 + Math.random() * 4;
        const a = Math.random() * Math.PI * 2;
        pts[i * 3 + 0] = Math.cos(a) * r;
        pts[i * 3 + 1] = (Math.random() - 0.5) * 6;
        pts[i * 3 + 2] = Math.sin(a) * r;
        ptsVelocities[i] = 0.001 + Math.random() * 0.003;
      }
    }
    
    ptsGeo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
    
    const ptsMat = new THREE.PointsMaterial({
      color: STYLE.primary,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });
    
    const particles = new THREE.Points(ptsGeo, ptsMat);
    scene.add(particles);

    // Posição do navio
    ship.position.y = -0.2;
    ship.rotation.y = -0.5;

    // ====== Raycaster ======
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let activeCannonId = 1;

    function setActiveCannon(id: number) {
      activeCannonId = id;
      label.textContent = cannonTexts[id] || "";
      label.style.opacity = "1";
    }
    setActiveCannon(1);

    function onPointerMove(ev: PointerEvent) {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(
        ((ev.clientX - rect.left) / rect.width) * 2 - 1,
        -((ev.clientY - rect.top) / rect.height) * 2 + 1
      );
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(clickTargets, false);
      renderer.domElement.style.cursor = hits.length ? "pointer" : "grab";
    }

    function onPointerDown(ev: PointerEvent) {
      if (ev.pointerType === "touch") ev.preventDefault();
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(
        ((ev.clientX - rect.left) / rect.width) * 2 - 1,
        -((ev.clientY - rect.top) / rect.height) * 2 + 1
      );
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(clickTargets, false);
      if (hits.length) {
        setActiveCannon(hits[0].object.userData.cannonId);
      }
    }

    renderer.domElement.addEventListener('pointermove', onPointerMove, { passive: true });
    renderer.domElement.addEventListener('pointerdown', onPointerDown, { passive: false });

    // ====== Callout ======
    const tmpV = new THREE.Vector3();
    const tmpCenter = new THREE.Vector3();

    function worldToScreen(v3: THREE.Vector3, rect: DOMRect) {
      const v = v3.clone().project(camera);
      return {
        x: (v.x * 0.5 + 0.5) * rect.width,
        y: (-v.y * 0.5 + 0.5) * rect.height
      };
    }

    function updateCallout() {
      const rect = renderer.domElement.getBoundingClientRect();
      svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);

      const c = cannons.find(c => c.id === activeCannonId);
      if (!c) {
        path.setAttribute("d", "");
        label.style.opacity = "0";
        return;
      }

      c.target.getWorldPosition(tmpV);
      const start = worldToScreen(tmpV, rect);

      ship.getWorldPosition(tmpCenter);
      const center = worldToScreen(tmpCenter, rect);

      const dir = (start.x >= center.x) ? +1 : -1;

      let elbowX = start.x + dir * STYLE.elbowX;
      let elbowY = start.y;
      let endX = start.x + dir * STYLE.calloutOffsetX;
      let endY = start.y + STYLE.calloutOffsetY;

      endY = Math.max(STYLE.margin, Math.min(rect.height - STYLE.margin, endY));

      if (dir > 0) {
        endX = Math.max(center.x + STYLE.margin, endX);
        endX = Math.min(rect.width - STYLE.margin, endX);
      } else {
        endX = Math.min(center.x - STYLE.margin, endX);
        endX = Math.max(STYLE.margin, endX);
      }

      elbowX = start.x + dir * STYLE.elbowX;
      elbowX = Math.max(STYLE.margin, Math.min(rect.width - STYLE.margin, elbowX));

      const d = `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} L ${elbowX.toFixed(1)} ${elbowY.toFixed(1)} L ${endX.toFixed(1)} ${endY.toFixed(1)}`;
      path.setAttribute("d", d);

      label.style.left = `${endX}px`;
      label.style.top = `${endY}px`;
      label.style.transform = dir > 0
        ? "translate(12px, -50%)"
        : "translate(calc(-100% - 12px), -50%)";
    }

    // ====== Resize ======
    function resize() {
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      updateCallout();
    }
    window.addEventListener('resize', resize);

    // ====== Animation loop ======
    let time = 0;
    let animationId: number;
    
    function animate() {
      time += 0.016;
      controls.update();
      
      // Animar partículas subindo da base
      const positions = ptsGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < STYLE.particles * 0.3; i++) {
        let y = positions.getY(i);
        y += ptsVelocities[i];
        if (y > 3) {
          y = -1.5;
          const angle = Math.random() * Math.PI * 2;
          const radius = 0.5 + Math.random() * 1.5;
          positions.setX(i, Math.cos(angle) * radius);
          positions.setZ(i, Math.sin(angle) * radius);
        }
        positions.setY(i, y);
      }
      positions.needsUpdate = true;

      // Pulsar o brilho na base
      glowSphere.scale.setScalar(1 + Math.sin(time * 3) * 0.15);
      ring.material.opacity = 0.4 + Math.sin(time * 2) * 0.2;

      updateCallout();
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    }
    
    resize();
    animate();

    // ====== Cleanup ======
    return () => {
      window.removeEventListener('resize', resize);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      cancelAnimationFrame(animationId);
      
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div 
        ref={containerRef} 
        className="absolute inset-0 touch-none cursor-grab active:cursor-grabbing"
      />
      
      {/* Callout SVG */}
      <svg 
        ref={svgRef}
        className="absolute inset-0 pointer-events-none"
        width="100%" 
        height="100%" 
        aria-hidden="true"
      >
        <path 
          ref={pathRef}
          d="" 
          fill="none"
          stroke="#ff4444"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-90"
          style={{ filter: 'drop-shadow(0 0 6px rgba(255, 68, 68, 0.6))' }}
        />
      </svg>
      
      {/* Callout Label */}
      <div 
        ref={labelRef}
        className="absolute font-sans text-base font-semibold leading-tight whitespace-nowrap pointer-events-none opacity-0 transition-opacity duration-150"
        style={{ color: '#ff6666', textShadow: '0 0 12px rgba(255,68,68,0.5), 0 0 24px rgba(255,68,68,0.3)' }}
      />
    </div>
  );
};

export default NauWidget;

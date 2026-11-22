import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

function makePanelTexture(lines: number, accent: string, header = true) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 340;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#0d0d1f';
  ctx.fillRect(0, 0, 512, 340);
  if (header) {
    ctx.fillStyle = '#181832';
    ctx.fillRect(0, 0, 512, 44);
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(26, 22, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.fillRect(50, 16, 120, 12);
  }
  for (let i = 0; i < lines; i++) {
    const w = 180 + Math.random() * 280;
    ctx.fillStyle = i === 0 ? accent : 'rgba(255,255,255,0.14)';
    ctx.fillRect(30, 70 + i * 34, i === 0 ? 240 : w, 14);
  }
  ctx.fillStyle = accent;
  ctx.fillRect(30, 290, 140, 32);
  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 4;
  return tex;
}

function makeZipTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#101024';
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = 'rgba(139,92,246,0.9)';
  ctx.lineWidth = 8;
  ctx.strokeRect(16, 16, 224, 224);
  ctx.fillStyle = '#8B5CF6';
  for (let y = 40; y < 220; y += 36) {
    ctx.fillRect(118, y, 20, 18);
  }
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.fillRect(60, 60, 40, 8);
  ctx.fillRect(156, 100, 40, 8);
  return new THREE.CanvasTexture(canvas);
}

function makeIconTexture(char: string, color: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#0d0d1f';
  ctx.beginPath();
  ctx.arc(128, 128, 120, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(128, 128, 120, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.font = 'bold 140px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(char, 128, 134);
  return new THREE.CanvasTexture(canvas);
}

export function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0.4, 11);

    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x404080, 1.4));
    const keyLight = new THREE.PointLight(0x8b5cf6, 40, 40);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);
    const cyanLight = new THREE.PointLight(0x22d3ee, 26, 40);
    cyanLight.position.set(-5, -3, 4);
    scene.add(cyanLight);

    const group = new THREE.Group();
    scene.add(group);

    const disposables: (THREE.BufferGeometry | THREE.Material | THREE.Texture)[] = [];

    // website preview panel
    const panelGeo = new THREE.BoxGeometry(3.4, 2.25, 0.08);
    const panelTex = makePanelTexture(5, '#8B5CF6');
    const panelMat = new THREE.MeshStandardMaterial({ map: panelTex, roughness: 0.4, metalness: 0.3 });
    const panel = new THREE.Mesh(panelGeo, panelMat);
    panel.position.set(0, 0.7, 0);
    group.add(panel);
    disposables.push(panelGeo, panelMat, panelTex);

    // payment confirmation panel
    const payGeo = new THREE.BoxGeometry(1.9, 1.3, 0.06);
    const payTex = makePanelTexture(2, '#22D3EE');
    const payMat = new THREE.MeshStandardMaterial({ map: payTex, roughness: 0.35, metalness: 0.4 });
    const payPanel = new THREE.Mesh(payGeo, payMat);
    payPanel.position.set(-2.5, -1.5, 1.4);
    payPanel.rotation.set(-0.15, 0.35, 0.08);
    group.add(payPanel);
    disposables.push(payGeo, payMat, payTex);

    // approval notification
    const okGeo = new THREE.BoxGeometry(1.5, 0.8, 0.06);
    const okTex = makePanelTexture(1, '#34D399', false);
    const okMat = new THREE.MeshStandardMaterial({ map: okTex, roughness: 0.35, metalness: 0.4 });
    const okPanel = new THREE.Mesh(okGeo, okMat);
    okPanel.position.set(2.6, 2.1, 0.8);
    okPanel.rotation.set(0.1, -0.4, -0.05);
    group.add(okPanel);
    disposables.push(okGeo, okMat, okTex);

    // ZIP package cube
    const zipGeo = new THREE.BoxGeometry(0.9, 0.9, 0.9);
    const zipTex = makeZipTexture();
    const zipMat = new THREE.MeshStandardMaterial({ map: zipTex, roughness: 0.3, metalness: 0.5 });
    const zipCube = new THREE.Mesh(zipGeo, zipMat);
    zipCube.position.set(2.7, -1.1, 1.2);
    group.add(zipCube);
    disposables.push(zipGeo, zipMat, zipTex);

    // small product card tiles
    const cardColors = ['#22D3EE', '#F472B6', '#A78BFA'];
    const smallCards: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const g = new THREE.BoxGeometry(0.7, 0.5, 0.04);
      const c = document.createElement('canvas');
      c.width = 128; c.height = 96;
      const cx = c.getContext('2d')!;
      cx.fillStyle = '#101024'; cx.fillRect(0, 0, 128, 96);
      cx.fillStyle = cardColors[i]; cx.fillRect(10, 10, 108, 8);
      cx.fillStyle = 'rgba(255,255,255,0.2)'; cx.fillRect(10, 30, 80, 6); cx.fillRect(10, 44, 60, 6);
      const t = new THREE.CanvasTexture(c);
      const m = new THREE.MeshStandardMaterial({ map: t, roughness: 0.4, metalness: 0.35 });
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(-3.1 + i * 0.4, 2.4 - i * 1.6, 0.6 + i * 0.5);
      mesh.rotation.set(0, 0.3, 0.05 * i);
      group.add(mesh);
      smallCards.push(mesh);
      disposables.push(g, m, t);
    }

    // geometric accents
    const torusGeo = new THREE.TorusGeometry(0.45, 0.16, 24, 64);
    const torusMat = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, emissive: 0x4c1d95, roughness: 0.25, metalness: 0.7 });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.position.set(-3.2, 1.8, -0.8);
    group.add(torus);
    disposables.push(torusGeo, torusMat);

    const icoGeo = new THREE.CircleGeometry(0.42, 40);
    const dlTex = makeIconTexture('\u2193', '#22D3EE');
    const dlMat = new THREE.MeshBasicMaterial({ map: dlTex, transparent: true });
    const downloadIcon = new THREE.Mesh(icoGeo, dlMat);
    downloadIcon.position.set(3.3, 0.4, -0.5);
    group.add(downloadIcon);
    disposables.push(icoGeo, dlMat, dlTex);

    // wireframe ring around main panel
    const ringGeo = new THREE.TorusGeometry(2.6, 0.015, 12, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.35 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.4;
    ring.position.y = 0.7;
    group.add(ring);
    disposables.push(ringGeo, ringMat);

    // particles
    let particleSystem: THREE.Points | null = null;
    if (!isMobile) {
      const count = 260;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 14;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0x8b5cf6,
        size: 0.035,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
      });
      particleSystem = new THREE.Points(pGeo, pMat);
      scene.add(particleSystem);
      disposables.push(pGeo, pMat);
    }

    // entrance animation
    if (!prefersReduced) {
      group.scale.set(0.6, 0.6, 0.6);
      group.rotation.y = -0.6;
      group.position.y = -0.8;
      gsap.to(group.scale, { x: 1, y: 1, z: 1, duration: 1.6, ease: 'power3.out', delay: 0.4 });
      gsap.to(group.rotation, { y: 0, duration: 1.8, ease: 'power3.out', delay: 0.4 });
      gsap.to(group.position, { y: 0, duration: 1.8, ease: 'power3.out', delay: 0.4 });
    }

    // mouse parallax
    let targetX = 0;
    let targetY = 0;
    const onPointer = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      targetX = ((e.clientX - r.left) / r.width - 0.5) * 2;
      targetY = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener('pointermove', onPointer);

    const clock = new THREE.Clock();
    let raf = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();
      if (!prefersReduced) {
        panel.position.y = 0.7 + Math.sin(t * 0.6) * 0.12;
        panel.rotation.y = Math.sin(t * 0.3) * 0.06;
        zipCube.rotation.x = t * 0.4;
        zipCube.rotation.y = t * 0.55;
        zipCube.position.y = -1.1 + Math.sin(t * 0.8 + 1) * 0.1;
        payPanel.position.y = -1.5 + Math.sin(t * 0.7 + 2) * 0.09;
        okPanel.position.y = 2.1 + Math.sin(t * 0.5 + 3) * 0.09;
        torus.rotation.y = t * 0.6;
        torus.rotation.x = t * 0.3;
        ring.rotation.z = t * 0.15;
        downloadIcon.position.y = 0.4 + Math.sin(t * 0.9 + 1.5) * 0.12;
        smallCards.forEach((c, i) => {
          c.position.y += Math.sin(t * 0.8 + i * 2) * 0.0015;
          c.rotation.y = 0.3 + Math.sin(t * 0.4 + i) * 0.08;
        });
        if (particleSystem) particleSystem.rotation.y = t * 0.02;
        group.rotation.y += (targetX * 0.18 - group.rotation.y) * 0.03;
        group.rotation.x += (targetY * 0.1 - group.rotation.x) * 0.03;
        camera.position.x += (targetX * 0.5 - camera.position.x) * 0.03;
        camera.lookAt(0, 0.3, 0);
      }
      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', onResize);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}

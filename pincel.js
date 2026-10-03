/* Trilha de pincel verde que segue o mouse (somente desktop) */
(function () {
  var desktop = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
  var reduzido = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!desktop.matches || reduzido.matches) return;

  var canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText =
    "position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;mix-blend-mode:multiply;";
  document.body.appendChild(canvas);
  var ctx = canvas.getContext("2d");
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  function ajustar() {
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = "round";
  }
  ajustar();
  addEventListener("resize", ajustar);

  // Cerdas do pincel: cada uma com deslocamento, espessura e opacidade proprias
  var cerdas = [];
  for (var i = 0; i < 14; i++) {
    cerdas.push({
      off: (Math.random() - 0.5) * 18,
      w: 0.8 + Math.random() * 2.4,
      a: 0.4 + Math.random() * 0.45
    });
  }

  var ultimo = null;
  addEventListener("mousemove", function (e) {
    var p = { x: e.clientX, y: e.clientY };
    if (ultimo) {
      var dx = p.x - ultimo.x, dy = p.y - ultimo.y;
      var dist = Math.hypot(dx, dy);
      if (dist > 0.5 && dist < 250) {
        var nx = -dy / dist, ny = dx / dist; // perpendicular ao movimento
        for (var j = 0; j < cerdas.length; j++) {
          var c = cerdas[j];
          if (Math.random() < 0.12) continue; // falhas naturais da tinta
          ctx.strokeStyle = "rgba(180,190,100," + c.a + ")";
          ctx.lineWidth = c.w;
          ctx.beginPath();
          ctx.moveTo(ultimo.x + nx * c.off, ultimo.y + ny * c.off);
          ctx.lineTo(p.x + nx * c.off, p.y + ny * c.off);
          ctx.stroke();
        }
      }
    }
    ultimo = p;
  });
  document.addEventListener("mouseleave", function () { ultimo = null; });

  // Desbota rapidamente a tinta a cada quadro
  (function desbotar() {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    requestAnimationFrame(desbotar);
  })();
})();

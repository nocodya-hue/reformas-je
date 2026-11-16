// Reformas J&E · barra de contacto en el móvil y formulario → WhatsApp
(() => {
  const TEL = '34654408837';

  // barra fija del móvil: aparece al pasar la portada y se oculta en la sección de contacto
  const barra = document.getElementById('barra');
  const portada = document.querySelector('.portada');
  const contacto = document.getElementById('contacto');
  if (barra && 'IntersectionObserver' in window) {
    let trasPortada = false, enContacto = false;
    const pinta = () => {
      const ver = trasPortada && !enContacto;
      barra.classList.toggle('visible', ver);
      barra.setAttribute('aria-hidden', String(!ver));
      barra.querySelectorAll('a').forEach((a) => (a.tabIndex = ver ? 0 : -1));
    };
    new IntersectionObserver(([e]) => { trasPortada = !e.isIntersecting; pinta(); }).observe(portada);
    new IntersectionObserver(([e]) => { enContacto = e.isIntersecting; pinta(); }, { threshold: 0.05 }).observe(contacto);
  }

  // formulario: abre WhatsApp con el mensaje ya escrito (no se envía nada a ningún servidor)
  const f = document.getElementById('formulario');
  f?.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const nombre = f.nombre.value.trim();
    if (!nombre) { f.nombre.setAttribute('aria-invalid', 'true'); f.nombre.focus(); return; }
    f.nombre.removeAttribute('aria-invalid');
    const extra = f.mensaje.value.trim();
    const texto = `Hola, soy ${nombre}. Quiero pedir presupuesto: ${f.obra.value.toLowerCase()}.${extra ? `\n${extra}` : ''}`;
    window.open(`https://wa.me/${TEL}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
  });
})();

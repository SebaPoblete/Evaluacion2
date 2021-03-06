/**
* Template Name: Selecao - v4.0.1
* Template URL: https://bootstrapmade.com/selecao-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });


  /* Validaciones */

  /* validacion del nro de rut */
  $('#nroRut')
    .keypress(function (event) {
      if (
        !(
          /* numeros */
          (event.which >= 48 && event.which <= 57) 
        ) || 
          /* tamaño maximo del campo */
          (this.value.length >= 8) 
      ){
        return false;
      }
    }
  );

  // $('#nroRut')
  // .keypress(function (event) {
  //   // El código del carácter 0 es 48
  //   // El código del carácter 9 es 57
  //   if (event.which < 48 || event.which > 57 || this.value.length === 8) {
  //     return false;
  //   }
  // });

  /* validacion del digito verificador */
  $('#txtDigito')
    .keypress(function (event) {
      if (
        !(
          /* numeros */
          (event.which >= 48 && event.which <= 57) ||
          /* letras K y k */
          (event.which === 75 || event.which === 107) 
        ) || 
          /* tamaño maximo del campo */
            (this.value.length === 1) 
      ){
        return false;
      }
    }
  );
  
  /* validacion del digito verificador */
  // $('#txtDigito')
  // .keypress(function (event) {
  //   // El código del carácter 0 es 48
  //   // El código del carácter 9 es 57
  //   // if (event.which < 48 || event.which > 57 || this.value.length === 1) {
  //   if (event.which < 48 || (event.which > 57 && event.which !== 75 && event.which !== 107) || this.value.length === 1 ) {
  //     return false;
  //   }
  // });


  $('#txtNombre')
    .keypress(function (event) {
      if (
        !(
          /* espacio en blanco */
          (event.which === 32) ||
          /* letras mayusculas */
          (event.which >= 65 && event.which <= 90) ||
          /* letras minusculas */
          (event.which >= 97 && event.which <= 122) ||
          /* letras Ñ y ñ*/
          (event.which === 209 || event.which === 241) 
        ) ||
            /* tamaño maximo del campo */
            (this.value.length === 50) 
      ){
        return false;
      }
    }
  );

  // $('#txtNombre')
  // .keypress(function (event) {
  //   if (
  //       ((!(event.which >= 65 && event.which <= 90)) 
  //       && (!(event.which >= 97 && event.which <= 122))) 
  //       && ((!(event.which === 209 || event.which === 241)))
  //       || this.value.length === 50 
  //       ) {
  //     return false;
  //   }
  // });

  $('#txtApellidos')
    .keypress(function (event) {
      if (
        !(
          /* espacio en blanco */
          (event.which === 32) ||
          /* letras mayusculas */
          (event.which >= 65 && event.which <= 90) ||
          /* letras minusculas */
          (event.which >= 97 && event.which <= 122) ||
          /* letras Ñ y ñ*/
          (event.which === 209 || event.which === 241) 
        ) ||
            /* tamaño maximo del campo */
            (this.value.length === 50) 
      ){
        return false;
      }
    }
  );

  // $('#txtApellidos')
  // .keypress(function (event) {
  //   if (
  //       ((!(event.which >= 65 && event.which <= 90)) 
  //       && (!(event.which >= 97 && event.which <= 122))) 
  //       && ((!(event.which === 209 || event.which === 241)))
  //       || this.value.length === 50 
  //       ) {
  //     return false;
  //   }
  // });

  $('#txtDireccion')
    .keypress(function (event) {
      if (
        !(
          /* espacio en blanco */
          (event.which === 32) ||
          /* numeros */
          (event.which >= 48 && event.which <= 57) ||
          /* letras mayusculas */
          (event.which >= 65 && event.which <= 90) ||
          /* letras minusculas */
          (event.which >= 97 && event.which <= 122) ||
          /* letras Ñ y ñ*/
          (event.which === 209 || event.which === 241) 
        ) ||
            /* tamaño maximo del campo */
            (this.value.length === 100) 
      ){
        return false;
      }
    }
  );

  /* validacion de la marca */
  $('#txtMarca')
    .keypress(function (event) {
      if (
        !(
          /* espacio en blanco */
          (event.which === 32) ||
          /* letras mayusculas */
          (event.which >= 65 && event.which <= 90) ||
          /* letras minusculas */
          (event.which >= 97 && event.which <= 122) ||
          /* letras Ñ y ñ */
          (event.which === 209 || event.which === 241) 
        ) ||
            /* tamaño maximo del campo */
            (this.value.length === 20) 
      ){
        return false;
      }
    }
  );

  /* validacion del modelo del auto */
  $('#txtModelo')
    .keypress(function (event) {
      if (
        !(
          /* espacio en blanco */
          (event.which === 32) ||
          /* letras mayusculas */
          (event.which >= 65 && event.which <= 90) ||
          /* letras minusculas */
          (event.which >= 97 && event.which <= 122) ||
          /* letras Ñ y ñ */
          (event.which === 209 || event.which === 241) 
        ) ||
            /* tamaño maximo del campo */
            (this.value.length === 20) 
      ){
        return false;
      }
    }
  );

  /* validacion del año */
  $('#txtAnio')
    .keypress(function (event) {
      if (
        !(
          /* numeros */
          (event.which >= 48 && event.which <= 57) 
        ) ||
            /* tamaño maximo del campo */
            (this.value.length === 4) 
      ){
        return false;
      }
    }
  );

  document.querySelector("#Registrar").addEventListener("click", Resumen);

})()

function Resumen(e) {
  e.preventDefault();
  
  /* ======= SELECCIONANDO ELEMENTOS  ======== */
  
  /* seleccion del elemento nro rut por su id */
  let nroRut = document.querySelector("#nroRut");

  /* seleccion del elemento digito verficador por su id */
  let txtDigito = document.querySelector("#txtDigito");

  /* seleccion del elemento nombres por su id */
  let txtNombres = document.querySelector("#txtNombres");

  /* seleccion del elemento apellidos por su id */
  let txtApellidos = document.querySelector("#txtApellidos");
 
  /* seleccion del elemento apellidos por su id */
  let txtDireccion = document.querySelector("#txtDireccion");

  /* seleccion de la lista de regiones por el id */
  let selectRegiones = document.querySelector("#regiones");
  
  /* seleccion de la lista de comunas el id*/
  let selectComunas = document.querySelector("#comunas");
  
  /* seleccion de los radio butons que tienen el atributo nombre radTipoVehiculo*/
  let radioTipoVehiculo = document.querySelectorAll("input[name='radTipoVehiculo']");

  /* seleccion de los radio butons que tienen el atributo nombre radRevisionTecnica*/
  let radioRevisionTecnica = document.querySelectorAll("input[name='radRevisionTecnica']");
  
 /* seleccion del elemento marca por su id */
 let txtMarca = document.querySelector("#txtMarca");

 /* seleccion del elemento modelo por su id */
 let txtModelo = document.querySelector("#txtModelo");

 /* seleccion del elemento Año por su id */
 let txtAnio = document.querySelector("#txtAnio");

  /* seleccion de los check de los servicios */
  let chkLavadoExterior = document.querySelector("#chkLavadoExterior");
  let chkLavadoMotor = document.querySelector("#chkLavadoMotor");

  /* seleccion de la lista de encargado el id*/
  let selectEncargado = document.querySelector("#encargado");

  /* seleccion de la lista de encargado el id*/
  let inputFechaHora = document.querySelector("#txtFechaHora");

  /* seleccion del elemento resumen para agregar el contenido*/
  let Resumen = document.querySelector("#resumen");


  /* ======= ASIGNANDO VARIABLES ======= */

  const IVA = 0.19;

  /* asignando el rut a una variable */
  let rut = `${nroRut.value}-${txtDigito.value}`;

  /* asignando el nombre completo a una variable */
  let nombreCompleto = `${txtNombres.value} ${txtApellidos.value}`;

  /* asignando el nombre completo a una variable */
  let direccion = txtDireccion.value;

  /* asignando el valor de la region seleccionada a una variable*/
  let region = selectRegiones.options[selectRegiones.selectedIndex].text;

  /* asignando el valor de la comuna seleccionada a una variable*/
  let comuna = selectComunas.options[selectComunas.selectedIndex].text;

  /* asignando la variable del tipo de vehiculo segun el radio seleccionado */
  var tipoVehiculo = "";
  for (let i = 0; i < radioTipoVehiculo.length; i++) {
    if (radioTipoVehiculo[i].checked) {
      tipoVehiculo = radioTipoVehiculo[i].value;
    }
  }

  /* asignando la variable revision tecnica segun el radio seleccionado */
  var revisionTecnica = "";
  for (let i = 0; i < radioRevisionTecnica.length; i++) {
    if (radioRevisionTecnica[i].checked) {
      revisionTecnica = radioRevisionTecnica[i].value;
    }
  }

  /* asignando la marca a una variable */
  let marca = txtMarca.value;

  /* asignando el modelo a una variable */
  let modelo = txtModelo.value;

  /* asignando el Año a una variable */
  let anio = txtAnio.value;

  /* asignando las variables de los servicios seleccionados y sus precios */
  let serviciosSolicitados = []; 
  /* si la opcion lavado exterior esta selecionada la agregamos al arreglo servicios */
    if (chkLavadoExterior.checked) {
      serviciosSolicitados.push({nombre:"Lavado Exterior",precio:5000});
    }
    /* si la opcion lavado Motor esta selecionada la agregamos al arreglo servicios */
    if (chkLavadoMotor.checked) {
      serviciosSolicitados.push({nombre:"Lavado Motor",precio:8000});
    }

  /* asignando el valor de la region seleccionada a una variable*/
  let encargado = selectEncargado.options[selectEncargado.selectedIndex].text;

  /* asignando el valor de la region seleccionada a una variable*/
  let varDate = new Date(inputFechaHora.value);
    /* extrayendo la fecha seleccionada a formato local */
    let fecha = varDate.toLocaleDateString('es-Cl');
    /* extrayendo la hora seleccionada a formato local */
    let hora = varDate.toLocaleTimeString('es-Cl',{ hour: '2-digit', minute: '2-digit' });
  

  /* ======= MOSTRANDO LOS DATOS EN EL CÓDIGO ======= */

  /* Limpliado el contenido del DIV resumen */
  Resumen.innerHTML = '';

  let divResumen = ``;

  /* Creando el HTML */
  divResumen = `
    <h3><span>Datos</span> Cliente</h3>
    <p>
      <h6 class="d-inline">Rut: </h6><span>${rut}</span>
    </p>
    <p>
      <h6 class="d-inline">Nombre: </h6><span>${nombreCompleto}</span>
    </p>
    <p>
      <h6 class="d-inline">Dirección: </h6><span>${direccion}</span>
    </p>
    <p>
      <h6 class="d-inline">Comuna: </h6><span>${comuna}</span>
    </p>
    <p>
      <h6 class="d-inline">Región: </h6><span>${region}</span>
    </p>
    <hr>
    <h3><span>Datos</span> Vehiculo</h3>
    <p>
      <h6 class="d-inline">Tipo Vehiculo: </h6><span>${tipoVehiculo}</span>
    </p>
    <p>
      <h6 class="d-inline">Marca: </h6><span>${marca}</span>
    </p>
    <p>
      <h6 class="d-inline">Modelo: </h6><span>${modelo}</span>
    </p>
    <p>
      <h6 class="d-inline">Año: </h6><span>${anio}</span>
    </p>
    <p>
      <h6 class="d-inline">Revision Tecnica al Día: </h6><span>${revisionTecnica}</span>
    </p>
    <hr>
    <h3><span>Servicios</span> Solicitados</h3>
    <p>
      <h6 class="d-inline">Fecha: </h6><span>${fecha}</span>
    </p>
    <p>
      <h6 class="d-inline">Hora: </h6><span>${hora}</span>
    </p>
    <p>
      <h6 class="d-inline">Encargado: </h6><span>${encargado}</span>
    </p>
    <hr>
    <div class="row">
          <table class="col text-light">
            <thead>
              <tr>
                <th class="text-center">Servicio Solicitado</th>
                <th class="text-center">Precio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th colspan="2" class="text-end"><hr></th>
              </tr>
              `;

              let totalServicios = 0;
              serviciosSolicitados.forEach((servicio) => {
                totalServicios += parseFloat((servicio.precio).toFixed(2));
                divResumen += `
                <tr>
                    <td class="text-center">
                        ${servicio.nombre}
                    </td>
                    <td class="text-center">
                        ${(servicio.precio)}
                    </td>
                </tr>
                `;
              });

            divResumen += `
            <tr>
              <th colspan="4" class="text-end"><hr></th>
            </tr>
            </tbody>

              <tr>
                <td class="text-end">Sub Total</td>
                <td class="text-center">$${(totalServicios/(1+IVA)).toFixed(2)}</td>
              </tr>
              <tr>
                <td class="text-end">IVA ${IVA*100}%</td>
                <td class="text-center">$${((totalServicios/(1+IVA)).toFixed(2)*IVA).toFixed(2)}</td>
              </tr>
              <tr>
                <th class="text-end">Total a Pagar</th>
                <th class="text-center">$${(totalServicios).toFixed(2)}</th>
              </tr>

          </table>
        </div>
  `;

  Resumen.innerHTML = divResumen;

  console.log("rut: " +  rut);
  console.log("nombre: " +  nombreCompleto);
  console.log("direccion: " +  direccion);
  console.log("region: " +  region);
  console.log("comuna: " +  comuna);
  console.log("tipo Vehiculo " + tipoVehiculo);
  console.log("Revision Tecnica " + revisionTecnica);
  console.log("Servicios:");
  console.log(serviciosSolicitados);
  console.log("encargado: " +  encargado);
  console.log("Fecha: " + fecha);
  console.log("Hora: " + hora);
}
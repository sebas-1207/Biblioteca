function agregarLibro() {
    const imagenInput = document.getElementById('imagen');
    const imagenUrl = imagenInput.files.length > 0 ? URL.createObjectURL(imagenInput.files[0]) : 'img/default-cover.jpg';

    // Crear un nuevo elemento para representar el libro
    const nuevoLibro = document.createElement('div');
    nuevoLibro.classList.add('col-sm-12', 'col-md-6', 'col-lg-4');

    nuevoLibro.innerHTML = `
      <div class="card-book border border-1 shadow-lg p-3 mb-5 bg-body rounded d-flex flex-column justify-content-between">
        <img src="${imagenUrl}" id="tamaño-img" class="card-img-top mb-2" alt="img-book">
        <button type="button" class="btn btn-primary align-self-center" data-bs-toggle="modal" data-bs-target="#modal-cards" style="margin-right: 15px;">
          VER
        </button>
      </div>
    `;

    const containerLibrary = document.querySelector('.container-library .row-library');
    containerLibrary.appendChild(nuevoLibro);

    // Cerrar el modal
    $('#modal-add').modal('hide');
}

function mostrarLibroCompleto(libroId, titulo, autor, año) {
    const modal = document.getElementById(`modal-cards${libroId}`);
    modal.querySelector('.modal-title').innerText = titulo;
    const modalCardBody = modal.querySelector('.modal-card-item');
    modalCardBody.innerHTML = `
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Título: ${titulo}</li>
        <li class="list-group-item">Autor: ${autor}</li>
        <li class="list-group-item">Año de Publicación: ${año}</li>
        <li class="list-group-item">Disponible</li>
      </ul>
    `;
}

function marcarPrestado(libroId) {
    const estadoLibro = document.querySelector(`#modal-cards${libroId} .modal-card-item li:nth-child(4)`);
    estadoLibro.textContent = 'Prestado';
    const prestadoA = document.querySelector(`#modal-cards${libroId} .modal-card-item li:nth-child(5)`);
    const nombrePersona = prompt('Ingrese el nombre de la persona a la que se prestará el libro:');
    if (nombrePersona) {
        prestadoA.textContent = `Prestado a: ${nombrePersona}`;
    }
}

function marcarDevuelto(libroId) {
    const estadoLibro = document.querySelector(`#modal-cards${libroId} .modal-card-item li:nth-child(4)`);
    estadoLibro.textContent = 'Disponible';
    const prestadoA = document.querySelector(`#modal-cards${libroId} .modal-card-item li:nth-child(5)`);
    prestadoA.textContent = 'Prestado a: NaN';
}

function eliminarLibro(libroId) {
    const libro = document.querySelector(`[data-id="${libroId}"]`);
    if (libro) {
        libro.remove();
        alert('Libro eliminado correctamente.');
    } else {
        alert('No se pudo encontrar el libro para eliminar.');
    }
}

document.getElementById('floatingSelect').addEventListener('change', function () {
    const option = parseInt(this.value);

    const containerLibrary = document.querySelector('.container-library .row-library');
    const libros = containerLibrary.querySelectorAll('.libro');

    const librosArray = Array.from(libros);

    switch (option) {
        case 1: // Ordenar por Título del Libro
            librosArray.sort((a, b) => {
                const tituloA = a.querySelector('.modal-card-item li:nth-child(1)');
                const tituloB = b.querySelector('.modal-card-item li:nth-child(1)');
                return tituloA.textContent.toLowerCase().localeCompare(tituloB.textContent.toLowerCase());
            });
            break;

        case 2: // Ordenar por Autor del Libro
            librosArray.sort((a, b) => {
                const autorA = a.querySelector('.modal-card-item li:nth-child(2)');
                const autorB = b.querySelector('.modal-card-item li:nth-child(2)');
                return autorA.textContent.toLowerCase().localeCompare(autorB.textContent.toLowerCase());
            });
            break;

        case 3: // Ordenar por Año de Publicación
            librosArray.sort((a, b) => {
                const añoA = extractYear(a.querySelector('.modal-card-item li:nth-child(3)').textContent);
                const añoB = extractYear(b.querySelector('.modal-card-item li:nth-child(3)').textContent);

                return añoA - añoB;
            });
            break;

        default:
            return;
    }

    // Elimina los libros actuales de la interfaz
    libros.forEach(libro => libro.remove());

    // Agrega los libros ordenados de nuevo a la interfaz
    librosArray.forEach(libro => containerLibrary.appendChild(libro));
});

function extractYear(text) {
    const match = text.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
}















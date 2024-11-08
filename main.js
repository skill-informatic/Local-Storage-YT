//Seleccionamos cada uno de los elementos del DOM por su ID

const add = document.querySelector("#add");
const input = document.querySelector("#input");
const arrayOfNotes = document.querySelector("#arrayOfNotes");

//Esperamos a que el DOM esté completamente cargado

document.addEventListener("DOMContentLoaded", () => {
  displayArrayInfo(getLocalStorageArray());

  //Evento para añadir una nota a la lista cuando hagamos clic en el botón
  add.addEventListener("click", (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del botón
    const newNote = input.value.trim(); //Elimina espacios al inicio y al final

    if (newNote === "") {
      console.log("La nota no puede estar vacía");
      return; //Previene la ejecución si la nota no es válida
    }

    let newItem = {
      id: generateUUIDv4(), // Asigna un ID único para la nota
      name: newNote, //Almacena la nota
    };

    //Añadimos una nueva nota a la lista
    let list = [...getLocalStorageArray(), newItem];

    //Guardamos la nota en el localStorage
    setLocalStorageArray(list);

    //Mostrar las notas actualizadas
    displayArrayInfo(list);
    input.value = ""; //Limpia el campo de entrada de texto
    input.focus();
  });
});

// Función para mostrar la información de la lista en el contenedor 'arrayOfNotes'
function displayArrayInfo(products) {
  cleanDOM(arrayOfNotes); // Limpiamos el contenedor antes de mostrar la información

  const div = document.createElement("DIV");
  products.forEach((product) => {
    const containerText = document.createElement("DIV");
    containerText.classList.add("d-flex");
    const p = document.createElement("P");
    p.classList.add("text");
    p.textContent = product.name;

    // Crear el botón de eliminar
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("btn");
    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      removeNotesFromList(product.id);
    });
    containerText.appendChild(deleteBtn);
    containerText.appendChild(p);

    div.appendChild(containerText);
  });

  arrayOfNotes.appendChild(div);
}

// Función para eliminar una nota del arreglo
function removeNotesFromList(noteId) {
  let list = getLocalStorageArray().filter((note) => note.id !== noteId);
  setLocalStorageArray(list);
  displayArrayInfo(list);
}

// Función para generar un UUIDv4
function generateUUIDv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

//Función para guardar las tareas en el localStorage
function setLocalStorageArray(list) {
  localStorage.setItem("list", JSON.stringify(list));
}

// Función para limpiar el DOM
const cleanDOM = (value) => (value.innerHTML = "");

// Función para obtener las tareas del localStorage
function getLocalStorageArray() {
  return JSON.parse(localStorage.getItem("list")) || [];
}

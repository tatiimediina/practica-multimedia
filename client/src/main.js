import "./style.css";

const $app = document.querySelector("#app");

// Crear el formulario
const $form = document.createElement("form");
$form.classList.add(
  "flex",
  "flex-col",
  "items-center",
  "justify-center",
  "space-y-4",
  "max-w-md",
  "mx-auto",
  "mt-10",
  "p-6",
  "bg-white",
  "shadow-lg",
  "rounded-lg"
);

// Input para la imagen
const $inputImage = document.createElement("input");
$inputImage.name = "image";
$inputImage.type = "file";
$inputImage.accept = "image/*";
$inputImage.className = "border rounded py-2 px-3 w-full";

// Contenedor para la previsualización de la imagen
const $imageContainer = document.createElement("div");
$imageContainer.className = "w-full flex justify-center mt-4";

// Evento para la previsualización de la imagen
$inputImage.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (readerEvent) => {
    let $img = $imageContainer.querySelector("img");

    if (!$img) {
      // Crear la imagen si no existe
      $img = document.createElement("img");
      $img.classList.add("rounded-lg", "shadow-md"); // Estilos para la imagen
      $imageContainer.appendChild($img);
    }

    // Asignar la imagen cargada
    $img.src = readerEvent.target.result;
    $img.style.width = "512px";
    $img.style.height = "auto";
  };

  reader.readAsDataURL(file);
});

// Input para el nombre
const $inputName = document.createElement("input");
$inputName.name = "name";
$inputName.type = "text";
$inputName.placeholder = "Nombre del producto";
$inputName.className = "border rounded py-2 px-3 mb-2 w-full";

// Input para la descripción
const $inputDescription = document.createElement("textarea");
$inputDescription.name = "description";
$inputDescription.placeholder = "Descripción del producto";
$inputDescription.className = "border rounded py-2 px-3 mb-2 w-full";

// Input para el precio
const $inputPrice = document.createElement("input");
$inputPrice.name = "price";
$inputPrice.type = "number";
$inputPrice.placeholder = "Precio del producto";
$inputPrice.className = "border rounded py-2 px-3 mb-2 w-full";

// Botón de submit
const $button = document.createElement("button");
$button.textContent = "Aceptar";
$button.className =
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full";

$form.appendChild($inputImage);
$form.appendChild($imageContainer);
$form.appendChild($inputName);
$form.appendChild($inputDescription);
$form.appendChild($inputPrice);
$form.appendChild($button);

// Añadir el formulario a la aplicación
$app.appendChild($form);

// Enviar el formulario
$form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  fetch("http://localhost:4000/products/multer", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
});

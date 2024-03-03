document.addEventListener("DOMContentLoaded", function () {
    const fecha = document.querySelector('#fecha');
    const input = document.getElementById("input");
    const enter = document.getElementById("enter");
    const lista = document.getElementById("Lista");
    const selectPrioridad = document.querySelector(".form-select");

    const FECHA = new Date()
    fecha.innerHTML = FECHA.toLocaleDateString('es-europe', { weekday: 'long', month: 'short', day: 'numeric' })

    enter.addEventListener("click", agregarTarea);

    function agregarTarea() {
        const tareaText = input.value.trim();
        if (tareaText !== "") {
            const nuevaTarea = document.createElement("li");
            nuevaTarea.innerHTML = `
                    <i class="far fa-circle co" data-prioridad="${selectPrioridad.value}"></i>
                    <p class="text">${tareaText}</p>
                    <i class="fas fa-trash de" data="eliminado"></i>
                `;

            enter.addEventListener("click", agregarTarea);

            input.addEventListener("keyup", function (event) {
                if (event.key === "Enter") {
                    agregarTarea();
                }
            });
            lista.appendChild(nuevaTarea);

            input.value = "";


            const checkbox = nuevaTarea.querySelector(".co");
            checkbox.addEventListener("click", function () {
                this.parentElement.classList.toggle("completada");
            });


            const deleteButton = nuevaTarea.querySelector(".de");
            deleteButton.addEventListener("click", function () {
                this.parentElement.remove();
            });


        }
    }


    selectPrioridad.addEventListener("change", function () {
        const prioridadSeleccionada = this.value;
        const tareas = lista.getElementsByTagName("li");

        for (const tarea of tareas) {
            const prioridadTarea = tarea.querySelector(".co").getAttribute("data-prioridad");

            if (prioridadSeleccionada === "Prioridad" || prioridadSeleccionada === prioridadTarea) {
                tarea.style.display = "flex";
            } else {
                tarea.style.display = "none";
            }
        }
    });
});
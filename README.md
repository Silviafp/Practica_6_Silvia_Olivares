# Gestor de Proyectos Scrum - Kanban

## Descripción de la Aplicación

### ¿Qué es?
Una aplicación web interactiva para gestionar tareas y proyectos utilizando la metodología Kanban. Permite organizar visualmente tus tareas en diferentes estados de progreso mediante un tablero intuitivo y responsive.

### ¿Qué permite hacer?
- **Crear tareas** con título, descripción, prioridad y estado inicial
- **Organizar tareas** en un tablero Kanban con tres columnas: Por hacer, En curso y Hecho
- **Mover tareas** entre columnas desde la vista de detalles o el formulario de edición
- **Editar tareas** para actualizar su información
- **Eliminar tareas** de forma permanente
- **Filtrar y buscar tareas** por nombre, estado y nivel de prioridad simultáneamente
- **Ver un contador** de tareas filtradas vs total de tareas
- **Persistencia de datos** automática en el navegador (localStorage)

## Guía Rápida de Uso

### Cómo crear una tarea
1. Haz clic en el botón **"Crear Tarea"** en la barra lateral
2. Completa el formulario con:
   - **Título**: Nombre o descripción corta de la tarea
   - **Descripción**: Detalles adicionales (opcional)
   - **Prioridad**: Selecciona entre Baja, Media o Alta
3. Se creará en estado "Por hacer" automáticamente
4. Haz clic en el botón de guardar para confirmar

### Cómo editar una tarea
1. Haz clic en la tarjeta de la tarea en el tablero
2. En la página de detalles, haz clic en el botón **"✏️ Editar tarea"**
3. Modifica los campos que necesites (título, descripción, prioridad, estado, fecha de vencimiento)
4. Haz clic en **"Actualizar"** para guardar los cambios
5. Serás redirigido a la página de detalles con los cambios aplicados

### Cómo moverla entre columnas
Hay dos formas de cambiar el estado de una tarea (moverla entre columnas):

**Forma 1: Desde la vista de detalles**
1. Haz clic en la tarjeta de la tarea en el tablero
2. En la página de detalles, encontrarás un selector "Estado" en la barra superior
3. Selecciona el nuevo estado: **Por hacer**, **En curso** o **Hecho**
4. Confirma el cambio cuando se te pida
5. La página se actualizará y verás la tarea en su nueva columna

**Forma 2: Desde el formulario de edición**
1. Haz clic en la tarjeta de la tarea en el tablero
2. Haz clic en el botón **"✏️ Editar tarea"**
3. En el formulario de edición, modifica el campo "Estado"
4. Guarda los cambios
5. La tarea se moverá a su nueva columna automáticamente

### Cómo borrar una tarea
1. Haz clic en la tarjeta de la tarea que deseas eliminar
2. En la página de detalles, haz clic en el botón rojo **"🗑️ Eliminar tarea"**
3. Se te pedirá una confirmación: **"¿Estás seguro de que quieres eliminar esta tarea? Esta acción no se puede deshacer."**
4. Confirma la eliminación
5. La tarea será eliminada permanentemente y serás redirigido al tablero

### Cómo filtrar y buscar
- **Buscar por nombre**: Escribe al menos 3 caracteres en el campo "Buscar por nombre..."
- **Filtrar por estado**: Usa el selector desplegable "Estado" para mostrar solo tareas en un estado específico
- **Filtrar por prioridad**: Usa el selector desplegable "Prioridad" para mostrar solo tareas con un nivel de prioridad
- Los filtros se aplican **simultáneamente** y se pueden combinar
- El contador en la esquina superior muestra **tareas filtradas/total de tareas**

# Descripcion

El módulo de gestión de órdenes ha sido desarrollado para atender las necesidades del equipo de logística de un ecommerce. Su objetivo es brindar una interfaz de usuario intuitiva para visualizar, administrar y generar informes relacionados con las órdenes de venta emitidas en el sitio. El módulo opera en base a entidades y atributos simples que representan las órdenes y sus productos asociados.

## Caracteristicas Principales

Órdenes: El sistema permite visualizar las órdenes de venta completadas en el sitio. Cada orden está compuesta por atributos como el ID, fecha de creación, estado (Aprobada, Cancelada, en Entrega, en Tránsito), cliente, dirección de envío, fecha de promesa de entrega y productos asociados.

Productos y Ítems: Cada orden incluye productos, representados por ítems. Cada ítem posee un ID, título, descripción, URL, precio y cantidad.

Interfaz de Usuario Funcional: Se ha implementado una interfaz de usuario (UI) simple pero funcional que permite al equipo de logística revisar todas las órdenes, junto con sus propiedades y los productos asociados. Esta interfaz proporciona una vista clara y detallada de las órdenes emitidas en el sitio, que ademas, tiene una paginacion para poder visualizar la cantidad de ordenes que desee.

Reportes Personalizados: El módulo dispone de funcionalidad de generación de informes personalizados. Un fltro permite recuperar las órdenes dependiendo el estado (Approve, Cancel, Delivery, Traveling), incluso las que esten en estado "Approve" que tienen menos de 2 días para cumplir con la promesa de entrega (ShippingPromise). Otro reporte permite seleccionar un rango de fechas y obtener todas las órdenes en estado "Traveling" dentro de ese período.

## Instrucciones de Instalación y Ejecución

### Prerrequisitos
- Node.js v18.16.0 
- Yarn v1.22.19

### Pasos para Instalar y Ejecutar

1. Clona el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/MNATorres/order-management-dashboard

2. Instala las dependencias del proyecto.
   yarn install

3. Ejecuta el servidor de desarrollo:
   yarn run dev

4. Ejecuta el backend para visualizar las ordenes:

   ```bash
   git clone https://github.com/MNATorres/order-management-back

## Próximos Pasos

Una de las prácticas más valiosas en el desarrollo de software es la incorporación de pruebas automatizadas. Aprovecha el potencial de las pruebas unitarias y de integración para asegurarte de que los componentes de tu frontend funcionan como se espera en diferentes situaciones. Utilizar una herramienta como Jest.
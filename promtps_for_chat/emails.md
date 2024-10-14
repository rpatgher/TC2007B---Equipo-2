Hola chat. Estoy haciendo un CRM para un fundación llamada Sanders, ellos son una Asociación Civil sin fines de lucro creada en el año 2016 por iniciativa del empresario mexicano Guillermo Sanders Acedo (1935-2019), para contribuir a la mejora de la calidad de vida en grupos sociales en situación de vulnerabilidad, mediante la promoción de la salud sexual y reproductiva, la nutrición comunitaria y el abastecimiento de agua.
Su objeto social es desarrollar proyectos para contribuir a enfrentar los rezagos sociales en materia de salud sexual y reproductiva, nutrición comunitaria y abasto de agua.
Su misión, fomentar la salud sexual y reproductiva, la sana alimentación y el abasto de agua potable entre grupos más vulnerables de la sociedad, para prevenir y incidencia y prevalencia de embarazos no planificados, infecciones de transmisión sexual, así como padecimientos asociados a ala malnutrición y al consumo de agua contaminada.
Y su visión es ser un referente por su modelo de intervención preventiva para fomentar la salud sexual y reproductiva, la sana alimentación y el abasto de agua potable en grupos sociales en situación de vulnerabilidad, contribuyendo de esa manera a la construcción de condiciones de justicia social en México.

El funcionamiento del CRM consiste en una plataforma web, que tiene una interfaz autenticada (se necesita iniciar sesión) en donde existen dos roles principalmente: administrador y donador. El administrador puede gestionar (llevar a cabo el CRUD) donadores físicos (donadores fuera de la plataforma), donaciones (únicamente asignadas a donadores físicos) y proyectos. Hay una sección de configuración en donde se puede especificar la manera en la que las donaciones se estarán asignando a los proyectos: dependiendo el impacto que genera cada proyecto, el progreso del proyecto o manualmente; de igual forma se puede configurar la unidad de impacto por tipo de proyecto (agua, nutrición o sexualidad), por ejemplo, si es de agua, se puede configurar que la unidad sea litros; y su descipción como "de agua potable recaudados". Hay una sección destinada a cada uno de las entidades (proyectos, donaciones y donadores).

En la sección de proyectos, a cada proyecto, cuando se agrega uno nuevo, se le asigna una imagen, un nombre, una descripción, un valor de impacto (el impacto que genera individualmente), el tipo de proyecto, el dinero que se necesita y una serie de milestones (etapas del proyecto) con el procentaje que representan en el proceso del proyecto y si ya fue alcanzado o no (esto lo actualiza manualmente el administrador). 

Por otro lado, en la sección de dondador, el donador tiene una vista de visualización para las estadísicas relacionadas a su historial de donaciones como: total donado, total de donaciones, top 3 donaciones más recientes, top 3 proyectos a los que más ha impactado, etc. También tiene una sección únicamente para visualizar la lista de todas las donaciones hechas y finalmente una sección para realizar nuevas donaciones. 


Estoy implementando actualmente la funcionalidad de mandar correos en ciertos eventos. Hasta ahora he identificado 3 situaciones en las que se debe enviar un correo:

- Confirmar cuenta (al momento del registro)

- Reestablecer contraseña (cuando el usuario solicita cambiar su contraseña)

- Agradecimiento de tu donación: se le manda un correo dando las gracias por su donación y se le dice a qué proyecto fue asignada y con cuanto está ayudando haciendo una análisis y cálculo basado en el dinero necesitado para el proyecto, el impacto y la cantidad donada, así como la etapa en la que se encuentra el proyecto.

- Actualización del proyecto: se le avisa al usuario que el proyecto al que anteriormente donó avanzo de etapa para manterlo al tanto del proyecto (esto sucede cuando el administrador indica que se pasó a un nuevo milestone).

Lo que necesito ahora son ideas de diseño y de contenido de los mails. Entonces, por favor dame una lista de ideas de diseño y contenido que puedo integrar y un párrafo con una propuesta de lo que debe decir cada mail para cada uno de lo 4 que te dije. 
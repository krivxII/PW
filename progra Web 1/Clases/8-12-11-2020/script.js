const emails = JSON.stringify([
    {
      from: "john@uneat.es",
      to: "jane@uneat.es",
      subject: "fetch",
      text: "Fugiat cumque animi pariatur eaque"
    },
    {
      from: "doe@uneat.es",
      to: "jane@uneat.es",
      subject: "fetch",
      text: "nihil nobis illo sint reiciendis"
    },
    {
      from: "foo@uneat.es",
      to: "jane@uneat.es",
      subject: "fetch",
      text: "Dolor sequi quia autem. Qui alias fugiat dolores"
    },
    {
      from: "bar@uneat.es",
      to: "jane@uneat.es",
      subject: "fetch",
      text: "Qui alias fugiat dolores dolore"
    }
  ]);
  
  const createLiFromEmail = email => {
    const li = document.createElement("li");
    li.innerHTML = `[${email.subject}] ${email.from}`;
    return li;
  };
  
  const popularListaDeEmails = () => {
    const ol = document.querySelector(".js-email-container");
    ol.innerHTML = "";
  
    fetch("https://2020-11-12-email-generator.glitch.me/emails", {
      method: "GET"
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error");
        }
        return response.text();
      })
      .then(emails => {
        JSON.parse(emails)
          .map(createLiFromEmail)
          .forEach(li => {
            ol.appendChild(li);
          });
      })
      .catch(error => {
        console.error(error);
        // En una página real conviene manejar el error notificando al usuario.
      });
  
    //  JSON.parse(emails)
    //    .map(createLiFromEmail)
    //    .forEach(li => {
    //      ol.appendChild(li);
    //    });
  };
  
  document
    .querySelector(".js-refresh")
    .addEventListener("click", popularListaDeEmails);
  
  // A partil de el JSON ^
  // popula la lista <ol> de la página (ver index.html) utilizando el DOM.
  // querySelector, appendChild, createElement, createTextNode, ...
  // https://htmldom.dev/
  // https://glitch.com/~2020-11-09-buscaminas
  // presentación del lunes: https://docs.google.com/presentation/d/11ReXtSwEPNxDuySZJZtmMNR5_sIU6MjotmhhkAKh1ig/edit?usp=sharing
  
  // Cómo empezar: pulsad en el título del proyecto y elegid la opción "remix project".
  
  // Si es muy fácil, intégralo usando fetch con el recurso web https://pie-zany-constrictor.glitch.me/emails.
  // Si es muy difícil, 🙋‍ .
  // Si te sobra tiempo, modifica el CSS para que la lista parezca una tabla.
  
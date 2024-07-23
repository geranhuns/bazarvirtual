import React from "react";

const AvisoPrivacidad = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto text-raw-sienna-900">
      <h1 className="text-3xl font-bold mb-6">Aviso de Privacidad</h1>
      <p className="mb-4">
        En <strong>Bazar Virtual - Consume Local</strong>, estamos comprometidos
        con la protección de tu privacidad. A continuación, te informamos sobre
        cómo recopilamos, usamos y compartimos tu información personal.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Información Recopilada</h2>
      <p className="mb-4">
        Recogemos la información necesaria que pide un eCommerce para procesar
        tus pedidos. Esta información incluye datos como tu nombre, dirección, y
        detalles de pago.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Uso de la Información</h2>
      <p className="mb-4">
        Utilizamos la información que recopilamos para procesar pagos y
        personalizar un poco la experiencia del usuario en nuestro sitio.
      </p>
      <h2 className="text-2xl font-semibold mb-4">No Uso de Cookies</h2>
      <p className="mb-4">
        No usamos cookies ni recopilamos datos sobre el comportamiento del
        usuario en el sitio.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Compartir Información</h2>
      <p className="mb-4">
        Compartimos la información del cliente con la marca que enviará el
        producto. No vendemos la información a terceros.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Contacto</h2>
      <p className="mb-4">
        Si tienes alguna pregunta sobre nuestro Aviso de Privacidad, no dudes en
        contactarnos a través de nuestro sitio web.
      </p>
    </div>
  );
};

export default AvisoPrivacidad;

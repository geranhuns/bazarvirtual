import React from "react";

const AvisoPrivacidad = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto text-patina-900 space-y-4 text-lg">
      <h1 className="pt-14 pb-6 text-4xl font-semibold text-patina-900">
        Aviso de Privacidad
      </h1>
      <p>
        <strong>bazarvirtual.com.mx</strong>, en cumplimiento con la Ley Federal
        de Protección de Datos Personales en Posesión de los Particulares, y su
        Reglamento, informa lo siguiente:
      </p>

      <h2 className="font-semibold text-2xl">
        1. Responsable del Tratamiento de sus Datos Personales
      </h2>
      <p>
        La empresa bazarvirtual.com.mx es responsable del tratamiento de sus
        datos personales. Estos datos serán utilizados para [finalidades del uso
        de los datos, como la prestación de servicios, la facturación, la
        creación de perfiles de usuario, etc.].
      </p>

      <h2 className="font-semibold text-2xl">
        2. Datos Personales que Recabamos
      </h2>
      <p>Los datos personales que recabamos incluyen, pero no se limitan a:</p>
      <ul>
        <li>Nombre completo</li>
        <li>Dirección</li>
        <li>Teléfono</li>
        <li>Correo electrónico</li>
        <li>Datos de pago</li>
      </ul>

      <h2 className="font-semibold text-2xl">
        3. Finalidades del Tratamiento de Datos Personales
      </h2>
      <p>
        Sus datos personales serán utilizados para las siguientes finalidades:
      </p>
      <ul>
        <li>Proveer los productos y servicios que ha solicitado.</li>
        <li>
          Notificarle sobre nuevos productos o servicios que tengan relación con
          los ya contratados.
        </li>
        <li>Informarle sobre cambios en nuestros productos o servicios.</li>
        <li>Evaluar la calidad del servicio que le brindamos.</li>
      </ul>

      <h2 className="font-semibold text-2xl">
        4. Transferencia de Datos Personales
      </h2>
      <p>
        No transferimos sus datos personales a terceros, salvo en los casos
        exigidos por la ley o cuando sea necesario para la prestación de
        nuestros servicios.
      </p>

      <h2 className="font-semibold text-2xl">
        5. Medios para Ejercer los Derechos ARCO
      </h2>
      <p>
        Usted tiene el derecho de acceder, rectificar, cancelar u oponerse
        (ARCO) al tratamiento de sus datos personales. Para ejercer estos
        derechos, puede contactar a nuestro departamento de protección de datos
        personales a través del correo electrónico [correo@ejemplo.com] o en el
        teléfono [número de contacto].
      </p>

      <h2 className="font-semibold text-2xl">
        6. Cambios al Aviso de Privacidad
      </h2>
      <p>
        Nos reservamos el derecho de efectuar en cualquier momento
        modificaciones o actualizaciones a este aviso de privacidad, para la
        atención de novedades legislativas o políticas internas. Estas
        modificaciones estarán disponibles en nuestra página web [URL de tu
        sitio web].
      </p>

      <h2 className="font-semibold text-2xl">7. Consentimiento</h2>
      <p>
        Al proporcionar sus datos personales, usted consiente su tratamiento
        conforme a los términos y condiciones de este aviso de privacidad.
      </p>

      <p>Fecha de última actualización: 27 agosto 2024</p>
    </div>
  );
};

export default AvisoPrivacidad;

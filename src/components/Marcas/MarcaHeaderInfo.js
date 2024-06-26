import SocialMedia from "@/components/SocialMedia/SocialMedia";

export default function MarcaHeaderInfo({ imageURL, altText }) {
  return (
    <>
      <div className="flex flex-col  md:flex-row justify-center gap-10 py-10">
        <img
          src={imageURL}
          alt={altText}
          width="200px"
          height="200px"
          className="h-48 rounded-full self-center"
        />
        <div id="infoMarca" className="flex flex-col justify-center pl-10 ">
          <h2>NombreDeMarca</h2>
          <h3 className="pt-2">Slogan de la Marca</h3>
          <p className="pt-6 w-2/3">
            Descripción amplia de lo que hace la marca y cómo logra su objetivo.
          </p>
        </div>
        <SocialMedia />
      </div>
    </>
  );
}

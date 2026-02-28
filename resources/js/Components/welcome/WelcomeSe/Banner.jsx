export default function Banner({img}) {
  return (
    <section className="animate-slide-in-bottom relative w-full overflow-hidden bg-gray-900" style={{aspectRatio: '1080/650'}}>

      <div className="absolute inset-0">
        <img
          src={img || "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&q=80"}
          alt="Fabros"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1920&q=80';
          }}
        />
       
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
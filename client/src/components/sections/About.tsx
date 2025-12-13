const teamImage = "/assets/about-team.jpg";

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-black text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FFD700]/10 -skew-x-12 translate-x-1/4 z-0 hidden md:block" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight">
              Fundada em fevereiro <br className="hidden md:block" />
              de 2023 em Lisboa,
            </h2>

            <div className="space-y-4 md:space-y-6 text-white/80 font-light leading-relaxed text-sm md:text-base">
              <p>
                E expandindo suas operações para o Sul do Brasil em 2024, a Angola Imobiliária se estabeleceu como um ícone disruptivo de inovação e excelência no mercado imobiliário.
              </p>
              <p>
                Nossa missão é transformar a experiência em algo extraordinário e proporcionar uma jornada de compra e venda transparente, segura e satisfatória.
              </p>
              <p>
                Os nossos recursos como tours virtuais 3D e análises detalhadas do mercado são projetados para garantir decisões informadas e vantajosas, onde quer que você esteja.
              </p>
              <p>
                Escolher a Angola Imobiliária significa entrar em uma jornada única, conduzida por especialistas apaixonados e dedicados a exceder suas expectativas em cada etapa.
              </p>
            </div>

            <div className="pt-4 border-l-4 border-[#FFD700] pl-6">
              <p className="font-serif text-2xl font-medium text-white">
                Junte-se a nós e descubra por que a Angola Imobiliária é uma referência inovadora no mercado imobiliário.
              </p>
            </div>
          </div>

          <div className="relative order-1 lg:order-2 mb-8 lg:mb-0">
            <div className="absolute inset-0 bg-[#FFD700] rounded-lg transform translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4 -z-10" />
            <img
              src={teamImage}
              alt="Equipe Angola Imobiliária"
              className="w-full rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

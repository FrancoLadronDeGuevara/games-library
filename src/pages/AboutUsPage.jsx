import Card from "../components/Utils/cards";

const AboutUsPage = () => {
  const cardsData = [
    {
      id: 1,
      title: "Exequiel Palacios",
      description: "Fumador profesional",
      profileImage: "https://avatars.githubusercontent.com/u/221231661?v=4&size=64"
    },
    {
      id: 2,
      title: "Profe Gamer",
      description: "Me robo footer",
      profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_i2_vJN5rUWFIs3kXNqiy2EyzgYXwKUFvJg&s"
    },
    {
      id: 3,
      title: "Creo que se llamaba Alex",
      description: "Tiene que hacerlo todo",
      profileImage: "data:image/jpeg;base64,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"
    }
  ];

  return (
    <div className="min-h-screen bg-[--color-bg-base]">
      <section className="flex items-center justify-center px-6 py-10">
        <div className="max-w-2xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[--color-text-primary] mb-6">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-[--color-text-secondary] mb-6 leading-relaxed">
            At Games Library, we're passionate about video games and believe every player deserves an exceptional experience. Our team is dedicated to creating the best platform to discover, share, and enjoy the games you love most.
          </p>
          <p className="text-lg text-[--color-text-secondary] leading-relaxed">
             Hello world.
          </p>
        </div>
      </section>

      <section className="px-6 py-8 bg-[--color-bg-surface]">
        <h2 className="text-4xl font-bold text-[--color-text-primary] text-center mb-20">
          Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cardsData.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              description={card.description}
              profileImage={card.profileImage}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
import React from 'react';

const services = [
  {
    title: 'Calculated Weather',
    description: 'Built Wicket longer admire do barton vanity itself do in it.',
    icon: '🌤️', // Replace with an appropriate icon
  },
  {
    title: 'Best Flights',
    description: 'Engrossed listening. Park gate sell they west hard for the.',
    icon: '✈️', // Replace with an appropriate icon
  },
  {
    title: 'Local Events',
    description: 'Barton vanity itself do in it. Prefer to men it engrossed listening.',
    icon: '🎤', // Replace with an appropriate icon
  },
  {
    title: 'Customization',
    description: 'We deliver outsourced aviation services for military customers',
    icon: '⚙️', // Replace with an appropriate icon
  },
];

const ServiceCard = ({ title, description, icon }) => (
  <div className="flex flex-col items-center text-center p-4 m-2 bg-white rounded-3xl hover:shadow-md gap-6 py-10 lg:px-8 cursor-pointer">
    <div className="text-6xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 text-xl">{description}</p>
  </div>
);

const ServicesComponent = () => (
  <section className="py-12">
    <div className="container mx-auto px-32">
      <h2 className="text-4xl font-bold text-center mb-8 font-serif">We Offer Best Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            icon={service.icon}
          />
        ))}
      </div>
    </div>
  </section>
);

export default ServicesComponent;

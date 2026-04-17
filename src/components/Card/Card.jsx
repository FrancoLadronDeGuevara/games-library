const Card = ({ title, description, profileImage }) => {
  return (
    <div className="group relative bg-[--color-bg-surface] rounded-xl shadow-md border border-[--color-border-default] hover:border-[--color-accent-primary] transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-[--color-accent-primary] to-[--color-accent-neon] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>

      <div className="relative z-10 flex flex-col items-center">
        {profileImage && (
          <div className="w-full pt-6 flex justify-center">
            <img
              src={profileImage}
              alt={title}
              className="w-20 h-20 rounded-full object-cover border-4 border-[--color-accent-primary] shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(123,94,255,0.5)]"
            />
          </div>
        )}
        <div className="p-6 text-center w-full">
          <h3 className="text-xl font-bold text-[--color-text-primary] mb-3 transition-colors duration-300 group-hover:text-[--color-accent-primary]">
            {title}
          </h3>
          <p className="text-[--color-text-secondary] group-hover:text-[--color-text-primary] transition-colors duration-300 leading-relaxed italic">
            {description}
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-[--color-accent-primary] to-[--color-accent-neon] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
};

export default Card;

import { FaStar, FaThumbsUp, FaThumbsDown, FaCommentDots } from 'react-icons/fa';

// Custom Button Component
const Button = ({ children, className, variant, size, ...props }) => {
  const baseStyles = 'px-4 py-2 rounded-md';
  const variantStyles = variant === 'outline' ? 'border border-gray-300' : variant === 'ghost' ? 'bg-transparent' : 'bg-black text-white';
  const sizeStyles = size === 'sm' ? 'text-sm' : 'text-base';
  return (
    <button className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Custom Card Component
const Card = ({ children, className, ...props }) => (
  <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`} {...props}>
    {children}
  </div>
);

// Custom CardContent Component
const CardContent = ({ children, className, ...props }) => (
  <div className={`p-4 ${className}`} {...props}>
    {children}
  </div>
);

// Custom Avatar Component
const Avatar = ({ src, alt, fallback, className, ...props }) => (
  <div className={`w-10 h-10 border rounded-full overflow-hidden ${className}`} {...props}>
    {src ? <img src={src} alt={alt} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full">{fallback}</div>}
  </div>
);

// Card Component for Travel Destinations
export default function CardComponent ({ destination }) {
  return (
    <Card>
      <img src={destination.image} alt={destination.name} className="w-full h-48 object-cover" />
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold">{destination.name}</span>
          <div className="flex items-center gap-1 text-yellow-500">
            <FaStar className="w-5 h-5" />
            <span className="font-medium">{destination.rating}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2">{destination.description}</p>
        <div className="flex items-center justify-between mt-4">
          <Button variant="outline" size="sm">Rate Place</Button>
          <Button variant="ghost" size="sm">View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
};


import { FaStar, FaThumbsUp, FaThumbsDown, FaCommentDots } from 'react-icons/fa';

const ReviewComponent = ({ review }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 border rounded-full overflow-hidden">
          {review.avatar ? <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full">{review.fallback}</div>}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="font-semibold">{review.name}</div>
            <div className="flex items-center gap-1 text-yellow-500">
              <FaStar className="w-5 h-5" />
              <span className="font-medium">{review.rating}</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            {review.text}
          </p>
          <div className="flex items-center justify-between mt-2">
            <div className="text-xs text-gray-600">{review.timeAgo}</div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <FaThumbsUp className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <FaThumbsDown className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <FaCommentDots className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;
